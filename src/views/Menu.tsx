import { useState, useEffect, useRef } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    }
  }
}
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { X } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/menuTranslations";
import { t } from "@/i18n/menuTranslations";
import lasagnaImg from "@/assets/lasagna.webp?url";
import pomodoroImg from "@/assets/pomodoro-pasta.webp?url";
import pestoImg from "@/assets/pesto-pasta.webp?url";
import pasticciataImg from "@/assets/pasticciata-pasta.webp?url";
import formaggiImg from "@/assets/formaggi-pasta.webp?url";
import carbonaraImg from "@/assets/carbonara-pasta.webp?url";
import amatricianaImg from "@/assets/amatriciana-pasta.webp?url";
import tartufataImg from "@/assets/tartufata-pasta.webp?url";
import gnocchiImg from "@/assets/gnocchi-sorrentina.webp?url";
import ravioliImg from "@/assets/ravioli-ricotta.webp?url";
import ravioliPorciniImg from "@/assets/ravioli-porcini.webp?url";
import cannelloniImg from "@/assets/cannelloni.webp?url";
import bruschettaImg from "@/assets/bruschetta-tradizionale.webp?url";
import bruschettaCrudoImg from "@/assets/bruschetta-crudo.webp?url";
import burrataImg from "@/assets/burrata-prosciutto.webp?url";
import polpetteImg from "@/assets/polpette-sugo.webp?url";
import focacciaMoliseImg from "@/assets/focaccia-molise.webp?url";
import focacciaParmaImg from "@/assets/focaccia-parma.webp?url";
import focacciaCalabreseImg from "@/assets/focaccia-calabrese.webp?url";
import focacciaBolognaImg from "@/assets/focaccia-bologna.webp?url";
import focacciaNavoliImg from "@/assets/focaccia-napoli.webp?url";
import insalataCasaImg from "@/assets/insalata-casa.webp?url";
import tiramisuImg from "@/assets/tiramisu.webp?url";
import cotolettaImg from "@/assets/cotoletta-maiale.webp?url";
import scaloppinaImg from "@/assets/scaloppina-funghi.webp?url";
import paccheriPescatoreImg from "@/assets/paccheri-pescatore.webp?url";
import cardVinoImg from "@/assets/card-vino-new.webp?url";

// Photo map — shared between inline photos and lightbox
const photoMap: Record<string, string> = {
  "Pomodoro D.O.P": pomodoroImg,
  "Pesto Genovese": pestoImg,
  "Pasticciata": pasticciataImg,
  "Quattro Formaggi": formaggiImg,
  "Carbonara": carbonaraImg,
  "Amatriciana": amatricianaImg,
  "Tartufata": tartufataImg,
  "Gnocchi Sorrentina": gnocchiImg,
  "Ravioli Ricotta Spinaci": ravioliImg,
  "Ravioli Porcini Guanciale": ravioliPorciniImg,
  "Cannelloni": cannelloniImg,
  "La San Marzano": bruschettaImg,
  "Crudo e Ricotta Salata": bruschettaCrudoImg,
  "Burrata & Prosciutto": burrataImg,
  "Polpetti al Sugo": polpetteImg,
  "Molise": focacciaMoliseImg,
  "Parma": focacciaParmaImg,
  "Calabrese": focacciaCalabreseImg,
  "Bologna": focacciaBolognaImg,
  "Napoli": focacciaNavoliImg,
  "Lasagna": lasagnaImg,
  "Insalata Mista": insalataCasaImg,
  "Tiramisù": tiramisuImg,
  "Cotoletta di Maiale": cotolettaImg,
  "Scaloppina ai Funghi": scaloppinaImg,
  "Paccheri del Pescatore": paccheriPescatoreImg,
};

