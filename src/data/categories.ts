import constructors1 from "@/assets/products/constructors-1.webp";
import plush1 from "@/assets/products/plush-1.webp";
import boardgames1 from "@/assets/products/boardgames-1.webp";
import educational1 from "@/assets/products/educational-1.webp";
import outdoor1 from "@/assets/products/outdoor-1.webp";

export type Category = {
  id: string;
  title: string;
  slug: string;
  image?: string;
  selectionMode?: 'radio' | 'multiple';
  subcategories?: Category[];
};

export const categories: Category[] = [
  {
    id: "constructors",
    title: "Конструкторы",
    slug: "constructors",
    image: constructors1,
    subcategories: [
      {
        id: "constructors-boys",
        title: "Для мальчиков",
        slug: "constructors-for-boys",
        subcategories: [
          { 
            id: "constructors-boys-vehicles", title: "Техника", slug: "vehicles",
            selectionMode: 'radio',
            subcategories: [
              { id: "vehicles-cars", title: "Машины и грузовики", slug: "vehicles-cars" },
              { id: "vehicles-airplanes", title: "Летательная техника", slug: "vehicles-airplanes" },
            ]
          },
          { 
            id: "constructors-boys-robots", title: "Роботы и трансформеры", slug: "robots",
            selectionMode: 'radio',
            subcategories: [
              { id: "robots-battle", title: "Боевые роботы", slug: "robots-battle" },
              { id: "robots-helper", title: "Роботы-помощники", slug: "robots-helper" },
            ]
          },
        ],
      },
      {
        id: "constructors-girls",
        title: "Для девочек",
        slug: "constructors-for-girls",
        subcategories: [
          { 
            id: "constructors-girls-castles", title: "Замки и дворцы", slug: "castles",
            selectionMode: 'radio',
            subcategories: [
              { id: "castles-classic", title: "Классические замки", slug: "castles-classic" },
              { id: "castles-magic", title: "Волшебные башни", slug: "castles-magic" },
            ]
          },
          { 
            id: "constructors-girls-jewelry", title: "Создание украшений", slug: "jewelry",
            selectionMode: 'radio',
            subcategories: [
              { id: "jewelry-bracelets", title: "Браслеты и ожерелья", slug: "jewelry-bracelets" },
              { id: "jewelry-rings", title: "Кольца и диадемы", slug: "jewelry-rings" },
            ]
          },
        ],
      },
      {
        id: "constructors-unisex",
        title: "Универсальные",
        slug: "constructors-unisex",
        subcategories: [
          { 
            id: "constructors-unisex-magnetic", title: "Магнитные конструкторы", slug: "magnetic",
            selectionMode: 'radio',
            subcategories: [
              { id: "magnetic-2d", title: "Плоские наборы (2D)", slug: "magnetic-2d" },
              { id: "magnetic-3d", title: "Объемные фигуры (3D)", slug: "magnetic-3d" },
            ]
          },
          { 
            id: "constructors-unisex-wooden", title: "Деревянные кубики и блоки", slug: "wooden",
            selectionMode: 'radio',
            subcategories: [
              { id: "wooden-colored", title: "Цветные блоки", slug: "wooden-colored" },
              { id: "wooden-natural", title: "Натуральное дерево", slug: "wooden-natural" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "plush",
    title: "Мягкие игрушки",
    slug: "plush",
    image: plush1,
    subcategories: [
      {
        id: "plush-classic", title: "Классические животные", slug: "classic-animals",
        subcategories: [
          { 
            id: "plush-classic-forest", title: "Лесные звери", slug: "forest-animals",
            selectionMode: 'radio',
            subcategories: [
              { id: "forest-bears", title: "Медведи и волки", slug: "forest-bears" },
              { id: "forest-bunnies", title: "Зайцы и лисы", slug: "forest-bunnies" },
            ]
          },
          { 
            id: "plush-classic-savanna", title: "Обитатели саванны", slug: "savanna-dwellers",
            selectionMode: 'radio',
            subcategories: [
              { id: "savanna-lions", title: "Львы и тигры", slug: "savanna-lions" },
              { id: "savanna-elephants", title: "Слоны и жирафы", slug: "savanna-elephants" },
            ]
          },
        ],
      },
      {
        id: "plush-fantasy", title: "Сказочные существа", slug: "fantasy-creatures",
        subcategories: [
          { 
            id: "plush-fantasy-unicorns", title: "Единороги и драконы", slug: "unicorns-dragons",
            selectionMode: 'radio',
            subcategories: [
              { id: "unicorns", title: "Добрые единороги", slug: "unicorns" },
              { id: "dragons", title: "Огнедышащие драконы", slug: "dragons" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "boardgames",
    title: "Настольные игры",
    slug: "boardgames",
    image: boardgames1,
    subcategories: [
      {
        id: "boardgames-family", title: "Для всей семьи", slug: "family-games",
        subcategories: [
          { 
            id: "boardgames-family-rollmove", title: "Игры-ходилки", slug: "roll-move",
            selectionMode: 'radio',
            subcategories: [
              { id: "rollmove-simple", title: "С простыми правилами", slug: "rollmove-simple" },
              { id: "rollmove-complex", title: "С усложненными правилами", slug: "rollmove-complex" },
            ]
          },
        ],
      },
      {
        id: "boardgames-strategy", title: "Стратегические", slug: "strategy-games",
        subcategories: [
          { 
            id: "boardgames-strategy-economic", title: "Экономические", slug: "economic-strategy",
            selectionMode: 'radio',
            subcategories: [
              { id: "economic-business", title: "Про бизнес", slug: "economic-business" },
              { id: "economic-resources", title: "Про ресурсы", slug: "economic-resources" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "educational",
    title: "Развивающие",
    slug: "educational",
    image: educational1,
    subcategories: [
      {
        id: "educational-toddlers", title: "Для малышей (0-3 года)", slug: "toddlers",
        subcategories: [
          { 
            id: "educational-toddlers-sorters", title: "Сортеры и пирамидки", slug: "sorters-pyramids",
            selectionMode: 'radio',
            subcategories: [
              { id: "sorters-shape", title: "По форме", slug: "sorters-shape" },
              { id: "sorters-color", title: "По цвету", slug: "sorters-color" },
            ]
          },
        ],
      },
      {
        id: "educational-preschoolers", title: "Дошкольникам (3-6 лет)", slug: "preschoolers",
        subcategories: [
          { 
            id: "educational-preschoolers-learning", title: "Учимся считать и читать", slug: "learning-basics",
            selectionMode: 'radio',
            subcategories: [
              { id: "learning-abc", title: "Азбука и буквы", slug: "learning-abc" },
              { id: "learning-123", title: "Цифры и счет", slug: "learning-123" },
            ]
          },
        ],
      },
    ],
  },
  {
    id: "outdoor",
    title: "Для улицы",
    slug: "outdoor",
    image: outdoor1,
    subcategories: [
      {
        id: "outdoor-active", title: "Активные игры", slug: "outdoor-active",
        subcategories: [
          { 
            id: "outdoor-active-balls", title: "Мячи и фрисби", slug: "balls-frisbees",
            selectionMode: 'radio',
            subcategories: [
              { id: "balls-team", title: "Для командных игр", slug: "balls-team" },
              { id: "balls-individual", title: "Для индивидуальных игр", slug: "balls-individual" },
            ]
          },
        ],
      },
      {
        id: "outdoor-transport", title: "Детский транспорт", slug: "outdoor-transport",
        subcategories: [
          { 
            id: "outdoor-transport-scooters", title: "Беговелы и самокаты", slug: "scooters",
            selectionMode: 'radio',
            subcategories: [
              { id: "scooters-2-wheels", title: "Двухколесные", slug: "scooters-2-wheels" },
              { id: "scooters-3-wheels", title: "Трехколесные", slug: "scooters-3-wheels" },
            ]
          },
        ],
      },
    ],
  },
];