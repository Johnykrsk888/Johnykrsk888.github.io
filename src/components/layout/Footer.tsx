import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-accent/30">
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg mb-3">Мир Чудес</h3>
          <p className="text-muted-foreground">Современные игрушки для вдохновения и развития детей.</p>
        </div>
        <nav>
          <h4 className="font-medium mb-2">Навигация</h4>
          <ul className="space-y-1">
            <li><Link className="story-link" to="/about">О нас</Link></li>
            <li><Link className="story-link" to="/shipping">Доставка и оплата</Link></li>
            <li><Link className="story-link" to="/contacts">Контакты</Link></li>
          </ul>
        </nav>
        <div>
          <h4 className="font-medium mb-2">Мы в соцсетях</h4>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Instagram" className="hover-scale"><Instagram /></a>
            <a href="#" aria-label="Facebook" className="hover-scale"><Facebook /></a>
            <a href="#" aria-label="YouTube" className="hover-scale"><Youtube /></a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Мир Чудес</div>
    </footer>
  );
};
