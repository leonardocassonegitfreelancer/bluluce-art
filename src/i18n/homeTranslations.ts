export type Lang = "es" | "en" | "it";

const tr = {
  // Navbar
  navHome: { es: "Inicio", en: "Home", it: "Home" },
  navMenu: { es: "Colección", en: "Collection", it: "Collezione" },
  navContacts: { es: "Contacto", en: "Contact", it: "Contatti" },
  navGallery: { es: "Galería", en: "Gallery", it: "Galleria" },
  navAbout: { es: "Sobre mí", en: "About", it: "Chi sono" },
  navExplore: { es: "Explorar", en: "Explore", it: "Esplora" },

  // Hero / shared description (used for SEO meta on the collection pages)
  heroDescDesktop: {
    es: "Pinturas originales y obras de arte inspiradas en la luz, el mar y los colores del Mediterráneo. Descubre la auténtica belleza con las creaciones exclusivas de BLULUCE ART.",
    en: "Original paintings and artworks inspired by the light, the sea, and the colors of the Mediterranean. Discover authentic beauty with exclusive BLULUCE ART creations.",
    it: "Dipinti e opere d'arte originali ispirati alla luce, al mare e ai colori del Mediterraneo. Scopri l'autentica bellezza con le creazioni esclusive di BLULUCE ART.",
  },

  // Art collections
  collectionTitle: { es: "Las Colecciones de Arte", en: "The Fine Art Collections", it: "Le Collezioni d'Arte" },
  collectionBackToAll: { es: "← Ver todo", en: "← View all", it: "← Vedi tutto" },

  collectionMareTitle: { es: "Colección Mar", en: "The Ocean Collection", it: "Collezione Mare" },
  collectionMareDesc: {
    es: "Pinceladas profundas y detalles en pan de oro capturan el movimiento continuo y la energía vibrante de las olas del Mediterráneo.",
    en: "Deep brushstrokes and gold leaf details capture the continuous movement and vibrant energy of the Mediterranean waves.",
    it: "Pennellate profonde e dettagli in foglia d'oro catturano il movimento continuo e l'energia vibrante delle onde del Mediterraneo.",
  },

  collectionTerraTitle: { es: "Colección Tierra", en: "The Clay Collection", it: "Collezione Terra" },
  collectionTerraDesc: {
    es: "Formas orgánicas minimalistas y matices de terracota que evocan la materia prima, las costas accidentadas y la arena quemada por el sol.",
    en: "Minimalist organic shapes and terracotta shades recalling raw matter, rugged coastlines, and sun-baked sand.",
    it: "Forme organiche minimaliste e sfumature di terracotta che richiamano la materia prima, le coste frastagliate e la sabbia arsa dal sole.",
  },

  collectionUlivoTitle: { es: "Colección Olivo", en: "The Olive Collection", it: "Collezione Ulivo" },
  collectionUlivoDesc: {
    es: "Contrastes cálidos entre el verde plateado de las hojas del olivo y la luz cenital del mediodía mediterráneo, plasmados en lienzo de lino crudo.",
    en: "Warm contrasts between the silvery green of olive leaves and the zenith light of the Mediterranean noon, printed on raw canvas.",
    it: "Contrasti caldi tra il verde argentato delle foglie di ulivo e la luce zenitale del mezzogiorno mediterraneo, impressi su tela di lino grezzo.",
  },
} as const;

export type TranslationKey = keyof typeof tr;

export function th(key: TranslationKey, lang: Lang): string {
  return tr[key][lang];
}

export default tr;
