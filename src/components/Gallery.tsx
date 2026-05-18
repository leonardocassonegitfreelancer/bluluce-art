import food1 from "@/assets/food-1.webp";
import food2 from "@/assets/food-2.webp";
import food3 from "@/assets/food-3.webp";
import food4 from "@/assets/food-4.webp";

const images = [
  { src: food1, alt: "Cured meats and cheeses", label: "Charcuterie & Cheese" },
  { src: food2, alt: "Fresh pasta", label: "Fresh Pasta" },
  { src: food3, alt: "Selected wines", label: "Fine Wines" },
  { src: food4, alt: "Artisan bread", label: "Artisan Bread" },
];

const Gallery = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Our Shop
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            A Corner of Italy
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group overflow-hidden">
              <div className="relative aspect-square overflow-hidden cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <p className="font-body text-sm text-muted-foreground mt-3 text-center">
                {img.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
