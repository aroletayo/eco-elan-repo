const ecoProducts = "/assets/eco-products.webp";

export function EcoProductsBanner() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={ecoProducts}
            alt="Eco-friendly cleaning products"
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
            <div className="p-8 md:p-12 max-w-lg">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Plant-Based, Planet-Friendly
              </h3>
              <p className="text-white/90">
                Every product we use is biodegradable, non-toxic, and safe for
                your family and pets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}