// Helper to get translated descriptions
const descMap: Record<string, Record<Lang, string>> = {
  "Burrata & Prosciutto": { en: "Burrata with Parma ham, capers and cherry tomatoes", it: "Burrata con prosciutto di Parma, capperi e pomodorini", lt: "Burata su Parmos kumpiu, kaparėliais ir vyšniniais pomidorais" },
  "Polpetti al Sugo": { en: "Baby octopus in tomato sauce, served with bread", it: "Polpetti in salsa di pomodoro, serviti con pane", lt: "Maži aštuonkojai pomidorų padaže, patiekiami su duona" },
  "Polpette della Nonna": { en: "Homemade meat meatballs in tomato sauce, served with bread", it: "Polpette di carne fatte in casa in salsa di pomodoro, con pane", lt: "Naminiai mėsos kukuliai pomidorų padaže, patiekiami su duona" },
  "La San Marzano": { en: "San Marzano tomatoes, straciatella, fresh basil", it: "Pomodori San Marzano, stracciatella, basilico fresco", lt: "San Marzano pomidorai, stračiatela, šviežias bazilikas" },
  "La Gustosa": { en: "Beef rostbeef, homemade tuna sauce", it: "Roastbeef di manzo, salsa tonnata fatta in casa", lt: "Jautienos rostbifas, naminis tuno padažas" },
  "Crudo e Ricotta Salata": { en: "Parma ham, cherry tomatoes, salted ricotta", it: "Prosciutto di Parma, pomodorini, ricotta salata", lt: "Parmos kumpis, vyšniniai pomidorai, sūdyta rikota" },
  "La Carciofa": { en: "Baked ham, marinated artichokes", it: "Prosciutto cotto, carciofi marinati", lt: "Keptas kumpis, marinuoti artišokai" },
  "Tagliere di Salumi": { en: "Italian cured meats selection", it: "Selezione di salumi italiani", lt: "Itališkų vytintų mėsos gaminių rinkinys" },
  "Tagliere di Formaggi": { en: "Italian cheeses selection", it: "Selezione di formaggi italiani", lt: "Itališkų sūrių rinkinys" },
  "Tagliere Misto": { en: "Mixed cheese and meats selection", it: "Selezione mista di formaggi e salumi", lt: "Mišrus sūrių ir mėsos rinkinys" },
  "Focaccia slice": { en: "", it: "", lt: "" },
  "Zuppa del Giorno": { en: "Soup of the day (ask your waiter)", it: "Zuppa del giorno (chiedere al cameriere)", lt: "Dienos sriuba (klauskite padavėjo)" },
  "Pomodoro D.O.P": { en: "San Marzano tomato sauce, basil", it: "Sugo di pomodoro San Marzano, basilico", lt: "San Marzano pomidorų padažas, bazilikas" },
  "Bolognese Ragù": { en: "Homemade ground beef sauce, parmesan", it: "Ragù di manzo fatto in casa, parmigiano", lt: "Naminė jautienos maltinė, parmezanas" },
  "Carbonara": { en: "Guanciale, egg yolk, pecorino romano, black pepper", it: "Guanciale, tuorlo d'uovo, pecorino romano, pepe nero", lt: "Guanciale, kiaušinio trynys, pecorino romano, juodieji pipirai" },
  "Quattro Formaggi": { en: "Cream sauce, gorgonzola, scamorza, taleggio, parmesan", it: "Salsa di panna, gorgonzola, scamorza, taleggio, parmigiano", lt: "Grietinėlės padažas, gorgonzola, scamorza, taleggio, parmezanas" },
  "Tartufata": { en: "Truffle cream, butter sauce. +fresh truffle slice 4.50€", it: "Crema di tartufo, salsa al burro. +fetta di tartufo fresco 4.50€", lt: "Triufelių kremas, sviestinis padažas. +šviežio triufelio griežinėlis 4.50€" },
  "Pesto Genovese": { en: "Basil, peanuts, parmesan, olive oil", it: "Basilico, arachidi, parmigiano, olio d'oliva", lt: "Bazilikas, žemės riešutai, parmezanas, alyvuogių aliejus" },
  "Pasticciata": { en: "Rosé sauce, Italian sausage, fresh chilli, parmesan", it: "Salsa rosata, salsiccia italiana, peperoncino fresco, parmigiano", lt: "Rožinis padažas, itališka dešrelė, šviežia čili, parmezanas" },
  "Amatriciana": { en: "San Marzano tomato, guanciale, pecorino, black pepper", it: "Pomodoro San Marzano, guanciale, pecorino, pepe nero", lt: "San Marzano pomidorai, guanciale, pecorino, juodieji pipirai" },
  "Paccheri del Pescatore": { en: "Paccheri pasta, prawns, cherry tomato, seafood bisque, parsley", it: "Paccheri, gamberi, pomodorino, bisque di mare, prezzemolo", lt: "Paccheri pasta, krevetės, vyšniniai pomidorai, jūros gėrybių bisque, petražolės" },
  "Ravioli Porcini Guanciale": { en: "Porcini ravioli, porcini cream, guanciale", it: "Ravioli ai porcini, crema di porcini, guanciale", lt: "Baravykų ravioliai, baravykų kremas, guanciale" },
  "Ravioli Ricotta Spinaci": { en: "Spinach ricotta ravioli, San Marzano, cherry tomatoes", it: "Ravioli ricotta e spinaci, San Marzano, pomodorini", lt: "Špinatų rikotės ravioliai, San Marzano, vyšniniai pomidorai" },
  "Cannelloni": { en: "Ricotta, spinach, bechamel, parmesan", it: "Ricotta, spinaci, besciamella, parmigiano", lt: "Rikota, špinatai, bešamelis, parmezanas" },
  "Lasagna": { en: "Traditional beef lasagna", it: "Lasagna tradizionale di manzo", lt: "Tradicinė jautienos lazanija" },
  "Gnocchi Sorrentina": { en: "Baked gnocchi, San Marzano, mozzarella, parmesan", it: "Gnocchi al forno, San Marzano, mozzarella, parmigiano", lt: "Kepti gnocchi, San Marzano, mocarela, parmezanas" },
  "Molise": { en: "Scamorza cheese, paprika, zucchini, onions", it: "Scamorza, paprica, zucchine, cipolle", lt: "Scamorza sūris, paprika, cukinija, svogūnai" },
  "Torino": { en: "Roasted ham, taleggio cheese, mushroom cream", it: "Prosciutto arrosto, taleggio, crema di funghi", lt: "Keptas kumpis, taleggio sūris, grybų kremas" },
  "Milano": { en: "Milano salami, gorgonzola cheese, rucola", it: "Salame Milano, gorgonzola, rucola", lt: "Milano saliamis, gorgonzola sūris, rukola" },
  "Parma": { en: "Parma ham, tomatoes, rucola, parmesan cream", it: "Prosciutto di Parma, pomodori, rucola, crema di parmigiano", lt: "Parmos kumpis, pomidorai, rukola, parmezano kremas" },
  "Romana": { en: "Pancetta, pecorino cream, artichokes, romana lettuce", it: "Pancetta, crema di pecorino, carciofi, lattuga romana", lt: "Pančeta, pecorino kremas, artišokai, romaninės salotos" },
  "Napoli": { en: "Salsiccia Napoletana, bufala mozzarella cheese, paprika", it: "Salsiccia Napoletana, mozzarella di bufala, paprica", lt: "Neapolietaniškas dešrelė, bivolo mocarela, paprika" },
  "Calabrese": { en: "Spicy sopressata salami, nduja cream, mascarpone, rucola", it: "Sopressata piccante, crema di nduja, mascarpone, rucola", lt: "Aštri sopressata saliamis, nduja kremas, maskarponė, rukola" },
  "Bologna": { en: "Mortadella, pesto, stracciatella cheese, crumbled pistachios", it: "Mortadella, pesto, stracciatella, granella di pistacchi", lt: "Mortadela, pesto, stračiatela sūris, trupinti pistacijos" },
  "Cotoletta di Maiale": { en: "Pork tenderloin in breadcrumbs", it: "Filetto di maiale impanato", lt: "Kiaulienos nugarinė tešloje" },
  "Pollo alla Cacciatora": { en: "Chicken thigh in a tomato and black olives sauce", it: "Coscia di pollo in salsa di pomodoro e olive nere", lt: "Vištienos šlaunelė pomidorų ir juodųjų alyvuogių padaže" },
  "Scaloppina ai Funghi": { en: "Chicken fillet in a cream and mushrooms sauce", it: "Fettina di pollo in crema di funghi", lt: "Vištienos filė grietinėlės ir grybų padaže" },
  "Insalata Mista": {
    en: "Mix green, cherry tomatoes, onions, cucumbers, olives, balsamic vinaigrette. +chicken 3€ +roasted ham 4€ +prawns 4€ +goat cheese 4€",
    it: "Mix verde, pomodorini, cipolle, cetrioli, olive, vinaigrette balsamica. +pollo 3€ +prosciutto cotto 4€ +gamberi 4€ +formaggio di capra 4€",
    lt: "Žalumynų mišinys, vyšniniai pomidorai, svogūnai, agurkai, alyvuogės, balzaminis vinaigretas. +vištiena 3€ +keptas kumpis 4€ +krevetės 4€ +ožkos sūris 4€",
  },
  "Mediterranea": {
    en: "Mix green, tuna, olives, tomatoes, boiled eggs, onions, vinagrette",
    it: "Mix verde, tonno, olive, pomodori, uova sode, cipolle, vinaigrette",
    lt: "Žalumynų mišinys, tunas, alyvuogės, pomidorai, virti kiaušiniai, svogūnai, vinaigretas",
  },
  "La Bufala": {
    en: "Bufalo mozzarella, Italian tomatoes, basil",
    it: "Mozzarella di bufala, pomodori italiani, basilico",
    lt: "Bivolo mocarela, itališki pomidorai, bazilikas",
  },
  "Tiramisù": { en: "Classic cocoa, Pistacchio, or Forest Berries", it: "Cacao classico, Pistacchio, o Frutti di Bosco", lt: "Klasikinis kakavos, Pistacijų arba Miško uogų" },
  "Affogato al Caffè": { en: "Coffee shot with ice-cream ball", it: "Shot di caffè con pallina di gelato", lt: "Kavos šūvis su ledų rutuliuku" },
  "Dolce della Casa": { en: "Our daily dessert", it: "Il nostro dolce del giorno", lt: "Mūsų dienos desertas" },
};

