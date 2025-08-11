import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Shipping = () => (
  <div>
    <Helmet>
      <title>Доставка и оплата — Мир Чудес</title>
      <meta name="description" content="Условия доставки и оплаты в магазине Мир Чудес." />
      <link rel="canonical" href="/shipping" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="font-display text-3xl mb-4">Доставка и оплата</h1>
      <p className="text-foreground/80">Мы доставляем заказы по всей России. Оплата картой онлайн. Подробности уточняйте у оператора.</p>
    </main>
    <Footer />
  </div>
);

export default Shipping;
