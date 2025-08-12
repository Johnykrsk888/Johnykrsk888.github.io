import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/data/products";

export const ProductCarousel = ({ items }: { items: Product[] }) => {
  return (
    <div className="relative">
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {items.map((p) => (
            <CarouselItem key={p.id} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <ProductCard product={p} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
