import constructors1 from "@/assets/products/constructors-1.webp";
import constructors2 from "@/assets/products/constructors-2.webp";
import plush1 from "@/assets/products/plush-1.webp";
import plush2 from "@/assets/products/plush-2.webp";
import boardgames1 from "@/assets/products/boardgames-1.webp";
import boardgames2 from "@/assets/products/boardgames-2.webp";
import educational1 from "@/assets/products/educational-1.webp";
import educational2 from "@/assets/products/educational-2.webp";
import outdoor1 from "@/assets/products/outdoor-1.webp";
import outdoor2 from "@/assets/products/outdoor-2.webp";

export type Product = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  category: "constructors" | "plush" | "boardgames" | "educational" | "outdoor";
  ageMin: number;
  ageMax: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
};

const pickImage = (cat: Product["category"], index: number) => {
  const map: Record<Product["category"], string[]> = {
    constructors: [constructors1, constructors2],
    plush: [plush1, plush2],
    boardgames: [boardgames1, boardgames2],
    educational: [educational1, educational2],
    outdoor: [outdoor1, outdoor2],
  };
  const imgs = map[cat];
  return imgs[index % imgs.length];
};

function p(id: string, name: string, category: Product["category"], price: number, idx: number, short: string, desc: string, age: [number, number], flags?: Partial<Product>) : Product {
  return {
    id,
    name,
    category,
    price,
    shortDescription: short,
    description: desc,
    ageMin: age[0],
    ageMax: age[1],
    image: pickImage(category, idx),
    isPopular: flags?.isPopular,
    isNew: flags?.isNew,
  };
}

const lorem = (extra = "") => `Игрушка высокого качества с безопасными материалами. Развивает воображение, моторику и усидчивость. ${extra}`.trim();

