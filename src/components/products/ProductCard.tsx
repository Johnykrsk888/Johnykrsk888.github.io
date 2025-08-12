import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export const ProductCard = ({ product }: { product: Product }) => {
  const { add } = useCart();
  return (
    <Card className="overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-muted/40 overflow-hidden">
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      </Link>
      <CardContent className="pt-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        </Link>
        <div className="mt-2 text-sm">
          {product.quantity > 0 ? (
            <p className="text-green-600">В наличии: {product.quantity} шт.</p>
          ) : (
            <p className="text-red-600">Нет в наличии</p>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-semibold">{product.price.toLocaleString('ru-RU')} ₽</div>
          <Button variant="accent" onClick={() => { add(product); toast.success("Добавлено в корзину"); }}>Добавить</Button>
        </div>
      </CardContent>
    </Card>
  );
};
