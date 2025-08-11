export type Category = {
  id: string;
  title: string;
  slug: string;
  image: string;
};

import constructors1 from "@/assets/products/constructors-1.webp";
import plush1 from "@/assets/products/plush-1.webp";
import boardgames1 from "@/assets/products/boardgames-1.webp";
import educational1 from "@/assets/products/educational-1.webp";
import outdoor1 from "@/assets/products/outdoor-1.webp";

export const categories: Category[] = [
  { id: "constructors", title: "Конструкторы", slug: "constructors", image: constructors1 },
  { id: "plush", title: "Мягкие игрушки", slug: "plush", image: plush1 },
  { id: "boardgames", title: "Настольные игры", slug: "boardgames", image: boardgames1 },
  { id: "educational", title: "Развивающие", slug: "educational", image: educational1 },
  { id: "outdoor", title: "Для улицы", slug: "outdoor", image: outdoor1 },
];
