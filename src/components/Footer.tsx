import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t, otherLangPath } = useLanguage();

  const links = [
    { href: "#chi-siamo", label: t.nav.about },
    { href: "#servizi", label: t.nav.services },
    { href: "#galleria", label: t.nav.gallery },
    { href: "#orari", label: t.nav.hours },
    { href: "#contatti", label: t.nav.contact },
  ];

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-2">Maison Clinic</h3>
            <p className="text-sm text-background/80">{t.footer.description}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-background/80 hover:text-accent transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-serif text-lg mb-4">Lingue</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-background/80 hover:text-accent transition-colors">
                  Italiano
                </a>
              </li>
              <li>
                <Link to="/en" className="text-sm text-background/80 hover:text-accent transition-colors">
                  English
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/70">
            © {new Date().getFullYear()} Maison Clinic Estetica Sartoriale. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