const contorniNames: Record<string, Record<Lang, string>> = {
  "Baked Potatoes": { en: "Baked Potatoes", it: "Patate al forno", lt: "Keptos bulvės" },
  "Mix Salad": { en: "Mix Salad", it: "Insalata mista", lt: "Mišrios salotos" },
  "Parmesan Asparagus": { en: "Parmesan Asparagus", it: "Asparagi al parmigiano", lt: "Šparagai su parmezanu" },
  "Roasted Veggies": { en: "Roasted Veggies", it: "Verdure arrosto", lt: "Keptos daržovės" },
};

const drinkNameMap: Record<string, Record<Lang, string>> = {
  "House wine": { en: "House wine", it: "Vino della casa", lt: "Naminis vynas" },
  "Still Water": { en: "Still Water", it: "Acqua naturale", lt: "Negazuotas vanduo" },
  "Sparkling Water": { en: "Sparkling Water", it: "Acqua frizzante", lt: "Gazuotas vanduo" },
  "Homemade Lemonade": { en: "Homemade Lemonade", it: "Limonata fatta in casa", lt: "Naminis limonadas" },
  "Juice Bottle (Orange/Apple)": { en: "Juice Bottle (Orange/Apple)", it: "Succo (Arancia/Mela)", lt: "Sultys (Apelsinų/Obuolių)" },
  "Fresh Squeezed Orange Juice": { en: "Fresh Squeezed Orange Juice", it: "Spremuta d'arancia fresca", lt: "Šviežiai spaustos apelsinų sultys" },
  "Hot Tea": { en: "Hot Tea", it: "Tè caldo", lt: "Karšta arbata" },
  "Decaf (all coffees)": { en: "Decaf (all coffees)", it: "Decaffeinato (tutti i caffè)", lt: "Be kofeino (visi kavos gėrimai)" },
};

function getDesc(name: string, lang: Lang): string {
  return descMap[name]?.[lang] ?? "";
}

