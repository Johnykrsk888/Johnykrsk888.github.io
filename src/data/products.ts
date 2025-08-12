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
  quantity: number;
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
function p(id: string, name: string, categoryPath: string[], price: number, quantity: number, idx: number, short: string, desc: string, age: [number, number], flags?: Partial<Product>) : Product {
  return {
    id,
    name,
    categoryPath,
    price,
    quantity,
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
  p("c1", "Конструктор 'Космический шаттл'", ["constructors", "constructors-for-boys", "vehicles", "vehicles-cars"], 3590, 35, 0, "Собери свой шаттл!", lorem(), [6, 12], { isPopular: true }),
  p("c2", "Конструктор 'Робот-трансформер'", ["constructors", "constructors-for-boys", "robots", "robots-battle"], 3290, 81, 1, "Из машины в робота и обратно", lorem(), [5, 10], { isNew: true }),
  p("c3", "Набор для создания браслетов 'Дружба'", ["constructors", "constructors-for-girls", "jewelry", "jewelry-bracelets"], 1990, 42, 2, "Бусы, браслеты и кольца", lorem(), [5, 10]),
  p("c4", "Конструктор 'Замок принцессы'", ["constructors", "constructors-for-girls", "castles", "castles-classic"], 4290, 18, 3, "Построй дворец для кукол", lorem(), [6, 12]),
  p("c5", "Магнитный 3D-конструктор 'Геометрия'", ["constructors", "constructors-unisex", "magnetic", "magnetic-3d"], 2990, 67, 4, "Фигуры и формы", lorem(), [4, 9]),
  p("c6", "Деревянные кубики 'Радуга'", ["constructors", "constructors-unisex", "wooden", "wooden-colored"], 2190, 55, 5, "Классика в новом цвете", lorem(), [2, 6]),

  // Мягкие игрушки
  p("p1", "Плюшевый мишка 'Лесовичок'", ["plush", "classic-animals", "forest-animals", "forest-bears"], 1890, 73, 0, "Невероятно мягкий и уютный", lorem(), [3, 10], { isPopular: true }),
  p("p2", "Мягкая игрушка 'Лев-король'", ["plush", "classic-animals", "savanna-dwellers", "savanna-lions"], 2190, 22, 1, "Царь зверей у тебя дома", lorem(), [3, 10], { isNew: true }),
  p("p3", "Единорог 'Звездочка'", ["plush", "fantasy-creatures", "unicorns-dragons", "unicorns"], 1990, 48, 2, "Волшебство в каждой нитке", lorem(), [3, 10]),
  p("p4", "Мягкая игрушка 'Чебурашка'", ["plush", "cartoon-characters", "russian-cartoons"], 2490, 88, 3, "По мотивам любимого мультика", lorem(), [3, 10]),

  // Настольные игры
  p("b1", "Игра-ходилка 'Змеи и лестницы'", ["boardgames", "family-games", "roll-move", "rollmove-simple"], 1490, 30, 0, "Классическая игра для всех", lorem(), [4, 99], { isPopular: true }),
  p("b2", "Экономическая игра 'Монополия'", ["boardgames", "strategy-games", "economic-strategy", "economic-business"], 2590, 15, 2, "Стань финансовым магнатом", lorem(), [8, 99]),

  // Развивающие
  p("e1", "Сортер 'Фигуры и цвета'", ["educational", "toddlers", "sorters-pyramids", "sorters-shape"], 1590, 61, 0, "Учимся, играя", lorem(), [1, 3], { isPopular: true }),
  p("e2", "Набор 'Учимся считать'", ["educational", "preschoolers", "learning-basics", "learning-123"], 1990, 50, 2, "Цифры и простые примеры", lorem(), [3, 6]),

  // Для улицы
  p("o1", "Футбольный мяч", ["outdoor", "outdoor-active", "balls-frisbees", "balls-team"], 990, 78, 0, "Для активных игр", lorem(), [5, 12], { isPopular: true }),
  p("o2", "Трехколесный самокат", ["outdoor", "outdoor-transport", "scooters", "scooters-3-wheels"], 3490, 25, 1, "Устойчивый и безопасный", lorem(), [3, 6]),
];
