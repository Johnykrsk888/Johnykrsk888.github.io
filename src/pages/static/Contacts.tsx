import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Contacts = () => (
  <div>
    <Helmet>
      <title>Контакты — Мир Чудес</title>
      <meta name="description" content="Свяжитесь с магазином Мир Чудес: электронная почта и социальные сети." />
      <link rel="canonical" href="/contacts" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="font-display text-3xl mb-4">Контакты</h1>
      <p className="text-foreground/80">Пишите нам: hello@mir-chudes.toys</p>
    </main>
    <Footer />
  </div>
);

export default Contacts;