const menuItems = {
  antipasti: [
    { name: "Burrata & Prosciutto", price: "8€" },
    { name: "Polpetti al Sugo", price: "8€" },
    { name: "Polpette della Nonna", price: "7.50€" },
  ],
  bruschette: [
    { name: "La San Marzano", price: "6.50€" },
    { name: "La Gustosa", price: "7.50€" },
    { name: "Crudo e Ricotta Salata", price: "8€" },
    { name: "La Carciofa", price: "7€" },
  ],
  taglieri: [
    { name: "Tagliere di Salumi", price: "10€" },
    { name: "Tagliere di Formaggi", price: "10€" },
    { name: "Tagliere Misto", price: "11€" },
    { name: "Focaccia slice", price: "+3€" },
  ],
  zuppe: [
    { name: "Zuppa del Giorno", price: "4.50€" },
  ],
  sauces: [
    { name: "Pomodoro D.O.P", price: "8€" },
    { name: "Bolognese Ragù", price: "10€" },
    { name: "Carbonara", price: "9.50€" },
    { name: "Quattro Formaggi", price: "9.50€" },
    { name: "Tartufata", price: "11€" },
    { name: "Pesto Genovese", price: "9€" },
    { name: "Pasticciata", price: "9.50€" },
    { name: "Amatriciana", price: "9.50€" },
  ],
  specials: [
    { name: "Paccheri del Pescatore", price: "14€" },
    { name: "Ravioli Porcini Guanciale", price: "13€" },
    { name: "Ravioli Ricotta Spinaci", price: "12€" },
    { name: "Cannelloni", price: "12€" },
    { name: "Lasagna", price: "12€" },
    { name: "Gnocchi Sorrentina", price: "11€" },
  ],
  focacce: [
    { name: "Molise", price: "7€" },
    { name: "Torino", price: "8€" },
    { name: "Milano", price: "9€" },
    { name: "Parma", price: "10€" },
    { name: "Romana", price: "10€" },
    { name: "Napoli", price: "10€" },
    { name: "Calabrese", price: "10€" },
    { name: "Bologna", price: "10€" },
  ],
  secondi: [
    { name: "Cotoletta di Maiale", price: "11€" },
    { name: "Pollo alla Cacciatora", price: "12€" },
    { name: "Scaloppina ai Funghi", price: "12€" },
  ],
  contorni: [
    { name: "Baked Potatoes", price: "4€" },
    { name: "Mix Salad", price: "3.50€" },
    { name: "Parmesan Asparagus", price: "4€" },
    { name: "Roasted Veggies", price: "3.50€" },
  ],
  insalate: [
    { name: "Insalata Mista", price: "6€" },
    { name: "Mediterranea", price: "9.50€" },
    { name: "La Bufala", price: "8€" },
  ],
  dolci: [
    { name: "Tiramisù", price: "5.50€" },
    { name: "Affogato al Caffè", price: "5.50€" },
    { name: "Dolce della Casa", price: "5€" },
  ],
};

interface DrinkCategory {
  titleKey: string;
  items: { name: string; price: string; price2?: string }[];
}

const drinkCategories: DrinkCategory[] = [
  {
    titleKey: "drinkRedWine",
    items: [
      { name: "House wine", price: "4.60€" },
      { name: "Santa Tresa Frappato", price: "5.80€", price2: "22€" },
      { name: "Preciso Primitivo", price: "", price2: "25€" },
      { name: "Vita Libera 0.0%", price: "4.60€", price2: "19€" },
      { name: "Rosé", price: "4.60€", price2: "20€" },
    ],
  },
  {
    titleKey: "drinkWhiteWine",
    items: [
      { name: "House wine", price: "4.60€" },
      { name: "Colpasso Pinot", price: "5.50€", price2: "22€" },
      { name: "Santa Tresa Grillo", price: "", price2: "25€" },
      { name: "Vita Libera Pinot 0.0%", price: "4.60€", price2: "19€" },
      { name: "Proverbio Prosecco (Organic)", price: "5.50€", price2: "24€" },
    ],
  },
  {
    titleKey: "drinkCocktails",
    items: [
      { name: "Aperol Spritz", price: "8.50€" },
      { name: "Negroni", price: "9€" },
      { name: "Americano", price: "9€" },
      { name: "GinTonic", price: "8€" },
      { name: "Limoncello Spritz", price: "9€" },
      { name: "Campari Spritz", price: "9€" },
    ],
  },
  {
    titleKey: "drinkCocktails0",
    items: [
      { name: "Aperol Spritz", price: "7.50€" },
      { name: "Americano", price: "7.50€" },
    ],
  },
  {
    titleKey: "drinkLiquors",
    items: [
      { name: "Limoncello", price: "4.50€" },
      { name: "Amaretto", price: "4.50€" },
      { name: "Gin", price: "4.50€" },
      { name: "Whisky", price: "4.50€" },
      { name: "Vodka", price: "4.50€" },
      { name: "Grappa", price: "4.50€" },
    ],
  },
  {
    titleKey: "drinkBeers",
    items: [
      { name: "Moretti draft IT 400ml", price: "5€" },
      { name: "Vilkmerges draft LT 410ml", price: "5€" },
      { name: "Moretti 0.0% IT 33cl", price: "4.50€" },
    ],
  },
  {
    titleKey: "drinkCider",
    items: [
      { name: "Vilkmerges craft 400ml", price: "5.90€" },
      { name: "Vilkmerges craft 0.0% 500ml", price: "5€" },
    ],
  },
  {
    titleKey: "drinkSoft",
    items: [
      { name: "Still Water", price: "2€" },
      { name: "Sparkling Water", price: "2€" },
      { name: "Pepsi", price: "2.20€" },
      { name: "Mirinda", price: "2.20€" },
      { name: "Gira", price: "2.20€" },
      { name: "Homemade Lemonade", price: "3.50€" },
      { name: "Juice Bottle (Orange/Apple)", price: "2.20€" },
      { name: "Fresh Squeezed Orange Juice", price: "3.50€" },
    ],
  },
  {
    titleKey: "drinkCaffe",
    items: [
      { name: "Espresso", price: "1.80€" },
      { name: "Espresso Macchiato", price: "2.20€" },
      { name: "Cappuccino", price: "3€" },
      { name: "Latte", price: "3.30€" },
      { name: "Hot Tea", price: "2.60€" },
      { name: "Matcha", price: "3.50€" },
      { name: "Decaf (all coffees)", price: "+1.20€" },
    ],
  },
];

