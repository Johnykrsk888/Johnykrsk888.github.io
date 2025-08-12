
import os
import asyncio
import pandas as pd
import logging
from dotenv import load_dotenv
import google.generativeai as genai
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# --- 1. Начальная настройка ---

# Включаем логирование, чтобы видеть ошибки
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Загружаем переменные окружения из .env файла
load_dotenv()
TELEGRAM_TOKEN = os.getenv('TELEGRAM_TOKEN')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Проверяем, что токены загружены
if not TELEGRAM_TOKEN or not GEMINI_API_KEY:
    raise ValueError("Необходимо задать TELEGRAM_TOKEN и GEMINI_API_KEY в .env файле")

# Конфигурируем Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')


# --- 2. Работа с данными ---

def load_inventory():
    """Загружает данные из CSV файла в pandas DataFrame."""
    try:
        df = pd.read_csv('inventory.csv')
        logger.info("База данных остатков успешно загружена.")
        return df
    except FileNotFoundError:
        logger.error("Файл inventory.csv не найден!")
        return pd.DataFrame() # Возвращаем пустой DataFrame в случае ошибки

# Загружаем данные при старте бота
inventory_df = load_inventory()

def get_inventory_as_text():
    """Преобразует DataFrame в текстовый формат для передачи в AI."""
    if inventory_df.empty:
        return "База данных пуста."
    # Преобразуем DataFrame в строку, убирая индекс
    return inventory_df.to_string(index=False)


# --- 3. Логика ответов ---

def handle_simple_query(text: str) -> str:
    """
    Простой поиск по ключевым словам в базе.
    Ищет совпадения в названии товара.
    """
    if inventory_df.empty:
        return "Извините, база данных сейчас недоступна."

    # Ищем частичное совпадение в названии товара, без учета регистра
    # `na=False` гарантирует, что поиск будет работать даже если есть пустые ячейки
    results = inventory_df[inventory_df['product_name'].str.contains(text, case=False, na=False)]

    if results.empty:
        return f"Товар, содержащий '{text}', не найден."

    response = []
    for _, row in results.iterrows():
        status = "В наличии" if row['quantity'] > 0 else "Нет в наличии"
        response.append(
            f"🔹 **{row['product_name']}**\n"
            f"   Статус: {status}\n"
            f"   Остаток: {row['quantity']} шт.\n"
            f"   Цена: {row['price']} руб."
        )
    return "\n\n".join(response)


async def handle_ai_query(text: str) -> str:
    """
    Отправляет запрос к Gemini AI с контекстом из базы данных.
    """
    if inventory_df.empty:
        return "Извините, база данных сейчас недоступна. Не могу проконсультировать."

    inventory_context = get_inventory_as_text()

    # Это "промпт" - инструкция для нейросети
    prompt = f"""
Ты — дружелюбный и полезный ассистент-консультант в магазине.
Твоя задача — отвечать на вопросы клиента, основываясь на данных об остатках на складе.
Будь вежливым и отвечай на русском языке.
Не придумывай товары, которых нет в списке. Если товара нет, так и скажи.
Если клиент спрашивает про товар, которого нет в наличии (quantity = 0), сообщи, что его сейчас нет, но можно уточнить дату поставки.

Вот данные по остаткам на складе:
---
{inventory_context}
---

Вопрос клиента: "{text}"

Твой ответ:
"""
    try:
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        logger.error(f"Ошибка при запросе к Gemini AI: {e}")
        return "Произошла ошибка при обращении к AI. Попробуйте позже."


# --- 4. Обработчики команд Telegram ---

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start."""
    user = update.effective_user
    await update.message.reply_html(
        f"Здравствуйте, {user.mention_html()}!\n\n"
        f"Я бот-консультант. Я могу подсказать по наличию товаров.\n\n"
        f"Просто напишите название товара (например, `iPhone` или `кофемашина`).\n\n"
        f"Для консультации с AI-ассистентом, начните сообщение с `/ai`, например: `/ai есть у вас ноутбуки полегче?`"
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Основной обработчик сообщений."""
    user_message = update.message.text

    if not user_message:
        return

    # Проверяем, это AI-запрос или обычный
    if user_message.lower().startswith('/ai '):
        query = user_message[4:] # Убираем "/ai "
        await update.message.reply_text("Думаю над вашим вопросом... 🤔", parse_mode='Markdown')
        response_text = await handle_ai_query(query)
    else:
        response_text = handle_simple_query(user_message)

    # Отправляем ответ в Telegram, используя Markdown для форматирования
    await update.message.reply_text(response_text, parse_mode='Markdown')


# --- 5. Запуск бота ---

def main() -> None:
    """Основная функция для запуска бота."""
    logger.info("Запуск бота...")
    
    # Создаем приложение
    application = Application.builder().token(TELEGRAM_TOKEN).build()

    # Добавляем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Запускаем бота (он будет работать, пока вы его не остановите)
    application.run_polling()

if __name__ == '__main__':
    main()
