const Philosophy = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
          Our Philosophy
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-8 leading-tight">
          Slow, real food that takes you on a journey through traditions and regions
        </h2>
        <div className="w-16 h-px bg-gold mx-auto mb-8" />
        <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
          From aged cured meats to alpine cheeses, from preserves to baked goods, 
          from fresh pasta to wine: high-quality artisan products, made the old-fashioned way.
        </p>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { title: "Tradition", desc: "Recipes passed down from generation to generation" },
            { title: "Quality", desc: "Only ingredients selected from the finest producers" },
            { title: "Passion", desc: "A love for good food guides every choice we make" },
          ].map((item, i) => (
            <div key={i} className="p-8 border border-border hover:border-primary transition-colors duration-300">
              <h3 className="font-display text-2xl text-foreground mb-3">{item.title}</h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
