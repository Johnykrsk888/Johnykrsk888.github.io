import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Filters, FiltersState, useDefaultPriceRange } from "@/components/catalog/Filters";
import { ProductCard } from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const matchesAge = (pMin: number, pMax: number, selected: string) => {
  if (selected === "all") return true;
  const [min, max] = selected.split('-').map(Number);
  return !(pMax < min || pMin > max);
};

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").toLowerCase();
  const initialCategorySlug = searchParams.get("category");

  const defaultPriceRange = useDefaultPriceRange(products);
  const [filters, setFilters] = useState<FiltersState>({ 
    categorySlug: initialCategorySlug,
    age: "all", 
    price: defaultPriceRange 
  });
  const [shuffleKey, setShuffleKey] = useState(0);

  // Update filter if URL parameter changes
  useEffect(() => {
    setFilters(f => ({ ...f, categorySlug: initialCategorySlug }));
  }, [initialCategorySlug]);

  // Reset price filter when product list changes
  useEffect(() => {
    setFilters(f => ({ ...f, price: defaultPriceRange }));
  }, [defaultPriceRange]);

  const handleReset = () => {
    setFilters({ 
      categorySlug: null, 
      age: "all", 
      price: defaultPriceRange 
    });
    setShuffleKey(k => k + 1);
  };

  const filtered = useMemo(() => {
    return products.filter(p => {
      const byCategory = filters.categorySlug ? p.categoryPath.includes(filters.categorySlug) : true;
      const byAge = matchesAge(p.ageMin, p.ageMax, filters.age);
      const byPrice = p.price >= filters.price[0] && p.price <= filters.price[1];
      const hay = (p.name + " " + p.shortDescription + " " + p.description).toLowerCase();
      const byQuery = q ? hay.includes(q) : true;
      return byCategory && byAge && byPrice && byQuery;
    });
  }, [filters, q]);

  const displayedProducts = useMemo(() => {
    if (shuffleKey > 0) {
      return [...filtered].sort(() => Math.random() - 0.5);
    }
    return filtered;
  }, [filtered, shuffleKey]);

  return (
    <div>
      <Helmet>
        <title>Каталог — Мир Чудес</title>
        <meta name="description" content="Каталог детских игрушек: конструкторы, мягкие, настольные, развивающие и игрушки для улицы." />
        <link rel="canonical" href="/catalog" />
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 
          onClick={handleReset}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "font-display text-3xl mb-6 h-auto w-fit cursor-pointer"
          )}
        >
          Каталог
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <Filters products={products} filters={filters} setFilters={setFilters} />
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {displayedProducts.length === 0 && (
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
