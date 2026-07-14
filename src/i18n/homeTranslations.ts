export type Lang = "es" | "en" | "it";

const tr = {
  // Navbar
  navHome: { es: "Inicio", en: "Home", it: "Home" },
  navMenu: { es: "Colección", en: "Collection", it: "Collezione" },
  navContacts: { es: "Contacto", en: "Contact", it: "Contatti" },
  navGallery: { es: "Galería", en: "Gallery", it: "Galleria" },
  navAbout: { es: "Sobre mí", en: "About", it: "Chi sono" },
  navCommissions: { es: "Encargos", en: "Commissions", it: "Commissioni" },
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

  collectionFuocoTitle: { es: "Colección Fuego", en: "The Fire Collection", it: "Collezione Fuoco" },
  collectionFuocoDesc: {
    es: "Retratos y figuras envueltos en la luz ardiente del Sur. Ocre, rojo llama y oro capturan el calor de la presencia humana — la pasión de Andalucía pintada con pigmentos vivos.",
    en: "Portraits and figures bathed in the blazing light of the South. Ochre, flame and gold capture the warmth of human presence — the passion of Andalusia painted with vibrant pigments.",
    it: "Ritratti e figure avvolti nella luce ardente del Sud. Ocra, rosso fiamma e oro catturano il calore della presenza umana — la passione dell'Andalusia dipinta con pigmenti vivi.",
  },

  collectionTerraTitle: { es: "Colección Tierra", en: "The Earth Collection", it: "Collezione Terra" },
  collectionTerraDesc: {
    es: "Árboles, bosques y naturaleza mediterránea bañados en la luz del mediodía. El verde plateado de los olivos, el aliento del bosque, la orilla silenciosa — la tierra como paisaje del alma.",
    en: "Trees, forests and Mediterranean nature bathed in midday light. The silvery green of olive trees, the breath of the forest, the silent shore — earth as landscape of the soul.",
    it: "Alberi, boschi e natura mediterranea immersi nella luce del mezzogiorno. Il verde argentato degli ulivi, il respiro del bosco, la riva silenziosa — la terra come paesaggio dell'anima.",
  },
} as const;

export type TranslationKey = keyof typeof tr;

export function th(key: TranslationKey, lang: Lang): string {
  return tr[key][lang];
}

export default tr;
