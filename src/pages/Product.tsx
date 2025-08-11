import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const Product = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { add } = useCart();
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Товар не найден. <Link to="/catalog" className="story-link">Вернуться в каталог</Link></p>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image],
    description: product.shortDescription,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RUB',
      price: product.price,
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <div>
      <Helmet>
        <title>{product.name} — Мир Чудес</title>
        <meta name="description" content={product.shortDescription} />
        <link rel="canonical" href={`/product/${product.id}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-2xl overflow-hidden border bg-muted/30">
              <img src={product.image} alt={product.name} className="w-full h-auto" loading="eager" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <img src={product.image} alt={product.name} className="w-full h-auto" />
          </DialogContent>
        </Dialog>

        <section>
          <h1 className="font-display text-3xl mb-2">{product.name}</h1>
          <div className="text-lg text-muted-foreground mb-4">Возраст: {product.ageMin}–{product.ageMax}</div>
          <div className="text-3xl font-semibold mb-4">{product.price.toLocaleString('ru-RU')} ₽</div>
          <p className="mb-6 text-foreground/80">{product.shortDescription}</p>
          <div className="flex items-center gap-3">
            <Button variant="accent" size="lg" onClick={() => { add(product); toast.success("Добавлено в корзину"); }}>Добавить в корзину</Button>
            <Button asChild variant="outline"><Link to="/catalog">Вернуться в каталог</Link></Button>
          </div>
          <hr className="my-8" />
          <h2 className="font-display text-2xl mb-2">Описание</h2>
          <p className="text-foreground/80 leading-relaxed">{product.description}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Product;
