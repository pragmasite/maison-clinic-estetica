import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface GalleryImage {
  src: string;
  descriptionIt: string;
  descriptionEn: string;
}

const Gallery = () => {
  const { t, lang } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images: GalleryImage[] = [
    { src: "/images/img-1.jpg", descriptionIt: "Terapia Avanzata", descriptionEn: "Advanced Therapy" },
    { src: "/images/img-2.jpg", descriptionIt: "Ringiovanimento Viso", descriptionEn: "Facial Rejuvenation" },
    { src: "/images/img-3.jpg", descriptionIt: "Silhouette Perfetta", descriptionEn: "Perfect Silhouette" },
    { src: "/images/img-4.jpg", descriptionIt: "Massaggio Terapeutico", descriptionEn: "Therapeutic Massage" },
    { src: "/images/img-5.jpg", descriptionIt: "Rituale Yantra", descriptionEn: "Yantra Ritual" },
    { src: "/images/img-6.jpg", descriptionIt: "Rituale Tibet", descriptionEn: "Tibet Ritual" },
    { src: "/images/img-7.jpg", descriptionIt: "Massaggio Aromaterapico", descriptionEn: "Aromatherapy Massage" },
    { src: "/images/img-8.jpg", descriptionIt: "Detox Purificante", descriptionEn: "Purifying Detox" },
  ];

  const getDescription = (image: GalleryImage) => {
    return lang === "it" ? image.descriptionIt : image.descriptionEn;
  };

  return (
    <section id="galleria" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">{t.gallery.label}</span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">{t.gallery.title}</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">{t.gallery.description}</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
            >
              <img
                src={image.src}
                alt={getDescription(image)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm font-medium text-white">{getDescription(image)}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={images[selectedIndex].src}
                alt={getDescription(images[selectedIndex])}
                className="w-full h-auto rounded-xl"
              />
              <p className="text-white text-center mt-4 text-lg">
                {getDescription(images[selectedIndex])}
              </p>
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 -right-12 text-white hover:text-accent transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              {/* Navigation arrows */}
              <button
                onClick={() =>
                  setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