const pastaTypes = ["Spaghetti", "Paccheri", "Pappardelle", "Orecchiette", "Gnocchi"];

// ─── Price ──────────────────────────────────────────────────────────
const Price = ({ price }: { price: string }) => (
  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#8b1a0a", whiteSpace: "nowrap" }}>{price}</span>
);

// ─── DishRow with divider â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const DishRow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  return (
    <div style={{ ...style }}>
      {children}
      <div style={{ height: 1, background: "#2c1a0e30", marginTop: 14 }} />
    </div>
  );
};

// â"€â"€â"€ Inline photo component â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const InlinePhoto = ({ name, onClick }: { name: string; onClick: () => void }) => {
  const img = photoMap[name];
  if (img) {
    return (
      <button
        onClick={onClick}
        className="shrink-0 rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-transform"
        style={{ width: 56, height: 56, border: "2.5px solid #1a0f08", background: "none", padding: 0 }}
        aria-label={`View photo of ${name}`}
      >
        <img src={img} alt={name} className="w-full h-full object-cover" loading="eager" decoding="async" />
      </button>
    );
  }
  return (
      <button
        onClick={onClick}
        className="shrink-0 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        style={{ width: 56, height: 56, border: "2.5px solid #1a0f08", backgroundColor: "#c9b88a", padding: 0 }}
        aria-label={`View photo of ${name}`}
      >
      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.45rem", color: "#8b1a0a", textAlign: "center", lineHeight: 1.2, padding: 4, opacity: 0.7 }}>
        Photo coming soon
      </span>
    </button>
  );
};

// â"€â"€â"€ Pasta Section â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const PastaFrescaSection = ({ lang, onPhotoClick }: { lang: Lang; onPhotoClick: (name: string) => void }) => {
  return (
    <div style={{ marginBottom: "60px" }}>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.08em", color: "#8b1a0a", textAlign: "center", marginBottom: "4px" }}>
        {t("subBuildYourOwn", lang)}
      </p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.65rem", fontVariant: "small-caps", letterSpacing: "0.2em", color: "#8b1a0a", textAlign: "center", marginBottom: "20px" }}>
        {t("subChoosePasta", lang)}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {pastaTypes.map((name) => (
          <span key={name} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.72rem", fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.1em",
            color: "#2c1a0e",
            padding: "6px 14px",
            border: "1px solid rgba(44,26,14,0.2)",
            borderRadius: "2px",
          }}>{name}</span>
        ))}
      </div>

      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", fontStyle: "italic", color: "#6b4226", textAlign: "center", marginBottom: "20px" }}>
        {t("subGlutenFree", lang)}
      </p>

      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.65rem", fontVariant: "small-caps", letterSpacing: "0.2em", color: "#8b1a0a", textAlign: "center", marginBottom: "20px" }}>
        {t("subChooseSauce", lang)}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "28px", marginBottom: "40px" }}>
        {menuItems.sauces.map((item, i) => (
          <DishRow key={i}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <InlinePhoto name={item.name} onClick={() => onPhotoClick(item.name)} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#1a0f08", margin: 0, display: "inline" }}>
                    {item.name}
                  </h3>
                  <Price price={item.price} />
                </div>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontStyle: "italic", fontWeight: 400, color: "#6b4226", margin: "2px 0 0", lineHeight: 1.4 }}>
                  {getDesc(item.name, lang)}
                </p>
              </div>
            </div>
          </DishRow>
        ))}
      </div>

      {/* SPECIAL LALIMENTARI box */}
      <div style={{ backgroundColor: "#c9b88a", border: "2px double #8b1a0a", padding: "28px 24px", borderRadius: "4px", boxShadow: "inset 0 0 0 6px #c9b88a, inset 0 0 0 7px #8b1a0a30" }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8b1a0a", textAlign: "center", marginBottom: "4px" }}>
          •&nbsp;{t("subSpecialLalimentari", lang)}&nbsp;•
        </h3>
        <div style={{ width: "30px", height: "1px", background: "#8b1a0a40", margin: "8px auto 24px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {menuItems.specials.map((item, i) => (
            <DishRow key={i}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <InlinePhoto name={item.name} onClick={() => onPhotoClick(item.name)} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#1a0f08", margin: 0, display: "inline" }}>
                      {item.name}
                    </h4>
                    <Price price={item.price} />
                  </div>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontStyle: "italic", fontWeight: 400, color: "#6b4226", margin: "4px 0 0", lineHeight: 1.5 }}>
                    {getDesc(item.name, lang)}
                  </p>
                </div>
              </div>
            </DishRow>
          ))}
        </div>
      </div>
    </div>
  );
};

