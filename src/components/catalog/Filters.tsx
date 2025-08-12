import { useMemo, useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Product } from "@/data/products";
import { categories as allCategories, Category } from "@/data/categories";
import { cn } from "@/lib/utils";

export type FiltersState = {
  categorySlug: string | null;
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
    if (products.length === 0) return [0, 10000];
    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [min, max];
  }, [products]);
};

const CategoryTree = ({ categories, onSelect, selectedSlug }: { categories: Category[], onSelect: (slug: string) => void, selectedSlug: string | null }) => {
  return (
    <Accordion type="multiple" className="w-full">
      {categories.map(category => (
        <AccordionItem key={category.id} value={category.id}>
          <AccordionTrigger className="hover:no-underline">
            <span 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(category.slug);
              }}
              className={cn(
                "w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-muted",
                { "bg-primary text-primary-foreground hover:bg-primary/90": selectedSlug === category.slug }
              )}
            >
              {category.title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pl-4">
            {category.selectionMode === 'radio' ? (
              <RadioGroup onValueChange={onSelect} value={selectedSlug ?? undefined}>
                {category.subcategories?.map(sub => (
                  <div key={sub.id} className="flex items-center space-x-2 py-1">
                    <RadioGroupItem value={sub.slug} id={sub.id} />
                    <Label htmlFor={sub.id} className="font-normal cursor-pointer">{sub.title}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : category.subcategories && category.subcategories.length > 0 ? (
              <CategoryTree 
                categories={category.subcategories} 
                onSelect={onSelect} 
                selectedSlug={selectedSlug}
              />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const Filters = ({
  products,
  filters,
  setFilters,
}: {
  products: Product[];
  filters: FiltersState;
  setFilters: (filters: FiltersState) => void;
}) => {
  const defaultPriceRange = useDefaultPriceRange(products);

  const handleCategorySelect = (slug: string) => {
    setFilters({
      ...filters,
      categorySlug: filters.categorySlug === slug ? null : slug,
    });
  };

  const handleAgeChange = (age: string) => {
    setFilters({ ...filters, age });
  };

  const handlePriceChange = (price: [number, number]) => {
    setFilters({ ...filters, price });
  };

  return (
    <aside className="p-4 rounded-xl border bg-card">
      <div className="mb-5">
        <CategoryTree categories={allCategories} onSelect={handleCategorySelect} selectedSlug={filters.categorySlug} />
      </div>
      <div className="mb-5">
        <div className="text-sm text-muted-foreground mb-2">Возраст</div>
        <Select value={filters.age} onValueChange={handleAgeChange}>
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
        <Slider value={filters.price} max={defaultPriceRange[1]} min={defaultPriceRange[0]} step={100} onValueChange={handlePriceChange} />
        <div className="text-sm mt-1 text-muted-foreground">от {filters.price[0].toLocaleString('ru-RU')} ₽ до {filters.price[1].toLocaleString('ru-RU')} ₽</div>
      </div>
    </aside>
  );
};