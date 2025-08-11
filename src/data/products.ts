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

// New Product type with categoryPath
export type Product = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  categoryPath: string[]; 
  ageMin: number;
  ageMax: number;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
};

// pickImage now uses the first element of the path (the main category)
const pickImage = (cat: string, index: number) => {
  const map: Record<string, string[]> = {
    constructors: [constructors1, constructors2],
    plush: [plush1, plush2],
    boardgames: [boardgames1, boardgames2],
    educational: [educational1, educational2],
    outdoor: [outdoor1, outdoor2],
  };
  const imgs = map[cat] || [];
  return imgs[index % imgs.length];
};

// New 'p' helper function with categoryPath
function p(id: string, name: string, categoryPath: string[], price: number, idx: number, short: string, desc: string, age: [number, number], flags?: Partial<Product>) : Product {
  return {
    id,
    name,
    categoryPath,
    price,
    shortDescription: short,
    description: desc,
    ageMin: age[0],
    ageMax: age[1],
    image: pickImage(categoryPath[0], idx),
    isPopular: flags?.isPopular,
    isNew: flags?.isNew,
  };
}

const lorem = (extra = "") => `Игрушка высокого качества с безопасными материалами. Развивает воображение, моторику и усидчивость. ${extra}`.trim();

export const products: Product[] = [
  // Конструкторы
  p("c1", "Конструктор 'Космический шаттл'", ["constructors", "constructors-for-boys", "vehicles"], 3590, 0, "Собери свой шаттл!", lorem(), [6, 12], { isPopular: true }),
  p("c2", "Конструктор 'Робот-трансформер'", ["constructors", "constructors-for-boys", "robots"], 3290, 1, "Из машины в робота и обратно", lorem(), [5, 10], { isNew: true }),
  p("c3", "Набор для создания украшений 'Принцесса'", ["constructors", "constructors-for-girls", "jewelry"], 1990, 2, "Бусы, браслеты и кольца", lorem(), [5, 10]),
  p("c4", "Конструктор 'Замок мечты'", ["constructors", "constructors-for-girls", "castles"], 4290, 3, "Построй дворец для кукол", lorem(), [6, 12]),
  p("c5", "Магнитный конструктор 'Геометрия'", ["constructors", "constructors-unisex", "magnetic"], 2990, 4, "Фигуры и формы", lorem(), [4, 9]),
  p("c6", "Деревянные кубики 'Радуга'", ["constructors", "constructors-unisex", "wooden"], 2190, 5, "Классика в новом цвете", lorem(), [2, 6]),

  // Мягкие игрушки
  p("p1", "Плюшевый мишка 'Лесовичок'", ["plush", "classic-animals", "forest-animals"], 1890, 0, "Невероятно мягкий и уютный", lorem(), [3, 10], { isPopular: true }),
  p("p2", "Мягкая игрушка 'Лев-король'", ["plush", "classic-animals", "savanna-dwellers"], 2190, 1, "Царь зверей у тебя дома", lorem(), [3, 10], { isNew: true }),
  p("p3", "Единорог 'Звездочка'", ["plush", "fantasy-creatures", "unicorns-dragons"], 1990, 2, "Волшебство в каждой нитке", lorem(), [3, 10]),
  p("p4", "Мягкая игрушка 'Чебурашка'", ["plush", "cartoon-characters", "russian-cartoons"], 2490, 3, "По мотивам любимого мультика", lorem(), [3, 10]),
  p("p5", "Мягкая игрушка 'Стич'", ["plush", "cartoon-characters", "foreign-cartoons"], 2690, 4, "Очаровательный инопланетянин", lorem(), [4, 12]),

  // Настольные игры
  p("b1", "Игра-ходилка 'Змеи и лестницы'", ["boardgames", "family-games", "roll-move"], 1490, 0, "Классическая игра для всех", lorem(), [4, 99], { isPopular: true }),
  p("b2", "Викторина 'Что? Где? Когда?'", ["boardgames", "family-games", "quizzes"], 1990, 1, "Проверь свою эрудицию", lorem(), [10, 99], { isNew: true }),
  p("b3", "Игра 'Монополия'", ["boardgames", "strategy-games", "economic-strategy"], 2590, 2, "Стань финансовым магнатом", lorem(), [8, 99]),
  p("b4", "Игра 'Элиас' для вечеринок", ["boardgames", "party-games", "association-games"], 1790, 3, "Объясняй слова на время", lorem(), [10, 99]),

  // Развивающие
  p("e1", "Сортер 'Фигуры и цвета'", ["educational", "toddlers", "sorters-pyramids"], 1590, 0, "Учимся, играя", lorem(), [1, 3], { isPopular: true }),
  p("e2", "Бизиборд 'Домик'", ["educational", "toddlers", "busy-boards"], 3490, 1, "Все, что можно потрогать", lorem(), [1, 4], { isNew: true }),
  p("e3", "Набор 'Учимся считать'", ["educational", "preschoolers", "learning-basics"], 1990, 2, "Цифры и простые примеры", lorem(), [3, 6]),
  p("e4", "Набор 'Юный химик'", ["educational", "schoolers", "science-kits"], 2990, 3, "Безопасные и яркие опыты", lorem(), [8, 14]),

  // Для улицы
  p("o1", "Футбольный мяч", ["outdoor", "outdoor-active", "balls-frisbees"], 990, 0, "Для активных игр", lorem(), [5, 12], { isPopular: true }),
  p("o2", "Беговел 'Ракета'", ["outdoor", "outdoor-transport", "scooters"], 4990, 1, "Первый шаг к велосипеду", lorem(), [2, 5], { isNew: true }),
  p("o3", "Набор для песка 'Замок'", ["outdoor", "sandbox-play", "sandbox-sets"], 1290, 2, "Ведерко, лопатка, формочки", lorem(), [2, 6]),

  // --- Новые товары (60) ---
  // constructors-boys-vehicles
  p("v1", "Гоночная машина", ["constructors", "constructors-for-boys", "vehicles", "vehicles-cars"], 1990, 10, "Собери свой болид", lorem(), [7, 12]),
  p("v2", "Истребитель 'Стелс'", ["constructors", "constructors-for-boys", "vehicles", "vehicles-airplanes"], 2490, 11, "Покори небеса", lorem(), [8, 14]),
  // constructors-boys-robots
  p("r1", "Боевой робот 'Титан'", ["constructors", "constructors-for-boys", "robots", "robots-battle"], 3190, 12, "Мощная броня и оружие", lorem(), [8, 16]),
  p("r2", "Робот-помощник 'Бадди'", ["constructors", "constructors-for-boys", "robots", "robots-helper"], 2890, 13, "Твой личный ассистент", lorem(), [6, 12]),
  // constructors-girls-castles
  p("g1", "Классический замок принцессы", ["constructors", "constructors-for-girls", "castles", "castles-classic"], 4590, 14, "С башнями и флагами", lorem(), [6, 12]),
  p("g2", "Волшебная башня феи", ["constructors", "constructors-for-girls", "castles", "castles-magic"], 3990, 15, "Секретные комнаты и блестки", lorem(), [6, 12]),
  // constructors-girls-jewelry
  p("j1", "Набор для браслетов 'Дружба'", ["constructors", "constructors-for-girls", "jewelry", "jewelry-bracelets"], 1790, 16, "Создай и подари подруге", lorem(), [7, 12]),
  p("j2", "Кольца и диадемы 'Маленькая королева'", ["constructors", "constructors-for-girls", "jewelry", "jewelry-rings"], 1590, 17, "Почувствуй себя особенной", lorem(), [7, 12]),
  // constructors-unisex-magnetic
  p("m1", "Магнитный конструктор 2D 'Мозаика'", ["constructors", "constructors-unisex", "magnetic", "magnetic-2d"], 2290, 18, "Картины из магнитных деталей", lorem(), [4, 8]),
  p("m2", "Магнитный конструктор 3D 'Архитектор'", ["constructors", "constructors-unisex", "magnetic", "magnetic-3d"], 3490, 19, "Строй объемные башни и мосты", lorem(), [6, 12]),
  // constructors-unisex-wooden
  p("w1", "Деревянные цветные блоки 'Радуга'", ["constructors", "constructors-unisex", "wooden", "wooden-colored"], 2590, 20, "Яркие и безопасные кубики", lorem(), [2, 6]),
  p("w2", "Деревянный конструктор 'Избушка'", ["constructors", "constructors-unisex", "wooden", "wooden-natural"], 2990, 21, "Собери домик из бревен", lorem(), [5, 10]),

  // --- Мягкие игрушки ---
  p("pl1", "Мягкая игрушка Медведь", ["plush", "classic-animals", "forest-animals", "forest-bears"], 1990, 22, "Классический плюшевый мишка", lorem(), [3, 10]),
  p("pl2", "Мягкая игрушка Зайчик", ["plush", "classic-animals", "forest-animals", "forest-bunnies"], 1790, 23, "Длинные ушки, мягкий хвостик", lorem(), [3, 10]),
  p("pl3", "Мягкая игрушка Лев", ["plush", "classic-animals", "savanna-dwellers", "savanna-lions"], 2190, 24, "Король джунглей", lorem(), [3, 10]),
  p("pl4", "Мягкая игрушка Слон", ["plush", "classic-animals", "savanna-dwellers", "savanna-elephants"], 2290, 25, "Большой и добрый друг", lorem(), [3, 10]),
  p("pl5", "Мягкая игрушка Единорог", ["plush", "fantasy-creatures", "unicorns-dragons", "unicorns"], 2490, 26, "Волшебный рог и радужная грива", lorem(), [3, 10]),
  p("pl6", "Мягкая игрушка Дракон", ["plush", "fantasy-creatures", "unicorns-dragons", "dragons"], 2690, 27, "Огнедышащий, но очень добрый", lorem(), [3, 10]),

  // --- Настольные игры ---
  p("bg1", "Игра-ходилка 'Гуси-лебеди'", ["boardgames", "family-games", "roll-move", "rollmove-simple"], 1290, 28, "Простые правила, весело играть", lorem(), [4, 8]),
  p("bg2", "Игра-квест 'Тайна заброшенного замка'", ["boardgames", "family-games", "roll-move", "rollmove-complex"], 1990, 29, "Разгадай все загадки", lorem(), [8, 14]),
  p("bg3", "Экономическая игра 'Стартап'", ["boardgames", "strategy-games", "economic-strategy", "economic-business"], 2990, 30, "Создай свою корпорацию", lorem(), [12, 99]),
  p("bg4", "Стратегия 'Колонизаторы'", ["boardgames", "strategy-games", "economic-strategy", "economic-resources"], 3490, 31, "Добывай ресурсы и развивайся", lorem(), [12, 99]),

  // --- Развивающие ---
  p("ed1", "Сортер по форме 'Геометрик'", ["educational", "toddlers", "sorters-pyramids", "sorters-shape"], 1490, 32, "Круг, квадрат, треугольник", lorem(), [1, 3]),
  p("ed2", "Сортер по цвету 'Радуга'", ["educational", "toddlers", "sorters-pyramids", "sorters-color"], 1590, 33, "Изучаем цвета", lorem(), [1, 3]),
  p("ed3", "Азбука в кубиках", ["educational", "preschoolers", "learning-basics", "learning-abc"], 1790, 34, "Учим буквы весело", lorem(), [3, 6]),
  p("ed4", "Набор 'Считаем до 10'", ["educational", "preschoolers", "learning-basics", "learning-123"], 1690, 35, "Простая математика", lorem(), [3, 6]),

  // --- Для улицы ---
  p("o11", "Футбольный мяч", ["outdoor", "outdoor-active", "balls-frisbees", "balls-team"], 1290, 36, "Для игры с друзьями", lorem(), [6, 12]),
  p("o12", "Летающая тарелка фрисби", ["outdoor", "outdoor-active", "balls-frisbees", "balls-individual"], 790, 37, "Для активного отдыха", lorem(), [5, 99]),
  p("o13", "Двухколесный самокат", ["outdoor", "outdoor-transport", "scooters", "scooters-2-wheels"], 3990, 38, "Быстрый и маневренный", lorem(), [6, 12]),
  p("o14", "Трехколесный самокат", ["outdoor", "outdoor-transport", "scooters", "scooters-3-wheels"], 3490, 39, "Устойчивый и безопасный", lorem(), [3, 6])
];