// â"€â"€â"€ Menu Section â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const MenuSection = ({ title, subtitle, items, lang, onPhotoClick, hideTitle }: { title: string; subtitle: string; items: { name: string; price: string }[]; lang: Lang; onPhotoClick: (name: string) => void; hideTitle?: boolean }) => {
  return (
    <div style={{ marginBottom: "60px" }}>
      {!hideTitle && (
        <>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8b1a0a", textAlign: "center" }}>
            •&nbsp;{title}&nbsp;•
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.75rem", fontVariant: "small-caps", letterSpacing: "0.2em", color: "#8b1a0a", textAlign: "center", marginTop: "4px" }}>
            {subtitle}
          </p>
          <div style={{ width: "50px", height: "1px", background: "#8b1a0a40", margin: "12px auto 32px" }} />
        </>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {items.map((item, i) => {
          const desc = getDesc(item.name, lang);
          return (
            <DishRow key={i}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <InlinePhoto name={item.name} onClick={() => onPhotoClick(item.name)} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#1a0f08", margin: 0, display: "inline" }}>
                      {item.name}
                    </h3>
                    <Price price={item.price} />
                  </div>
                  {desc && (
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", fontStyle: "italic", fontWeight: 400, color: "#6b4226", margin: "4px 0 0", lineHeight: 1.5 }}>
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            </DishRow>
          );
        })}
      </div>
    </div>
  );
};


// ─── Category Nav ───────────────────────────────────────────────────
const CategoryNav = ({
  activeSection,
  onNavClick,
  lang,
}: {
  activeSection: string;
  onNavClick: (href: string) => void;
  lang: Lang;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { href: "#starters",   img: burrataImg,       label: { it: "Antipasti", en: "Starters",  lt: "Užkandžiai" }[lang] },
    { href: "#fresh-pasta",img: carbonaraImg,      label: { it: "Pasta",     en: "Pasta",     lt: "Pasta"       }[lang] },
    { href: "#focacce",    img: focacciaParmaImg,  label: { it: "Focacce",   en: "Focacce",   lt: "Focacce"     }[lang] },
    { href: "#secondi",    img: scaloppinaImg,     label: { it: "Secondi",   en: "Mains",     lt: "Patiekalai"  }[lang] },
    { href: "#insalate",   img: insalataCasaImg,   label: { it: "Insalate",  en: "Salads",    lt: "Salotos"     }[lang] },
    { href: "#dolci",      img: tiramisuImg,       label: { it: "Dolci",     en: "Desserts",  lt: "Desertai"    }[lang] },
    { href: "#bevande",    img: null,              label: { it: "Vini",      en: "Wine",      lt: "Vynas"       }[lang] },
  ];

  useEffect(() => {
    const active = scrollRef.current?.querySelector<HTMLElement>(`[data-href="${activeSection}"]`);
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeSection]);

  return (
    <>
      <style>{`
        .cat-nav-scroll::-webkit-scrollbar { display:none }
        .sticky-cat-nav {
          position: sticky;
          top: 56px;
          z-index: 40;
          background: rgba(245,237,224,0.97);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(44,26,14,0.09);
          box-shadow: 0 2px 16px rgba(44,26,14,0.06);
        }
        @media (min-width: 768px) {
          .sticky-cat-nav {
            top: 88px;
          }
        }
      `}</style>
      <div className="sticky-cat-nav">
        <div
          ref={scrollRef}
          className="cat-nav-scroll"
          style={{
            display: "flex", gap: 8, padding: "10px 16px",
            overflowX: "auto", scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => {
            const active = activeSection === cat.href;
            return (
              <button
                key={cat.href}
                data-href={cat.href}
                onClick={() => onNavClick(cat.href)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: cat.img ? "5px 14px 5px 5px" : "5px 16px",
                  borderRadius: 100,
                  border: active ? "1.5px solid #2c1a0e" : "1.5px solid rgba(44,26,14,0.15)",
                  background: active ? "#2c1a0e" : "transparent",
                  cursor: "pointer", flexShrink: 0,
                  transition: "background 0.22s ease, border-color 0.22s ease",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {cat.img ? (
                  <img
                    src={cat.img}
                    alt=""
                    style={{
                      width: 28, height: 28, borderRadius: "50%",
                      objectFit: "cover", flexShrink: 0,
                      filter: active ? "saturate(1.1) brightness(1.05)" : "saturate(0.65) brightness(0.92)",
                      transition: "filter 0.22s ease",
                      border: active ? "1.5px solid rgba(223,201,154,0.4)" : "1.5px solid rgba(44,26,14,0.1)",
                    }}
                  />
                ) : (
                  <span style={{
                    fontSize: 15, lineHeight: 1,
                    color: active ? "#dfc99a" : "#6b4226",
                  }}>🍷</span>
                )}
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: active ? "#dfc99a" : "#2c1a0e",
                  whiteSpace: "nowrap",
                  transition: "color 0.22s ease",
                }}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ─── Category Banner ────────────────────────────────────────────────
const CategoryBanner = ({ img, title, tagline, id, lottieUrl }: { img: string; title: string; tagline?: string; id?: string; lottieUrl?: string }) => (
  <div id={id} style={{ position: "relative", width: "100%", height: "48vh", minHeight: "260px", overflow: "hidden", scrollMarginTop: "64px" }}>
    <img
      src={img}
      alt={title}
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.42) contrast(1.12) saturate(1.08)" }}
      loading="lazy"
    />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(14,8,4,0.94) 0%, rgba(14,8,4,0.28) 55%, rgba(44,26,14,0.08) 100%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(14,8,4,0.35) 0%, transparent 60%)" }} />
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "2rem 2rem 2.5rem", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#fff", lineHeight: 0.85, letterSpacing: "0.03em", margin: 0 }}>
        {title}
      </h2>
    </div>
    {lottieUrl && (
      <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", width: 140, height: 140, opacity: 0.88, pointerEvents: "none" }}>
        <lottie-player
          src={lottieUrl}
          background="transparent"
          speed="1"
          loop
          autoplay
          style={{ width: "100%", height: "100%" } as React.CSSProperties}
        />
      </div>
    )}
  </div>
);

// â"€â"€â"€ Page â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
const MenuPage = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("#starters");
  const { lang } = useLanguage();

  // Preload all menu images on mount so lightbox opens instantly
  useEffect(() => {
    const preloaded: HTMLLinkElement[] = [];
    Object.values(photoMap).forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      preloaded.push(link);
    });
    return () => preloaded.forEach((l) => l.remove());
  }, []);

  const sectionIds = ["starters", "fresh-pasta", "focacce", "secondi", "insalate", "dolci", "bevande"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection("#" + entry.target.id);
        });
      },
      { rootMargin: "-64px 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [lang]);


  return (
    <>
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f5ede0 0%, #e8d5b2 50%, #dfc99a 100%)" }}>
        <SEO
          title="Menu | LALIMENTARI – Pasta Fresca, Focacce, Secondi – Italian Restaurant Vilnius"
          description="Il menu di LALIMENTARI a Vilnius: pasta fresca fatta in casa, focacce, bruschette, secondi e dolci italiani. Scopri la vera cucina italiana. Italian food menu Vilnius."
          path={`/${lang}/menu`}
        />
        <Navbar />
        <CategoryNav
          activeSection={activeSection}
          onNavClick={(href) => {
            document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
          }}
          lang={lang}
        />


        {/* Menu Content */}
        <CategoryBanner
          id="starters"
          img={burrataImg}
          title={{ it: "Antipasti", en: "Starters", lt: "Užkandžiai" }[lang]}
          tagline={{ it: "Per cominciare bene.", en: "The perfect start.", lt: "Puikus pradžia." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 0" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
            <div>
              <MenuSection title="Antipasti" subtitle={t("subStarters", lang)} items={menuItems.antipasti} lang={lang} onPhotoClick={setLightbox} hideTitle />
              <MenuSection title="Bruschette" subtitle={t("subBruschetta", lang)} items={menuItems.bruschette} lang={lang} onPhotoClick={setLightbox} />
            </div>
            <div>
              <MenuSection title="Taglieri" subtitle={t("subBoards", lang)} items={menuItems.taglieri} lang={lang} onPhotoClick={setLightbox} />
              <MenuSection title="Zuppe" subtitle={t("subSoups", lang)} items={menuItems.zuppe} lang={lang} onPhotoClick={setLightbox} />
            </div>
          </div>
        </section>

        <CategoryBanner
          id="fresh-pasta"
          img={carbonaraImg}
          title={{ it: "La Pasta Fresca", en: "Fresh Pasta", lt: "Šviežia Pasta" }[lang]}
          tagline={{ it: "Fatta a mano ogni mattina.", en: "Handmade every morning.", lt: "Gaminama rankomis kiekvieną rytą." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
          <PastaFrescaSection lang={lang} onPhotoClick={setLightbox} />
        </section>

        <CategoryBanner
          id="focacce"
          img={focacciaParmaImg}
          title={{ it: "Focacce", en: "Focacce", lt: "Focacce" }[lang]}
          tagline={{ it: "Sfornata ogni giorno.", en: "Freshly baked daily.", lt: "Kepama kiekvieną dieną." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
          <MenuSection title="Focacce" subtitle={t("subFlatbreads", lang)} items={menuItems.focacce} lang={lang} onPhotoClick={setLightbox} hideTitle />
        </section>

        <CategoryBanner
          id="secondi"
          img={scaloppinaImg}
          title={{ it: "Secondi Piatti", en: "Main Courses", lt: "Pagrindiniai Patiekalai" }[lang]}
          tagline={{ it: "Il cuore del pasto.", en: "The heart of the meal.", lt: "Pagrindinė patiekalo dalis." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 20px" }}>
          <MenuSection title="Secondi Piatti" subtitle={t("subMainCourses", lang)} items={menuItems.secondi} lang={lang} onPhotoClick={setLightbox} hideTitle />
        </section>

        {/* Contorni */}
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 20px" }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8b1a0a", textAlign: "center" }}>
            •&nbsp;Contorni&nbsp;•
          </h2>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.75rem", fontVariant: "small-caps", letterSpacing: "0.2em", color: "#8b1a0a", textAlign: "center", marginTop: "4px" }}>
            {t("subSidesExtra", lang)}
          </p>
          <div style={{ width: "50px", height: "1px", background: "#8b1a0a40", margin: "12px auto 32px" }} />
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px" }}>
            {menuItems.contorni.map((item, i) => (
              <div key={i} style={{ border: "1px solid #8b1a0a40", borderRadius: "6px", padding: "12px 20px", textAlign: "center", minWidth: "120px" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#1a0f08", margin: 0 }}>
                  {contorniNames[item.name]?.[lang] ?? item.name}
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: "#8b1a0a", margin: "4px 0 0" }}>
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        <CategoryBanner
          id="insalate"
          img={insalataCasaImg}
          title={{ it: "Insalate", en: "Salads", lt: "Salotos" }[lang]}
          tagline={{ it: "Fresca e leggera.", en: "Fresh and light.", lt: "Šviežia ir lengva." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
          <MenuSection title="Insalate" subtitle={t("subSalads", lang)} items={menuItems.insalate} lang={lang} onPhotoClick={setLightbox} hideTitle />
        </section>

        <CategoryBanner
          id="dolci"
          img={tiramisuImg}
          title={{ it: "Dolci", en: "Desserts", lt: "Desertai" }[lang]}
          tagline={{ it: "Il finale perfetto.", en: "The perfect ending.", lt: "Tobulas finalas." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
          <MenuSection title="Dolci" subtitle={t("subDesserts", lang)} items={menuItems.dolci} lang={lang} onPhotoClick={setLightbox} hideTitle />
        </section>

        {/* Drinks */}
        <CategoryBanner
          id="bevande"
          img={cardVinoImg}
          title={{ it: "Vini", en: "Wine", lt: "Vynas" }[lang]}
          tagline={{ it: "Vini, cocktail e molto altro.", en: "Wines, cocktails and more.", lt: "Vynai, kokteiliai ir daugiau." }[lang]}
        />
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 60px" }}>
          <div style={{ width: "40px", height: "1px", background: "#8b1a0a40", margin: "0 auto 36px" }} />

          {/* Wine section */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
            {drinkCategories.slice(0, 2).map((cat, ci) => (
              <div key={ci} style={{ marginBottom: "40px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8b1a0a", textAlign: "center", marginBottom: "16px" }}>
                  •&nbsp;{t(cat.titleKey as any, lang)}&nbsp;•
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "#2c1a0e" }}>
                        {drinkNameMap[item.name]?.[lang] ?? item.name}
                      </span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "#8b1a0a", whiteSpace: "nowrap" }}>
                        {item.price}{item.price2 ? ` / ${item.price2}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lottie divider */}
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 24px" }}>
            <div style={{ width: 180, height: 180, borderRadius: "50%", background: "#0E0804", overflow: "hidden", flexShrink: 0 }}>
              <lottie-player
                src="/lottie/couple-dating.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "100%", height: "100%" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Cocktails, liquors, beers, soft, coffee */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16">
            {drinkCategories.slice(2).map((cat, ci) => (
              <div key={ci} style={{ marginBottom: "40px" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8b1a0a", textAlign: "center", marginBottom: "16px" }}>
                  •&nbsp;{t(cat.titleKey as any, lang)}&nbsp;•
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {cat.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "#2c1a0e" }}>
                        {drinkNameMap[item.name]?.[lang] ?? item.name}
                      </span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 700, color: "#8b1a0a", whiteSpace: "nowrap" }}>
                        {item.price}{item.price2 ? ` / ${item.price2}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#2c1a0e", padding: "64px 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 600, color: "#dfc99a", marginBottom: "24px" }}>
            {t("ctaTitle", lang)}
          </h2>
          <a
            href="tel:+37066408338"
            style={{ display: "inline-block", border: "1px solid #dfc99a", color: "#dfc99a", padding: "12px 36px", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#dfc99a"; e.currentTarget.style.color = "#2c1a0e"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#dfc99a"; }}
          >
            {t("ctaButton", lang)}
          </a>
        </section>

        <Footer />
      </div>

      <ScrollToTop />


      {/* Lightbox */}
      {lightbox && (() => {
        const desc = getDesc(lightbox, lang);
        const allItems = [...menuItems.antipasti, ...menuItems.bruschette, ...menuItems.taglieri, ...menuItems.zuppe, ...menuItems.sauces, ...menuItems.specials, ...menuItems.focacce, ...menuItems.secondi, ...menuItems.insalate, ...menuItems.dolci];
        const itemData = allItems.find((it) => it.name === lightbox);
        return (
          <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, zIndex: 60, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", backgroundColor: "#dfc99a", borderRadius: "8px", overflow: "hidden", maxWidth: "340px", width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", animation: "fadeIn 0.2s ease-in" }}>
              <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(44,26,14,0.6)", border: "none", cursor: "pointer", zIndex: 1, borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} color="#dfc99a" />
              </button>
              {photoMap[lightbox] ? (
                <img
                  src={photoMap[lightbox]}
                  alt={lightbox}
                  decoding="async"
                  style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", aspectRatio: "1", backgroundColor: "#c9b88a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "1rem", color: "#8b1a0a", textAlign: "center", opacity: 0.7 }}>
                    Photo coming soon
                  </span>
                </div>
              )}
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", marginBottom: desc ? "8px" : "0" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2c1a0e", margin: 0 }}>
                    {lightbox}
                  </h3>
                  {itemData && (
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", color: "#8b1a0a", whiteSpace: "nowrap" }}>
                      {itemData.price}
                    </span>
                  )}
                </div>
                {desc && (
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", fontStyle: "italic", color: "#6b4226", margin: 0, lineHeight: 1.5 }}>
                    {desc}
                  </p>
                )}
                <div style={{ marginTop: "12px" }}>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default MenuPage;
