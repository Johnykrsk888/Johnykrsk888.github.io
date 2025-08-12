import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { products } from "@/data/products";

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Мир Чудес',
  url: '/',
  logo: '/favicon.ico'
};

const Index = () => {
  const popular = products.filter(p => p.isPopular).concat(products.slice(0, 10)).slice(0, 10);
  const newest = products.filter(p => p.isNew).concat(products.slice(-10)).slice(0, 10);

  return (
    <div>
      <Helmet>
        <title>Мир Чудес — интернет-магазин детских игрушек</title>
        <meta name="description" content="Конструкторы, мягкие игрушки, настольные и развивающие игры. Пастельный дизайн, быстрая доставка." />
        <link rel="canonical" href="/" />
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Helmet>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroBanner />
        <CategoryGrid />

        <section className="mt-12">
          <h2 className="font-display text-2xl mb-4">Популярные товары</h2>
          <ProductCarousel items={popular} />
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl mb-4">Новинки</h2>
          <ProductCarousel items={newest} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
