export type Lang = "es" | "en" | "it";

const tr = {
  // Navbar
  navHome: { es: "Inicio", en: "Home", it: "Home" },
  navProducts: { es: "Tienda", en: "Shop", it: "Shop" },
  navMenu: { es: "Colección", en: "Collection", it: "Collezione" },
  navContacts: { es: "Contacto", en: "Contact", it: "Contatti" },
  navGallery:  { es: "Galería", en: "Gallery", it: "Galleria" },

  // Disclaimer banner
  disclaimerBanner: {
    es: "Sitio web disponible también en inglés e italiano — use el selector de idioma en la parte superior.",
    en: "Website also available in Spanish and Italian — use the language switcher above.",
    it: "Sito disponibile anche in spagnolo e inglese — usa il selettore lingua in alto.",
  },

  // Hero
  heroSubtitle: {
    es: "Pinturas y obras de arte inspiradas en el mar",
    en: "Mediterranean Paintings & Artworks",
    it: "Dipinti & Opere d'Arte Mediterranee",
  },
  heroDescMobile: {
    es: "Pinturas originales y obras de arte inspiradas en la luz, el mar y los colores del Mediterráneo. Descubre la auténtica belleza con BLULUCE ART.",
    en: "Original paintings and artworks inspired by the light, the sea, and the colors of the Mediterranean. Discover authentic beauty with BLULUCE ART.",
    it: "Dipinti e opere d'arte originali ispirati alla luce, al mare e ai colori del Mediterraneo. Scopri l'autentica bellezza con BLULUCE ART.",
  },
  heroDescDesktop: {
    es: "Pinturas originales y obras de arte inspiradas en la luz, el mar y los colores del Mediterráneo. Descubre la auténtica belleza con las creaciones exclusivas de BLULUCE ART.",
    en: "Original paintings and artworks inspired by the light, the sea, and the colors of the Mediterranean. Discover authentic beauty with exclusive BLULUCE ART creations.",
    it: "Dipinti e opere d'arte originali ispirati alla luce, al mare e ai colori del Mediterraneo. Scopri l'autentica bellezza con le creazioni esclusive di BLULUCE ART.",
  },
  heroBookTable: { es: "Reservar", en: "Book a Private Tour", it: "Prenota una Visita Privata" },
  heroFindUs: { es: "Encuéntranos", en: "Find the Studio", it: "Trovaci in Studio" },
  heroMenu: { es: "Colección", en: "Collection", it: "Collezione" },
  heroDiscover: { es: "Descubrir Obras", en: "Discover Our Artworks", it: "Scopri le Nostre Opere" },
  heroTagline: { es: "Un rincón de arte mediterráneo en el corazón de Vilna", en: "A corner of Mediterranean art in the heart of Vilnius", it: "Un angolo di arte mediterranea nel cuore di Vilnius" },

  // Products section
  productsLabel: { es:"Mūsų produktai", en: "Our Products", it: "I Nostri Prodotti" },
  productsTitle: { es:"Tradicija ir kokybė", en: "Tradition & Quality", it: "Tradizione & Qualità" },
  productsDesc: {
    es:"Galima valgyti čia arba pasiimti namo — mūsų lentynos visada pilnos autentiškų itališkų produktų.",
    en: "Available to eat here or take home — our shelves are always full of authentic Italian products.",
    it: "Disponibili da gustare qui o da portare a casa — i nostri scaffali sono sempre pieni di prodotti italiani autentici.",
  },
  productsViewAll: { es:"Peržiūrėti visus produktus →", en: "View all our products →", it: "Vedi tutti i prodotti →" },
  productsSalumi: {
    es:"Kruopščiai atrinkta geriausių vytintų mėsos gaminių ir amatininkų sūrių kolekcija",
    en: "A curated selection of finest cured meats and artisan cheeses",
    it: "Una selezione curata dei migliori salumi e formaggi artigianali",
  },
  productsWine: {
    es:"Kruopščiai atrinkti itališki vynai iš garsių vynuogynų",
    en: "Carefully selected Italian wines from renowned vineyards",
    it: "Vini italiani selezionati con cura da vigneti rinomati",
  },
  productsPasta: {
    es:"Kasdien rankomis gaminama šviežia pasta, pagal tradicijas",
    en: "Handmade fresh pasta crafted daily with tradition",
    it: "Pasta fresca fatta a mano ogni giorno con tradizione",
  },
  productsFocaccia: {
    es:"Šviežiai kepta focaccia, farkštuota aukščiausios kokybės itališkais ingredientais",
    en: "Freshly baked focaccia stuffed with premium Italian ingredients",
    it: "Focaccia appena sfornata farcita con ingredienti italiani di prima qualità",
  },
  productsDolci: {
    es:"Tradiciniai itališki desertai, pagaminti su meile ir aistra",
    en: "Traditional Italian desserts crafted with love and passion",
    it: "Dolci tradizionali italiani preparati con amore e passione",
  },
  productsVari: {
    es:"Saulėje prinokę konservai ir autentiški itališki virtuvės produktai",
    en: "Sun-ripened preserves and authentic Italian pantry staples",
    it: "Conserve maturate al sole e autentici prodotti della dispensa italiana",
  },
  // Narrative descriptions for asymmetric layout
  productsNarrativeSalumi: {
    es:"Mūsų paslaptis? Paprastumas ir neapsakoma meilė tradicijai. Kiekvienas sūris ir kiekvienas saliumo gabalėlis pasakoja istoriją apie Italijos regionus, amatininkų šeimas ir šimtmečių receptus.",
    en: "Our secret? Simplicity and an indescribable love for tradition. Every cheese and every slice of salumi tells a story of Italian regions, artisan families, and centuries-old recipes.",
    it: "Il nostro segreto? Semplicità e un amore indescrivibile per la tradizione. Ogni formaggio e ogni fetta di salume racconta una storia di regioni italiane, famiglie artigiane e ricette centenarie.",
  },
  productsNarrativePasta: {
    es:"Šviežia pasta ir focaccia — gaminama kiekvieną dieną, su meile ir kantrybe. Kiekvienas kąsnis nuneša jus į saulėtą Italijos virtuvę, kur laikas sustoja ir svarbu tik skonis.",
    en: "Fresh pasta and focaccia — made every day, with love and patience. Every bite takes you to a sun-drenched Italian kitchen, where time stops and only flavour matters.",
    it: "Pasta fresca e focaccia — fatte ogni giorno, con amore e pazienza. Ogni morso ti porta in una cucina italiana baciata dal sole, dove il tempo si ferma e conta solo il sapore.",
  },
  productsNarrativeVino: {
    es:"Kruopščiai atrinkti vynai iš garsių Italijos vynuogynų — nuo Toskanos iki Sicilijos.",
    en: "Carefully selected wines from renowned Italian vineyards — from Tuscany to Sicily.",
    it: "Vini selezionati con cura dai migliori vigneti italiani — dalla Toscana alla Sicilia.",
  },
  productsNarrativeDolci: {
    es:"Tradiciniai desertai ir saulėje prinokę konservai — tikros Italijos skoniai jūsų stalui.",
    en: "Traditional desserts and sun-ripened preserves — authentic Italian flavours for your table.",
    it: "Dolci tradizionali e conserve maturate al sole — autentici sapori italiani per la tua tavola.",
  },
  prodSectionLabel1: { es:"Visiems", en: "For Everyone", it: "Per Tutti" },
  prodSectionLabel2: { es:"Aistra maistui", en: "Passion for Food", it: "Passione per il Cibo" },

  // CuriousBanner
  curiousTitle: { es:"Kiekvienas patiekalas pasakoja istoriją. Ateik paragauti.", en: "Every dish tells a story. Come taste it.", it: "Ogni piatto racconta una storia. Vieni a provarla." },
  curiousSeeMenu: { es:"Meniu", en: "See Menu", it: "Vedi Menu" },
  curiousBookTable: { es:"Rezervuoti stalą", en: "Book a Table", it: "Prenota un Tavolo" },

  // About
  aboutLabel: { es:"L'ALIMENTARI", en: "L'ALIMENTARI", it: "L'ALIMENTARI" },
  aboutTitle1: { es:"Vilniaus", en: "In the heart of", it: "Nel cuore di" },
  aboutTitleHighlight1: { es:"senamiestyje,", en: "Vilnius,", it: "Vilnius," },
  aboutTitle2: { es:"italų virtuvė kur", en: "a kitchen where", it: "una cucina dove" },
  aboutTitleHighlight2: { es:"Italija atgyja.", en: "Italy comes alive.", it: "l'Italia prende vita." },
  aboutP1: {
    es:"LALIMENTARI — tai italų valdoma virtuvė Vilniaus senamiestyje.",
    en: "LALIMENTARI is an Italian-run kitchen in Vilnius Old Town.",
    it: "LALIMENTARI è una cucina gestita da italiani nella Città Vecchia di Vilnius.",
  },
  aboutP2: {
    es:"Viskas gaminama nuo nulio. Ingredientai tiesiai iš Italijos. Jokių kompromisų.",
    en: "Everything made from scratch. Ingredients straight from Italy. No shortcuts.",
    it: "Tutto fatto da zero. Ingredienti direttamente dall'Italia. Nessuna scorciatoia.",
  },
  aboutP3: {
    es:"Šviežia pasta, lėtai virinti padažai, sąžiningas maistas — ir lentyna itališkų produktų pasiimti namo.",
    en: "Fresh pasta, slow-cooked sauces, honest food — and a shelf of Italian products to take home.",
    it: "Pasta fresca, sughi a cottura lenta, cibo onesto — e uno scaffale di prodotti italiani da portare a casa.",
  },
  aboutQuote: {
    es:'„Italų restoranas Vilniaus senamiestis · namų gamybos pasta · autentiškas italų maistas."',
    en: '"Italian restaurant Vilnius Old Town · homemade pasta · authentic Italian food."',
    it: '"Ristorante italiano Città Vecchia di Vilnius · pasta fatta in casa · cibo italiano autentico."',
  },

  // Philosophy
  philosophyLabel: { es:"Mūsų filosofija", en: "Our Philosophy", it: "La Nostra Filosofia" },
  philosophyTitle: {
    es:"Lėtas, tikras maistas, kuris nuneša į tradicijų ir regionų kelionę",
    en: "Slow, real food that takes you on a journey through traditions and regions",
    it: "Cibo lento e vero che ti porta in un viaggio tra tradizioni e regioni",
  },
  philosophyDesc: {
    es:"Nuo brandintų mėsos gaminių iki Alpių sūrių, nuo konservų iki kepinių, nuo šviežios pastos iki vyno: aukštos kokybės amatininkų produktai, pagaminti senu būdu.",
    en: "From aged cured meats to alpine cheeses, from preserves to baked goods, from fresh pasta to wine: high-quality artisan products, made the old-fashioned way.",
    it: "Dai salumi stagionati ai formaggi alpini, dalle conserve ai prodotti da forno, dalla pasta fresca al vino: prodotti artigianali di alta qualità, fatti all'antica.",
  },
  philosophyTradition: { es:"Tradicija", en: "Tradition", it: "Tradizione" },
  philosophyTraditionDesc: { es:"Receptai, perduodami iš kartos į kartą", en: "Recipes passed down from generation to generation", it: "Ricette tramandate di generazione in generazione" },
  philosophyQuality: { es:"Kokybė", en: "Quality", it: "Qualità" },
  philosophyQualityDesc: { es:"Tik iš geriausių gamintojų atrinktos sudedamosios dalys", en: "Only ingredients selected from the finest producers", it: "Solo ingredienti selezionati dai migliori produttori" },
  philosophyPassion: { es:"Aistra", en: "Passion", it: "Passione" },
  philosophyPassionDesc: { es:"Meilė geram maistui vadovauja kiekvienam mūsų pasirinkimui", en: "A love for good food guides every choice we make", it: "L'amore per il buon cibo guida ogni nostra scelta" },

  // Gallery
  galleryLabel: { es:"Mūsų parduotuvė", en: "Our Shop", it: "Il Nostro Negozio" },
  galleryTitle: { es:"Italijos kampelis", en: "A Corner of Italy", it: "Un Angolo d'Italia" },
  galleryCharcuterie: { es:"Mėsos gaminiai ir sūriai", en: "Charcuterie & Cheese", it: "Salumi & Formaggi" },
  galleryPasta: { es:"Šviežia pasta", en: "Fresh Pasta", it: "Pasta Fresca" },
  galleryWine: { es:"Puikūs vynai", en: "Fine Wines", it: "Vini Pregiati" },
  galleryBread: { es:"Amatininkų duona", en: "Artisan Bread", it: "Pane Artigianale" },

  // Reviews
  reviewsLabel: { es:"Atsiliepimai", en: "Testimonials", it: "Testimonianze" },
  reviewsTitle: { es:"Ką sako mūsų svečiai", en: "What Our Guests Say", it: "Cosa Dicono i Nostri Ospiti" },
  review1Text: {
    es:"Vakaro akcentas buvo pastos patiekalai: ypač su trumais 🙌 ir pistacijų tiramisu.\nSensacinga.\nPersonalas buvo nuostabus ir labai dėmesingas.\nLabai rekomenduoju širdingam, sveikam ir skaniam itališkam maistui 💯",
    en: "The highlight of the night were the pasta dishes : especially the one with truffles 🙌 and the pistachio tiramisu.\nSensational.\nThe staff was lovely and very attentive.\nHighly recommend for hearty, wholesome, and delicious Italian food 💯",
    it: "Il momento clou della serata sono stati i piatti di pasta: soprattutto quello al tartufo 🙌 e il tiramisù al pistacchio.\nSensazionale.\nIl personale è stato adorabile e molto attento.\nConsigliatissimo per cibo italiano sostanzioso, genuino e delizioso 💯",
  },
  review2Text: {
    es:"Labai džiaugiuosi šia nauja vieta:\nbūtent tokios vietos miestui trūko.\nPuikūs vegetariški variantai, puikios kainos, nuostabi aptarnavimas ir šypsenos visur. Sėkmės!!! 🌸🎉",
    en: "So happy about this new opening:\nexactly the kind of place the city was missing.\nGreat vegetarian options, excellent prices, wonderful service and smiles all around. Good luck!!! 🌸🎉",
    it: "Felicissima per questa nuova apertura:\nesattamente il tipo di posto che mancava alla città.\nOttime opzioni vegetariane, prezzi eccellenti, servizio meraviglioso e sorrisi ovunque. In bocca al lupo!!! 🌸🎉",
  },
  review3Text: {
    es:"Tikrai skanus maistas ir malonus aptarnavimas — tikrai grįšime greitai!\n\n🍽️ Valgio tipas: Vakarienė | 💶 Kaina asmeniui: 15–20€ | 👥 Grupės dydis: 2–4 žmonės\n⭐ Maistas: 5/5 | ⭐ Aptarnavimas: 5/5 | ⭐ Atmosfera: 5/5",
    en: "Really good food and pleasant service — we will definitely come back soon!\n\n🍽️ Meal type: Dinner | 💶 Price per person: €15–20 | 👥 Group size: 2–4 people\n⭐ Food: 5/5 | ⭐ Service: 5/5 | ⭐ Atmosphere: 5/5",
    it: "Cibo davvero buono e servizio piacevole — torneremo sicuramente presto!\n\n🍽️ Tipo di pasto: Cena | 💶 Prezzo a persona: €15–20 | 👥 Dimensione gruppo: 2–4 persone\n⭐ Cibo: 5/5 | ⭐ Servizio: 5/5 | ⭐ Atmosfera: 5/5",
  },

  // FAQ
  faqLabel: { es:"Klausimai", en: "Questions", it: "Domande" },
  faqTitle: { es:"DUK", en: "FAQ", it: "FAQ" },
  faq1Q: {
    es:"Kur jūs randatės?",
    en: "Where are you located?",
    it: "Dove vi trovate?",
  },
  faq1A: {
    es:"Esame Gedimino pr. 37, Vilniaus senamiestyje. Lengvai pasiekiama pėsčiomis iš centro — ieškokite mūsų iškabos!",
    en: "We're at Gediminas Ave 37, in Vilnius Old Town. Easy to reach on foot from the centre — look for our sign!",
    it: "Siamo in Viale Gediminas 37, nel Centro Storico di Vilnius. Facile da raggiungere a piedi dal centro — cerca la nostra insegna!",
  },
  faq2Q: {
    es:"Ar reikia rezervuoti stalą?",
    en: "Do I need to book a table?",
    it: "Devo prenotare un tavolo?",
  },
  faq2A: {
    es:"Rezervacija rekomenduojama, ypač savaitgaliais. Paskambinkite mums +370 664 08338 arba tiesiog ateikite — padarysime viską, kad jus priimtume.",
    en: "Reservations are recommended, especially on weekends. Call us at +370 664 08338 or just walk in — we'll do our best to seat you.",
    it: "Le prenotazioni sono consigliate, soprattutto nei weekend. Chiamaci al +370 664 08338 o vieni direttamente — faremo del nostro meglio per accomodarti.",
  },
  faq3Q: {
    es:"Kokios jūsų darbo valandos?",
    en: "What are your opening hours?",
    it: "Quali sono i vostri orari?",
  },
  faq3A: {
    es:"Pirmadienis–Ketvirtadienis 10:00–21:00, Penktadienis–Šeštadienis 10:00–22:00, Sekmadienis 11:00–21:00.",
    en: "Monday–Thursday 10:00–21:00, Friday–Saturday 10:00–22:00, Sunday 11:00–21:00.",
    it: "Lunedì–Giovedì 10:00–21:00, Venerdì–Sabato 10:00–22:00, Domenica 11:00–21:00.",
  },
  faq4Q: {
    es:"Galima tik valgyti čia ar galiu nusipirkti ir pasiimti namo?",
    en: "Can I only eat here or can I also buy products to take home?",
    it: "Si mangia solo qui o posso anche comprare per portare a casa?",
  },
  faq4A: {
    es:"Abu variantai! Mes esame ir restoranas, ir delikatesų parduotuvė. Galite valgyti čia arba rinktis iš mūsų sūrių, saliumų, pastos, vynų ir kitų produktų parsineštinai.",
    en: "Both! We're a restaurant and a deli. You can eat here or browse our selection of cheeses, salumi, pasta, wines and artisan products to take home.",
    it: "Entrambe le cose! Siamo ristorante e gastronomia. Puoi mangiare qui oppure scegliere tra formaggi, salumi, pasta, vini e prodotti artigianali da portare a casa.",
  },

  // Contact
  contactLabel: { es:"Aplankykite mus", en: "Visit Us", it: "Visitaci" },
  contactTitle: { es:"Raskite mus Vilniuje", en: "Find Us in Vilnius", it: "Trovaci a Vilnius" },
  contactAddress: { es:"Adresas", en: "Address", it: "Indirizzo" },
  contactPhone: { es:"Telefonas", en: "Phone", it: "Telefono" },
  contactHours: { es:"Darbo valandos", en: "Opening Hours", it: "Orari di Apertura" },

  // Footer
  footerTagline: { es:"Itališka gastronomija", en: "Italian Gastronomy", it: "Gastronomia Italiana" },
  footerDesc: {
    es:"Autentiški skoniai ir gyvos tradicijos miesto širdyje.",
    en: "Authentic flavours and living traditions in the heart of the city.",
    it: "Sapori autentici e tradizioni vive nel cuore della città.",
  },
  footerHours: { es:"Valandos", en: "Hours", it: "Orari" },
  footerContact: { es:"Kontaktai", en: "Contact", it: "Contatti" },
  footerRights: { es:"Visos teisės saugomos.", en: "All rights reserved.", it: "Tutti i diritti riservati." },

  // VisitBanner
  visitTitle: {
    es:"Ateikite pas mus — nekantraujame jus priimti.",
    en: "Come visit us — we can't wait to welcome you.",
    it: "Venite a trovarci — non vediamo l'ora di accogliervi.",
  },
  visitCall: { es:"Skambinkite dabar", en: "Call Us Now", it: "Chiamaci Ora" },
  visitFind: { es:"Raskite mus", en: "Find Us", it: "Trovaci" },

  // FoodIsArt
  foodArtText: {
    es:"Kažkas patraukė dėmesį?\nAteikite pas mus\nAtvežame geriausią maisto pasirinkimą iš kiekvieno Italijos kampelio.\nNes mums maistas yra menas.",
    en: "Something caught your eye?\nCome visit us\nWe bring the finest selection of food from every corner of Italy.\nBecause for us, food is art.",
    it: "Qualcosa ha attirato la tua attenzione?\nVieni a trovarci\nPortiamo la migliore selezione di cibo da ogni angolo d'Italia.\nPerché per noi, il cibo è arte.",
  },
  foodArtButton: { es:"Raskite mus", en: "Find us", it: "Trovaci" },

  // Products page
  productsPageTitle: { es:"Mūsų produktai", en: "Our Products", it: "I Nostri Prodotti" },
  productsPageDesc: {
    es:"Viską, ką matote, galite pasiimti namo.",
    en: "Everything you see, you can take home.",
    it: "Tutto quello che vedi, puoi portarlo a casa.",
  },
  productsPageCta: {
    es:"Nerandate ko ieškote? Aplankykite mus.",
    en: "Can't find what you're looking for? Come visit us.",
    it: "Non trovi quello che cerchi? Vieni a trovarci.",
  },
  productsPageCtaButton: { es:"Raskite mus", en: "Find Us", it: "Trovaci" },
  productsNameSalumi: { es:"Prosciutti ir sūriai", en: "Prosciutti & Formaggi", it: "Prosciutti & Formaggi" },
  productsNameWine: { es:"Vynas", en: "Wine", it: "Vino" },
  productsNamePasta: { es:"Šviežia pasta", en: "Fresh Pasta", it: "Pasta Fresca" },
  productsNameFocaccia: { es:"Focaccia", en: "Focaccia", it: "Focaccia" },
  productsNameDolci: { es:"Desertai", en: "Dolci", it: "Dolci" },
  productsNameVari: { es:"Įvairūs produktai", en: "Various Goods", it: "Prodotti Vari" },

  // Product Categories section
  prodCatLabel: { es:"Mūsų produktai", en: "Our Products", it: "I Nostri Prodotti" },
  prodCatTitle: { es:"Iš Italijos su meile", en: "From Italy with love", it: "Dall'Italia con amore" },

  // Product Categories – per-category translations
  prodCatProsciuttiLabel: { it: "SALUMERIA ITALIANA", en: "ITALIAN CHARCUTERIE", es:"ITALIŠKA MĖSINĖ" },
  prodCatProsciuttiName: { it: "PROSCIUTTO · SAN DANIELE", en: "PROSCIUTTO · SAN DANIELE", es:"PROSCIUTTO · SAN DANIELE" },
  prodCatProsciuttiDesc: { it: "Stagionato tra le colline del Friuli, il San Daniele porta con sé la dolcezza dell'aria alpina. Un equilibrio raro tra sapidità e morbidezza, tagliato a mano per ogni cliente.", en: "Aged among the hills of Friuli, San Daniele carries the sweetness of alpine air. A rare balance of savouriness and tenderness, hand-sliced for every customer.", es:"Brandintas tarp Friulio kalvų, San Daniele neša Alpių oro švelnumą. Retas sūrumo ir minkštumo balansas, kiekvienam klientui pjaustomas rankomis." },

  prodCatFormaggiLabel: { it: "FORMAGGI D'AUTORE", en: "ARTISAN CHEESES", es:"AUTORIŠKI SŪRIAI" },
  prodCatFormaggiName: { it: "PARMIGIANO · REGGIANO 36 MESI", en: "PARMIGIANO · REGGIANO 36 MONTHS", es:"PARMIGIANO · REGGIANO 36 MĖN." },
  prodCatFormaggiDesc: { it: "Dalla pianura emiliana, oltre tre anni di lenta stagionatura. Cristalli di tirosina e un gusto profondo che racconta la pazienza artigiana di chi lo produce.", en: "From the Emilian plains, over three years of slow ageing. Tyrosine crystals and a deep flavour that speaks of the artisan patience behind it.", es:"Iš Emilijos lygumų, daugiau nei treji metai lėto brandinimo. Tirozino kristalai ir gilus skonis, bylojantis apie amatininkų kantrybę." },

  prodCatPastaLabel: { it: "PASTA ARTIGIANALE", en: "ARTISAN PASTA", es:"RANKŲ DARBO PASTA" },
  prodCatPastaName: { it: "TAGLIATELLE · ALL'UOVO", en: "TAGLIATELLE · EGG PASTA", es:"TAGLIATELLE · SU KIAUŠINIAIS" },
  prodCatPastaDesc: { it: "Impastate a mano con uova di campagna e semola di grano duro. La ruvidità della sfoglia cattura ogni goccia di ragù, come vuole la tradizione bolognese.", en: "Hand-kneaded with free-range eggs and durum wheat semolina. The rough texture of the dough captures every drop of ragù, as Bolognese tradition demands.", es:"Minkytas rankomis su laisvai laikomų vištų kiaušiniais ir kietųjų kviečių kruopomis. Šiurkšti tešla sugeria kiekvieną ragù lašą, kaip reikalauja Bolonijos tradicija." },

  prodCatFocacciaLabel: { it: "PANIFICAZIONE", en: "BAKERY", es:"KEPINIAI" },
  prodCatFocacciaName: { it: "FOCACCIA · GENOVESE", en: "FOCACCIA · GENOVESE", es:"FOCACCIA · GENOVESE" },
  prodCatFocacciaDesc: { it: "Olio extravergine ligure, sale grosso e una lievitazione lenta di 24 ore. Croccante fuori, soffice dentro — il profumo dei caruggi di Genova.", en: "Ligurian extra-virgin olive oil, coarse salt, and a slow 24-hour rise. Crispy outside, soft inside — the aroma of Genoa's narrow streets.", es:"Ligūrijos ypač tyras alyvuogių aliejus, stambi druska ir lėtas 24 val. kilimas. Traškus išorėje, minkštas viduje — Genujos gatvelių aromatas." },

  prodCatViniLabel: { it: "ENOTECA SELEZIONATA", en: "CURATED WINE CELLAR", es:"RINKTINIŲ VYNŲ KOLEKCIJA" },
  prodCatViniName: { it: "BAROLO · DOCG PIEMONTE", en: "BAROLO · DOCG PIEDMONT", es:"BAROLO · DOCG PJEMONTAS" },
  prodCatViniDesc: { it: "Il re dei vini italiani. Nebbiolo in purezza dalle Langhe, invecchiato in botti di rovere. Note di rosa appassita, cuoio e terra bagnata dopo la pioggia.", en: "The king of Italian wines. Pure Nebbiolo from the Langhe, aged in oak barrels. Notes of dried rose, leather, and rain-soaked earth.", es:"Itališkų vynų karalius. Grynas Nebbiolo iš Langhe, brandintas ąžuolo statinėse. Džiovintų rožių, odos ir lietaus permerktos žemės natos." },

  prodCatConserveLabel: { it: "CONSERVE & SOTTOLI", en: "PRESERVES & PICKLES", es:"KONSERVAI IR MARINUOTI" },
  prodCatConserveName: { it: "POMODORI · SAN MARZANO DOP", en: "TOMATOES · SAN MARZANO PDO", es:"POMIDORAI · SAN MARZANO SGN" },
  prodCatConserveDesc: { it: "Raccolti a mano alle pendici del Vesuvio, pelati e conservati nel loro succo. La base di ogni sugo che si rispetti, dal sapore dolce e intenso.", en: "Hand-picked on the slopes of Vesuvius, peeled and preserved in their own juice. The base of every worthy sauce, with a sweet and intense flavour.", es:"Rankomis skinti Vezuvijaus papėdėje, nulupti ir konservuoti savo sultyse. Kiekvieno tikro padažo pagrindas, saldaus ir intensyvaus skonio." },

  // Product Cards – 2 per category
  prodCard_prosciutti_1_name: { it: "Prosciutto Negroni", en: "Prosciutto Negroni", es:"Prosciutto Negroni" },
  prodCard_prosciutti_1_desc: { it: "Stagionato 18 mesi con metodo tradizionale toscano. Sapore deciso e persistente.", en: "18-month aged with traditional Tuscan method. Bold and lingering flavour.", es:"18 mėn. brandintas tradiciniu Toskanos metodu. Ryškus ir ilgai jaučiamas skonis." },
  prodCard_prosciutti_2_name: { it: "Prosciutto di Parma", en: "Prosciutto di Parma", es:"Prosciutto di Parma" },
  prodCard_prosciutti_2_desc: { it: "Il re dei prosciutti italiani, dolce e delicato. DOP dalle colline parmensi.", en: "The king of Italian prosciutto, sweet and delicate. PDO from the hills of Parma.", es:"Itališko prosciutto karalius, švelnus ir subtilus. SGN iš Parmos kalvų." },

  prodCard_formaggi_1_name: { it: "Parmigiano Reggiano 24 Mesi", en: "Parmigiano Reggiano 24 Months", es:"Parmigiano Reggiano 24 mėn." },
  prodCard_formaggi_1_desc: { it: "Granuloso e ricco, stagionato due anni nella pianura emiliana. Perfetto da gustare a scaglie.", en: "Grainy and rich, aged two years in the Emilian plains. Perfect enjoyed in shavings.", es:"Grūdėtas ir turtingas, dvejus metus brandintas Emilijos lygumose. Puikus drožlėmis." },
  prodCard_formaggi_2_name: { it: "Burrata di Puglia", en: "Burrata di Puglia", es:"Burrata di Puglia" },
  prodCard_formaggi_2_desc: { it: "Cuore cremoso di stracciatella avvolto in morbida mozzarella fresca. Arriva fresca dalla Puglia.", en: "Creamy stracciatella heart wrapped in soft fresh mozzarella. Arrives fresh from Puglia.", es:"Kreminis stracciatella širdis, apvyniota šviežia mozzarella. Atvežama šviežia iš Puglijos." },

  prodCard_pasta_1_name: { it: "Paccheri di Gragnano", en: "Paccheri di Gragnano", es:"Paccheri di Gragnano" },
  prodCard_pasta_1_desc: { it: "Pasta trafilata al bronzo dal cuore di Napoli. Perfetta per trattenere sughi ricchi e corposi.", en: "Bronze-drawn pasta from the heart of Naples. Perfect for holding rich, hearty sauces.", es:"Bronzine forma lieta pasta iš Neapolio širdies. Puikiai laiko sočius padažus." },
  prodCard_pasta_2_name: { it: "Orecchiette del Salento", en: "Orecchiette del Salento", es:"Orecchiette del Salento" },
  prodCard_pasta_2_desc: { it: "Piccole orecchie di semola lavorate a mano. La tradizione pugliese in ogni boccone.", en: "Small hand-shaped semolina ears. Pugliese tradition in every bite.", es:"Mažos rankomis formuotos kruopų ausytės. Puglijos tradicija kiekviename kąsnyje." },

  prodCard_focaccia_1_name: { it: "Focaccia al Rosmarino", en: "Rosemary Focaccia", es:"Focaccia su rozmarinu" },
  prodCard_focaccia_1_desc: { it: "Lievitazione lenta, olio EVO e rosmarino fresco. Croccante fuori, soffice dentro.", en: "Slow rise, EVO oil and fresh rosemary. Crispy outside, soft inside.", es:"Lėtas kilimas, EVO aliejus ir šviežias rozmarinas. Traškus išorėje, minkštas viduje." },
  prodCard_focaccia_2_name: { it: "Focaccia alle Olive Taggiasche", en: "Taggiasca Olive Focaccia", es:"Focaccia su Taggiasca alyvuogėmis" },
  prodCard_focaccia_2_desc: { it: "Arricchita con olive taggiasche liguri, sapore intenso e avvolgente.", en: "Enriched with Ligurian Taggiasca olives, intense and enveloping flavour.", es:"Praturtinta Ligūrijos Taggiasca alyvuogėmis, intensyvus ir apgaubiantis skonis." },

  prodCard_vini_1_name: { it: "Chianti Classico Riserva", en: "Chianti Classico Riserva", es:"Chianti Classico Riserva" },
  prodCard_vini_1_desc: { it: "Sangiovese in purezza dal cuore della Toscana. Note di ciliegia, spezie e tabacco.", en: "Pure Sangiovese from the heart of Tuscany. Notes of cherry, spices and tobacco.", es:"Grynas Sangiovese iš Toskanos širdies. Vyšnių, prieskonių ir tabako natos." },
  prodCard_vini_2_name: { it: "Nero d'Avola Sicilia", en: "Nero d'Avola Sicily", es:"Nero d'Avola Sicilija" },
  prodCard_vini_2_desc: { it: "Rosso siciliano corposo e fruttato. Profumo di more e prugne mature al sole.", en: "Full-bodied and fruity Sicilian red. Aroma of blackberries and sun-ripened plums.", es:"Sotus ir vaisingas sicilietiškas raudonasis. Gervuogių ir saulėje prinokusių slyvų aromatas." },

  prodCard_conserve_1_name: { it: "Pomodori San Marzano DOP", en: "San Marzano DOP Tomatoes", es:"San Marzano SGN pomidorai" },
  prodCard_conserve_1_desc: { it: "Pelati a mano, conservati nel loro succo. La base perfetta per ogni sugo italiano.", en: "Hand-peeled, preserved in their own juice. The perfect base for every Italian sauce.", es:"Nulupti rankomis, konservuoti savo sultyse. Puikus pagrindas kiekvienam itališkam padažui." },
  prodCard_conserve_2_name: { it: "Pesto Genovese Artigianale", en: "Artisan Genovese Pesto", es:"Amatininkiškas Genovos Pesto" },
  prodCard_conserve_2_desc: { it: "Basilico fresco, pinoli tostati, Parmigiano e olio EVO ligure. Fatto come una volta.", en: "Fresh basil, toasted pine nuts, Parmigiano and Ligurian EVO oil. Made the old way.", es:"Šviežias bazilikas, skrudinti pinijos riešutai, Parmigiano ir Ligūrijos EVO aliejus. Gaminama senoviškai." },

  prodCardAlso: { it: "Scopri anche", en: "Also discover", es: "Descubre también" },


  insideLabel: { it: "Esperienza", en: "Experience", es: "Experiencia" },
  insideTitle: { it: "Dai un'Occhiata", en: "Have a Look Inside", es: "Echa un Vistazo" },

  // Hours
  hoursMF: { es: "Lunes – Jueves: 10:00 – 21:00", en: "Monday – Thursday: 10:00 – 21:00", it: "Lunedì – Giovedì: 10:00 – 21:00" },
  hoursFri: { es: "Viernes: 10:00 – 22:00", en: "Friday: 10:00 – 22:00", it: "Venerdì: 10:00 – 22:00" },
  hoursSat: { es: "Sábado: 10:00 – 22:00", en: "Saturday: 10:00 – 22:00", it: "Sabato: 10:00 – 22:00" },
  hoursSun: { es: "Domingo: 11:00 – 21:00", en: "Sunday: 11:00 – 21:00", it: "Domenica: 11:00 – 21:00" },

  // New translations for stats and consistency
  aboutFounded: { es: "Fundado", en: "Founded", it: "Fondato" },
  aboutItalian: { es: "Mediterráneo", en: "Mediterranean", it: "Mediterraneo" },
  sectionPasta: { es: "ARTE", en: "ART", it: "ARTE" },

  // Art collections translations
  collectionMareTitle: { es: "Colección Mar", en: "The Ocean Collection", it: "Collezione Mare" },
  collectionMareDesc: {
    es: "Pinceladas profundas y detalles en pan de oro capturan el movimiento continuo y la energía vibrante de las olas del Mediterráneo.",
    en: "Deep brushstrokes and gold leaf details capture the continuous movement and vibrant energy of the Mediterranean waves.",
    it: "Pennellate profonde e dettagli in foglia d'oro catturano il movimento continuo e l'energia vibrante delle onde del Mediterraneo."
  },
  collectionTerraTitle: { es: "Colección Tierra", en: "The Clay Collection", it: "Collezione Terra" },
  collectionTerraDesc: {
    es: "Formas orgánicas minimalistas y matices de terracota que evocan la materia prima, las costas accidentadas y la arena quemada por el sol.",
    en: "Minimalist organic shapes and terracotta shades recalling raw matter, rugged coastlines, and sun-baked sand.",
    it: "Forme organiche minimaliste e sfumature di terracotta che richiamano la materia prima, le coste frastagliate e la sabbia arsa dal sole."
  },
  collectionUlivoTitle: { es: "Colección Olivo", en: "The Olive Collection", it: "Collezione Ulivo" },
  collectionUlivoDesc: {
    es: "Contrastes cálidos entre el verde plateado de las hojas del olivo y la luz cenital del mediodía mediterráneo, plasmados en lienzo de lino crudo.",
    en: "Warm contrasts between the silvery green of olive leaves and the zenith light of the Mediterranean noon, printed on raw canvas.",
    it: "Contrasti caldi tra il verde argentato delle foglie di ulivo e la luce zenitale del mezzogiorno mediterraneo, impressi su tela di lino grezzo."
  },
  collectionLabel: { es: "Nuestras Obras", en: "Our Works", it: "Le Nostre Opere" },
  collectionTitle: { es: "Las Colecciones de Arte", en: "The Fine Art Collections", it: "Le Collezioni d'Arte" },
  collectionTagMare: { es: "Océano y Oro", en: "Ocean & Gold", it: "Oceano & Oro" },
  collectionTagTerra: { es: "Arcilla y Siena", en: "Clay & Sienna", it: "Argilla & Siena" },
  collectionTagUlivo: { es: "Olivo y Arena", en: "Olive & Sand", it: "Ulivo & Sabbia" },
  collectionAlsoDiscover: { es: "Descubre también", en: "Also discover", it: "Scopri anche" },
  collectionBackToAll: { es: "← Ver todo", en: "← View all", it: "← Vedi tutto" },
} as const;

export type TranslationKey = keyof typeof tr;

export function th(key: TranslationKey, lang: Lang): string {
  return tr[key][lang];
}

export default tr;
