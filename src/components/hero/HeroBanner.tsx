import heroImage from "@/assets/hero/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroBanner = () => {
  return (
    <section className="relative rounded-2xl overflow-hidden shadow-md">
      <img
        src={heroImage}
        alt="Дети играют с игрушками — Мир Чудес"
        className="w-full h-[340px] md:h-[420px] object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsla(var(--brand-blue),0.45)] via-transparent to-[hsla(var(--brand-peach),0.4)]" />
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 md:px-10 max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl mb-3">Мир Чудес — игрушки, которые вдохновляют</h1>
          <p className="text-muted-foreground text-base md:text-lg mb-5">Пастельные цвета, качественные материалы и море радости для детей разных возрастов.</p>
          <Button asChild variant="hero" size="lg" className="hover-scale">
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
