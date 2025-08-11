import { useMemo, useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@/data/products";

export type FiltersState = {
  categories: Set<Product["category"]>;
  age: string | "all";
  price: [number, number];
};

const AGE_OPTIONS = [
  { label: "Все возрасты", value: "all" },
  { label: "2–4", value: "2-4" },
  { label: "3–5", value: "3-5" },
  { label: "5–8", value: "5-8" },
  { label: "6–12", value: "6-12" },
];

export const useDefaultPriceRange = (products: Product[]) => {
  return useMemo<[number, number]>(() => {
    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
  }, [products]);
};

export const Filters = ({ products, onChange, initialCategories }: { products: Product[]; onChange: (f: FiltersState) => void; initialCategories?: Product["category"][] }) => {
  const [priceRange] = useState<[number, number]>(useDefaultPriceRange(products));
  const [filters, setFilters] = useState<FiltersState>({ categories: new Set(), age: "all", price: priceRange });

  useEffect(() => { if (initialCategories && initialCategories.length) { setFilters(prev => ({ ...prev, categories: new Set(initialCategories) })); } }, [initialCategories]);

  useEffect(() => { onChange(filters); }, [filters, onChange]);

  const toggleCategory = (c: Product["category"]) => {
    setFilters(prev => {
      const next = new Set(prev.categories);
      if (next.has(c)) next.delete(c); else next.add(c);
      return { ...prev, categories: next };
    });
  };

  return (
    <aside className="p-4 rounded-xl border bg-card">
      <h3 className="font-medium mb-3">Фильтр</h3>

      <div className="mb-5">
        <div className="text-sm text-muted-foreground mb-2">Категории</div>
        <div className="space-y-2">
          {(["constructors","plush","boardgames","educational","outdoor"] as Product["category"][]).map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={`cat-${c}`} checked={filters.categories.has(c)} onCheckedChange={() => toggleCategory(c)} />
              <Label htmlFor={`cat-${c}`}>{
                c === "constructors" ? "Конструкторы" : c === "plush" ? "Мягкие игрушки" : c === "boardgames" ? "Настольные игры" : c === "educational" ? "Развивающие" : "Для улицы"
              }</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="text-sm text-muted-foreground mb-2">Возраст</div>
        <Select value={filters.age} onValueChange={(v: any) => setFilters(prev => ({ ...prev, age: v }))}>
          <SelectTrigger>
            <SelectValue placeholder="Возраст" />
          </SelectTrigger>
          <SelectContent>
            {AGE_OPTIONS.map(o => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-3">
        <div className="text-sm text-muted-foreground mb-2">Цена</div>
        <Slider defaultValue={priceRange} max={priceRange[1]} min={priceRange[0]} step={100} onValueChange={(v: any) => setFilters(prev => ({ ...prev, price: [v[0], v[1]] }))} />
        <div className="text-sm mt-1 text-muted-foreground">от {filters.price[0].toLocaleString('ru-RU')} ₽ до {filters.price[1].toLocaleString('ru-RU')} ₽</div>
      </div>
    </aside>
  );
};
