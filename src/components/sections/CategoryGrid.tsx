import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

export const CategoryGrid = () => {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl mb-4">Категории</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/catalog?category=${cat.slug}`} className="group block rounded-xl overflow-hidden border bg-card hover-scale">
            <div className="aspect-square overflow-hidden">
              <img src={cat.image} alt={`Категория ${cat.title}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3 text-center font-medium">{cat.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};
