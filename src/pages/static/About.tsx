import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const About = () => (
  <div>
    <Helmet>
      <title>О нас — Мир Чудес</title>
      <meta name="description" content="Мир Чудес — интернет-магазин детских игрушек с пастельным дизайном и качественными товарами." />
      <link rel="canonical" href="/about" />
    </Helmet>
    <Header />
    <main className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="font-display text-3xl mb-4">О нас</h1>
      <p className="text-foreground/80 leading-relaxed">Мы верим, что игрушки должны вдохновлять, обучать и радовать. В нашем магазине вы найдёте безопасные и современные игрушки для детей разных возрастов.</p>
    </main>
    <Footer />
  </div>
);

export default About;
