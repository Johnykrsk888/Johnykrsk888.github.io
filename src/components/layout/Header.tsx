import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, FormEvent } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { items, count, total, setQuantity, remove, clear } = useCart();
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  };
  return (
    <header className="w-full sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 hover-scale" aria-label="Мир Чудес — на главную">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--brand-mint))] to-[hsl(var(--brand-peach))]" />
          <span className="font-display text-xl">Мир Чудес</span>
        </Link>

        <nav className="ml-6 hidden md:flex items-center gap-4">
          <NavLink to="/" end className={({isActive}) => isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"}>Главная</NavLink>
          <NavLink to="/catalog" className={({isActive}) => isActive ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"}>Каталог</NavLink>
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-3">
          <form className="relative w-64" onSubmit={onSearch} role="search" aria-label="Поиск по каталогу">
            <Input placeholder="Поиск игрушек" aria-label="Поиск" className="bg-muted/60" value={term} onChange={(e) => setTerm(e.target.value)} name="q" />
          </form>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="accent" className="relative">
                <ShoppingCart />
                <span className="hidden sm:inline">Корзина</span>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                    {count}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-[420px] flex-col gap-4">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>

              {items.length === 0 ? (
                <p className="text-muted-foreground">Ваша корзина пуста</p>
              ) : (
                <div className="flex-1 space-y-4 overflow-auto">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3 rounded-lg border p-3">
                      <img src={it.image} alt={`Товар ${it.name}`} className="h-16 w-16 shrink-0 rounded object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium line-clamp-2">{it.name}</h3>
                          <button aria-label="Удалить" onClick={() => remove(it.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border">
                            <button aria-label="Уменьшить" className="p-2" onClick={() => setQuantity(it.id, it.qty - 1)}>
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-8 text-center text-sm">{it.qty}</span>
                            <button aria-label="Увеличить" className="p-2" onClick={() => setQuantity(it.id, it.qty + 1)}>
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="font-semibold">{(it.price * it.qty).toLocaleString('ru-RU')} ₽</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <SheetFooter className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Итого</span>
                  <span className="text-lg font-semibold">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={clear} className="flex-1">Очистить</Button>
                  <Button className="flex-1" onClick={() => toast.info("Оформление заказа скоро будет!")}>Оформить</Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