export const products: Product[] = [
  // Конструкторы (10)
  p("c1", "Лего-совместимый набор \"Космическая станция\"", "constructors", 3590, 0, "Стань юным космонавтом!", lorem("В наборе модули, антенны и мини-фигурки."), [6, 12], { isPopular: true }),
  p("c2", "Магнитный конструктор \"Волшебный замок\"", "constructors", 3290, 1, "Строй яркие сказочные дворцы", lorem("Прочные магнитные грани легко соединяются."), [4, 10], { isNew: true }),
  p("c3", "Набор \"Город будущего\"", "constructors", 3990, 2, "Современные башни и мосты", lorem(), [6, 12]),
  p("c4", "Техно-болиды \"Суперскорость\"", "constructors", 2790, 3, "Собери и соревнуйся", lorem(), [5, 10]),
  p("c5", "Мини-набор \"Космодрон\"", "constructors", 1490, 4, "Компактный, но увлекательный", lorem(), [6, 12]),
  p("c6", "Магнитные \"Радужные мосты\"", "constructors", 2890, 5, "Гибкие формы и устойчивые конструкции", lorem(), [4, 9]),
  p("c7", "Инженерный сет \"Роболаборатория\"", "constructors", 4490, 6, "Первое знакомство с механикой", lorem(), [7, 12]),
  p("c8", "Арктическая экспедиция", "constructors", 3190, 7, "Построй базу на льду", lorem(), [6, 12]),
  p("c9", "Динопарк строителя", "constructors", 2990, 8, "Юрский период у тебя дома", lorem(), [5, 10]),
  p("c10", "Кубики \"Неон Сити\"", "constructors", 1990, 9, "Большие детали для маленьких рук", lorem(), [3, 6]),

  // Мягкие игрушки (10)
  p("p1", "Плюшевый мишка \"Обнимашка\"", "plush", 1890, 0, "Невероятно мягкий и уютный", lorem(), [3, 10], { isPopular: true }),
  p("p2", "Зайчик \"Сплюшка\"", "plush", 1590, 1, "Любимый друг для сна", lorem(), [3, 8], { isNew: true }),
  p("p3", "Котёнок \"Мурлыка\"", "plush", 1690, 2, "Мягкая шерстка и бантик", lorem(), [3, 10]),
  p("p4", "Единорог \"Радужка\"", "plush", 1990, 3, "Сказочное настроение", lorem(), [3, 10]),
  p("p5", "Слонёнок \"Пых\"", "plush", 1590, 4, "Очаровательные ушки", lorem(), [3, 8]),
  p("p6", "Лисёнок \"Искорка\"", "plush", 1790, 5, "Оранжевый хвостик", lorem(), [3, 10]),
  p("p7", "Панда \"Бамбуня\"", "plush", 2090, 6, "Дружелюбная и мягкая", lorem(), [3, 10]),
  p("p8", "Щенок \"Дружок\"", "plush", 1690, 7, "Верный друг", lorem(), [3, 10]),
  p("p9", "Коала \"Соня\"", "plush", 1790, 8, "Обнимательный плюш", lorem(), [3, 10]),
  p("p10", "Жирафик \"Пятныш\"", "plush", 1890, 9, "Длинная шейка и добрые глаза", lorem(), [3, 10]),

  // Настольные игры (10)
  p("b1", "Семейная игра \"Весёлая ферма\"", "boardgames", 2490, 0, "Учимся считать с животными", lorem(), [5, 10], { isPopular: true }),
  p("b2", "Стратегия \"Пиратские сокровища\"", "boardgames", 2890, 1, "Клад, карты и удача!", lorem(), [7, 12], { isNew: true }),
  p("b3", "Головоломка \"Лабиринт цветов\"", "boardgames", 1990, 2, "Развивает логику", lorem(), [6, 12]),
  p("b4", "Пати-игра \"Хлоп-Хлоп\"", "boardgames", 1590, 3, "Весёлые задания", lorem(), [6, 12]),
  p("b5", "Приключение \"Сказочный лес\"", "boardgames", 2690, 4, "Собери команды героев", lorem(), [6, 12]),
  p("b6", "Мемо \"Зверята\"", "boardgames", 1190, 5, "Тренируем память", lorem(), [3, 8]),
  p("b7", "Кооператив \"Спасём планету\"", "boardgames", 2790, 6, "Учимся вместе", lorem(), [7, 12]),
  p("b8", "Викторина \"Почему и потому\"", "boardgames", 1790, 7, "Интересные факты", lorem(), [6, 12]),
  p("b9", "Тактика \"Рыцари арены\"", "boardgames", 2990, 8, "Сразись за кубок", lorem(), [8, 12]),
  p("b10", "Лото \"Цвета и формы\"", "boardgames", 1290, 9, "Познавательно и весело", lorem(), [3, 7]),

  // Развивающие (10)
  p("e1", "Деревянный сортер \"Геометрия\"", "educational", 1790, 0, "Классифицируем формы", lorem(), [2, 5], { isPopular: true }),
  p("e2", "Бизиборд \"Маленький инженер\"", "educational", 3290, 1, "Логика и моторика", lorem(), [2, 6], { isNew: true }),
  p("e3", "Пазл \"Мир животных\" 60 эл.", "educational", 1390, 2, "Яркие детали", lorem(), [4, 8]),
  p("e4", "Алфавитные кубики \"Азбука\"", "educational", 1490, 3, "Учимся читать", lorem(), [3, 7]),
  p("e5", "Счётные палочки \"10 цветов\"", "educational", 990, 4, "Математика играючи", lorem(), [3, 7]),
  p("e6", "Музыкальный ксилофон", "educational", 1990, 5, "Развиваем слух", lorem(), [3, 7]),
  p("e7", "Набор для творчества \"Акварель\"", "educational", 1690, 6, "Маленький художник", lorem(), [5, 12]),
  p("e8", "Танграм \"Классический\"", "educational", 1290, 7, "Фигуры и образы", lorem(), [5, 12]),
  p("e9", "Карточки \"Профессии\"", "educational", 990, 8, "Расширяем словарный запас", lorem(), [3, 8]),
  p("e10", "Магнитная азбука", "educational", 1590, 9, "Буквы на холодильник", lorem(), [3, 8]),

  // Для улицы (10)
  p("o1", "Набор для песочницы \"Юный строитель\"", "outdoor", 1490, 0, "Формочки и лопатка", lorem(), [3, 8], { isPopular: true }),
  p("o2", "Летающий диск \"НЛО\"", "outdoor", 1290, 1, "Лёгкий и прочный", lorem(), [5, 12], { isNew: true }),
  p("o3", "Прыгалка \"Весёлые полоски\"", "outdoor", 1090, 2, "Зарядка для тела", lorem(), [5, 12]),
  p("o4", "Мыльные пузыри \"Радуга\"", "outdoor", 490, 3, "Крупные и стойкие пузыри", lorem(), [3, 10]),
  p("o5", "Воздушный змей \"Дельта\"", "outdoor", 1890, 4, "Летит высоко", lorem(), [6, 12]),
  p("o6", "Мяч \"Пастель\" 22 см", "outdoor", 690, 5, "Мягкий и упругий", lorem(), [3, 10]),
  p("o7", "Крюкбол \"Цепкий\"", "outdoor", 1790, 6, "Активная игра на улице", lorem(), [6, 12]),
  p("o8", "Бадминтон детский", "outdoor", 1590, 7, "Лёгкие ракетки и волан", lorem(), [6, 12]),
  p("o9", "Мелки тротуарные \"Калейдоскоп\"", "outdoor", 390, 8, "Рисуй на свежем воздухе", lorem(), [3, 10]),
  p("o10", "Скакалка со счётчиком", "outdoor", 1190, 9, "Веди рекорды", lorem(), [6, 12]),
];
