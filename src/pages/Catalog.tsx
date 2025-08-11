import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Filters, FiltersState } from "@/components/catalog/Filters";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";

const matchesAge = (pMin: number, pMax: number, selected: string) => {
  if (selected === "all") return true;
  const [min, max] = selected.split('-').map(Number);
  return !(pMax < min || pMin > max);
};

const Catalog = () => {
  const [params] = useSearchParams();
  const initialCategory = params.get("category") as any;
  const q = (params.get("q") || "").toLowerCase();
  const [filters, setFilters] = useState<FiltersState | null>(null);

  const filtered = useMemo(() => {
    const f = filters ?? { categories: new Set(initialCategory ? [initialCategory] : []), age: "all", price: [0, Infinity] as [number, number] };
    return products.filter(p => {
      const byCat = f.categories.size ? f.categories.has(p.category) : true;
      const byAge = matchesAge(p.ageMin, p.ageMax, f.age);
      const byPrice = p.price >= f.price[0] && p.price <= f.price[1];
      const hay = (p.name + " " + p.shortDescription + " " + p.description).toLowerCase();
      const byQuery = q ? hay.includes(q) : true;
      return byCat && byAge && byPrice && byQuery;
    });
  }, [filters, initialCategory, q]);

  return (
    <div>
      <Helmet>
        <title>Каталог — Мир Чудес</title>
        <meta name="description" content="Каталог детских игрушек: конструкторы, мягкие, настольные, развивающие и игрушки для улицы." />
        <link rel="canonical" href="/catalog" />
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl mb-6">Каталог</h1>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <Filters products={products} onChange={setFilters} />
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-muted-foreground mt-8">Ничего не найдено. Измените параметры фильтра.</p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
