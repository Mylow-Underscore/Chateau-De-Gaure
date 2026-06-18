"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Image from "next/image";

type Lang = "fr" | "en" | "es";

const TRANSLATIONS = {
  fr: {
    nav_chateau: "Le Château",
    nav_vignoble: "Vignoble",
    nav_cuvees: "Nos Cuvées",
    nav_art: "L'Art",
    nav_visiter: "Visiter",
    hero_eyebrow: "Rouffiac-d'Aude · Languedoc",
    hero_sub: "Où le vin devient œuvre d'art.\nBiodynamie · Art · Terroir.",
    hero_cta1: "Découvrir nos cuvées",
    hero_cta2: "Nous rendre visite",
    hero_reviews: "avis",
    hero_scroll: "Descendre",
    hist_eyebrow: "Notre histoire",
    hist_title: "Mille ans de terroir,\nune empreinte artistique",
    hist_p1: "Voici près de {20 ans} que Gaure s'est emparé de nous ; il nous inspire, nous héberge et nous nourrit pour lui laisser notre empreinte, le souvenir de nos émotions vécues. Nous sommes enracinés dans cette {terre nourricière} qui garde secrètement en elle {1000 ans d'histoires}.",
    hist_p2: "Nos vins expriment cette magie — une transformation d'un simple fruit en produit complexe. Art, biodynamie et passion : voilà l'âme du Château de Gaure.",
    hist_stat1: "ans d'histoire récente",
    hist_stat2: "ans de terroir",
    hist_stat3: "note Google",
    hist_stat4: "dynamie certifiée",
    vig_eyebrow: "Vignoble & Engagement",
    vig_title: "La vigne comme\nengagement de vie",
    vig_bio_t: "Biodynamie",
    vig_bio_d: "Le château pratique la viticulture biodynamique, respectant les cycles lunaires et la vie du sol pour exprimer le terroir dans sa vérité la plus pure.",
    vig_ter_t: "Nos Terroirs",
    vig_ter_d: "Entre les Pyrénées et la Méditerranée, les sols argilo-calcaires de Rouffiac-d'Aude confèrent à nos vins une minéralité unique et une fraîcheur remarquable.",
    vig_bio2_t: "Biodiversité",
    vig_bio2_d: "Haies, prairies fleuries, insectes auxiliaires : le domaine cultive un équilibre vivant qui nourrit la vigne sans artifice chimique.",
    cuv_eyebrow: "Nos cuvées",
    cuv_title: "Des vins qui racontent\nune terre et un artiste",
    cuv_order: "Commander en ligne",
    cuv_syrah_type: "Rouge · Campagne",
    cuv_syrah_desc: "Assemblage Syrah-Grenache, fruité et généreux, parfait pour les repas conviviaux du quotidien.",
    cuv_limoux_type: "Blanc · AOP Limoux",
    cuv_limoux_desc: "Une appellation d'exception pour ce blanc vif et minéral, reflet du terroir de Limoux.",
    cuv_chard_type: "Blanc · Campagne",
    cuv_chard_desc: "Chardonnay rond et gourmand aux arômes de fruits blancs, idéal en apéritif.",
    cuv_languedoc_type: "Rouge · AOC Languedoc",
    cuv_languedoc_desc: "La signature du domaine : un rouge structuré, élevé avec soin, reflet de notre terroir audois.",
    cuv_oppidum_type: "Blanc · Cuvée Oppidum",
    cuv_oppidum_desc: "Cuvée évoquant les anciens oppidums de la région, un blanc ample porté par une belle fraîcheur.",
    cuv_pourmonpere_type: "Rouge · Cuvée Hommage",
    cuv_pourmonpere_desc: "Une cuvée intime dédiée en hommage, charpentée et profonde, à savourer avec émotion.",
    cuv_alderica_type: "Pétillant Naturel · Princesse Aldérica",
    cuv_alderica_desc: "Un effervescent naturel élégant, bulles fines et fraîcheur éclatante, signé Château de Gaure.",
    art_eyebrow: "L'art au château",
    art_title: "Pierre Fabre,\nvigneron artiste",
    art_p1: "Au Château de Gaure, l'art et le vin se nourrissent mutuellement. Les œuvres de {Pierre Fabre} habitent les murs du château, dialoguent avec les barriques, transforment la dégustation.",
    art_p2: "Chaque bouteille est une toile. Chaque vendange, une nouvelle création. Le domaine accueille artistes et amateurs d'art dans un espace unique entre vignes et peintures.",
    art_btn: "Découvrir l'univers artistique",
    vis_eyebrow: "Nous rendre visite",
    vis_title: "Vivez l'expérience Gaure",
    vis_adr_t: "Adresse",
    vis_adr_hrs: "Ouvert · Ferme à 18h00",
    vis_tel_t: "Contact",
    vis_tel_form: "Formulaire en ligne",
    vis_deg_t: "Dégustation",
    vis_deg_d: "Venez goûter nos cuvées en salle de dégustation, entre œuvres d'art et barriques… et peut-être croiser Angélique !",
    vis_ig_t: "Instagram",
    vis_ig_d: "Suivez la vie du domaine, les vendanges, les créations et les aventures d'Angélique.",
    ft_sub: "Rouffiac-d'Aude · Languedoc · Biodynamie",
    ft_site: "Site officiel",
    ft_legal: "L'abus d'alcool est dangereux pour la santé.",
    loader_text: "Château de Gaure",
  },
  en: {
    nav_chateau: "The Estate",
    nav_vignoble: "Vineyard",
    nav_cuvees: "Our Wines",
    nav_art: "Art",
    nav_visiter: "Visit",
    hero_eyebrow: "Rouffiac-d'Aude · Languedoc",
    hero_sub: "Where wine becomes a work of art.\nBiodynamics · Art · Terroir.",
    hero_cta1: "Discover our wines",
    hero_cta2: "Plan a visit",
    hero_reviews: "reviews",
    hero_scroll: "Scroll",
    hist_eyebrow: "Our story",
    hist_title: "A thousand years of terroir,\nan artistic imprint",
    hist_p1: "For nearly {20 years}, Gaure has captivated us — inspiring, sheltering and nourishing us so we may leave our mark, the memory of emotions lived. We are rooted in this {nurturing land} that quietly holds {1000 years of history}.",
    hist_p2: "Our wines express that magic — the transformation of a simple fruit into something complex. Art, biodynamics and passion: that is the soul of Château de Gaure.",
    hist_stat1: "years of recent history",
    hist_stat2: "years of terroir",
    hist_stat3: "Google rating",
    hist_stat4: "dynamics certified",
    vig_eyebrow: "Vineyard & Commitment",
    vig_title: "The vine as\na way of life",
    vig_bio_t: "Biodynamics",
    vig_bio_d: "The château practices biodynamic viticulture, respecting lunar cycles and soil life to express the terroir in its purest truth.",
    vig_ter_t: "Our Terroirs",
    vig_ter_d: "Between the Pyrenees and the Mediterranean, the clay-limestone soils of Rouffiac-d'Aude give our wines a unique minerality and remarkable freshness.",
    vig_bio2_t: "Biodiversity",
    vig_bio2_d: "Hedgerows, wildflower meadows, beneficial insects: the estate cultivates a living balance that nourishes the vines without chemical interference.",
    cuv_eyebrow: "Our wines",
    cuv_title: "Wines that tell the story\nof a land and an artist",
    cuv_order: "Shop online",
    cuv_syrah_type: "Red · Campagne",
    cuv_syrah_desc: "A Syrah-Grenache blend, fruity and generous, perfect for everyday convivial meals.",
    cuv_limoux_type: "White · AOP Limoux",
    cuv_limoux_desc: "An exceptional appellation behind this bright, mineral white, a true reflection of the Limoux terroir.",
    cuv_chard_type: "White · Campagne",
    cuv_chard_desc: "A round, indulgent Chardonnay with white fruit aromas, ideal as an aperitif.",
    cuv_languedoc_type: "Red · AOC Languedoc",
    cuv_languedoc_desc: "The estate's signature wine: a structured red, carefully aged, reflecting our Aude terroir.",
    cuv_oppidum_type: "White · Oppidum Cuvée",
    cuv_oppidum_desc: "A cuvée evoking the region's ancient oppidums, a full-bodied white carried by lovely freshness.",
    cuv_pourmonpere_type: "Red · Tribute Cuvée",
    cuv_pourmonpere_desc: "An intimate cuvée dedicated as a tribute, structured and deep, to be savoured with emotion.",
    cuv_alderica_type: "Natural Sparkling · Princesse Aldérica",
    cuv_alderica_desc: "An elegant natural sparkling wine, fine bubbles and bright freshness, signed Château de Gaure.",
    art_eyebrow: "Art at the château",
    art_title: "Pierre Fabre,\nwinemaker and artist",
    art_p1: "At Château de Gaure, art and wine feed each other. The works of {Pierre Fabre} inhabit the castle walls, dialogue with the barrels and transform tasting into a experience.",
    art_p2: "Every bottle is a canvas. Every harvest, a new creation. The estate welcomes artists and art lovers in a unique space between vines and paintings.",
    art_btn: "Explore the artistic world",
    vis_eyebrow: "Plan your visit",
    vis_title: "Live the Gaure experience",
    vis_adr_t: "Address",
    vis_adr_hrs: "Open · Closes at 6:00 PM",
    vis_tel_t: "Contact",
    vis_tel_form: "Online enquiry",
    vis_deg_t: "Wine Tasting",
    vis_deg_d: "Come taste our wines in the tasting room, surrounded by artworks and barrels… and perhaps meet Angélique!",
    vis_ig_t: "Instagram",
    vis_ig_d: "Follow the estate's life: harvests, new creations and Angélique's adventures.",
    ft_sub: "Rouffiac-d'Aude · Languedoc · Biodynamics",
    ft_site: "Official website",
    ft_legal: "Drink responsibly. Alcohol abuse is dangerous for your health.",
    loader_text: "Château de Gaure",
  },
  es: {
    nav_chateau: "El Castillo",
    nav_vignoble: "Viñedo",
    nav_cuvees: "Nuestros Vinos",
    nav_art: "Arte",
    nav_visiter: "Visitar",
    hero_eyebrow: "Rouffiac-d'Aude · Languedoc",
    hero_sub: "Donde el vino se convierte en obra de arte.\nBiodinámica · Arte · Terruño.",
    hero_cta1: "Descubrir nuestros vinos",
    hero_cta2: "Planificar una visita",
    hero_reviews: "reseñas",
    hero_scroll: "Bajar",
    hist_eyebrow: "Nuestra historia",
    hist_title: "Mil años de terruño,\nuna huella artística",
    hist_p1: "Hace casi {20 años} que Gaure nos cautivó; nos inspira, nos alberga y nos nutre para dejar nuestra huella, el recuerdo de emociones vividas. Estamos arraigados en esta {tierra nutricia} que guarda en secreto {1000 años de historia}.",
    hist_p2: "Nuestros vinos expresan esa magia — la transformación de un simple fruto en algo complejo. Arte, biodinámica y pasión: esa es el alma del Château de Gaure.",
    hist_stat1: "años de historia reciente",
    hist_stat2: "años de terruño",
    hist_stat3: "valoración Google",
    hist_stat4: "dinámica certificada",
    vig_eyebrow: "Viñedo y Compromiso",
    vig_title: "La vid como\ncompromiso de vida",
    vig_bio_t: "Biodinámica",
    vig_bio_d: "El castillo practica la viticultura biodinámica, respetando los ciclos lunares y la vida del suelo para expresar el terruño en su más pura verdad.",
    vig_ter_t: "Nuestros Terruños",
    vig_ter_d: "Entre los Pirineos y el Mediterráneo, los suelos arcillo-calcáreos de Rouffiac-d'Aude confieren a nuestros vinos una mineralidad única y una frescura notable.",
    vig_bio2_t: "Biodiversidad",
    vig_bio2_d: "Setos, praderas floridas, insectos auxiliares: el dominio cultiva un equilibrio vivo que nutre la vid sin artificios químicos.",
    cuv_eyebrow: "Nuestros vinos",
    cuv_title: "Vinos que cuentan\nuna tierra y un artista",
    cuv_order: "Comprar en línea",
    cuv_syrah_type: "Tinto · Campagne",
    cuv_syrah_desc: "Ensamblaje Syrah-Grenache, afrutado y generoso, perfecto para las comidas cotidianas en buena compañía.",
    cuv_limoux_type: "Blanco · AOP Limoux",
    cuv_limoux_desc: "Una denominación de excepción para este blanco vivo y mineral, reflejo del terruño de Limoux.",
    cuv_chard_type: "Blanco · Campagne",
    cuv_chard_desc: "Chardonnay redondo y goloso con aromas a fruta blanca, ideal como aperitivo.",
    cuv_languedoc_type: "Tinto · AOC Languedoc",
    cuv_languedoc_desc: "La firma del dominio: un tinto estructurado, criado con esmero, reflejo de nuestro terruño del Aude.",
    cuv_oppidum_type: "Blanco · Cuvée Oppidum",
    cuv_oppidum_desc: "Cuvée que evoca los antiguos oppida de la región, un blanco amplio con una hermosa frescura.",
    cuv_pourmonpere_type: "Tinto · Cuvée Homenaje",
    cuv_pourmonpere_desc: "Una cuvée íntima dedicada como homenaje, estructurada y profunda, para degustar con emoción.",
    cuv_alderica_type: "Espumoso Natural · Princesse Aldérica",
    cuv_alderica_desc: "Un espumoso natural elegante, burbuja fina y frescura radiante, firmado Château de Gaure.",
    art_eyebrow: "El arte en el castillo",
    art_title: "Pierre Fabre,\nvinicultor y artista",
    art_p1: "En el Château de Gaure, el arte y el vino se nutren mutuamente. Las obras de {Pierre Fabre} habitan las paredes del castillo, dialogan con los barriles y transforman la cata en una experiencia.",
    art_p2: "Cada botella es un lienzo. Cada vendimia, una nueva creación. El dominio acoge artistas y amantes del arte en un espacio único entre viñas y pinturas.",
    art_btn: "Descubrir el universo artístico",
    vis_eyebrow: "Planificar una visita",
    vis_title: "Vive la experiencia Gaure",
    vis_adr_t: "Dirección",
    vis_adr_hrs: "Abierto · Cierra a las 18:00",
    vis_tel_t: "Contacto",
    vis_tel_form: "Formulario en línea",
    vis_deg_t: "Cata de vinos",
    vis_deg_d: "Venga a probar nuestros vinos en la sala de cata, entre obras de arte y barricas… ¡y quizá encuentre a Angélique!",
    vis_ig_t: "Instagram",
    vis_ig_d: "Sigue la vida del dominio: vendimias, nuevas creaciones y las aventuras de Angélique.",
    ft_sub: "Rouffiac-d'Aude · Languedoc · Biodinámica",
    ft_site: "Sitio oficial",
    ft_legal: "El abuso del alcohol es peligroso para la salud.",
    loader_text: "Château de Gaure",
  },
} as const;

type TranslationKey = keyof typeof TRANSLATIONS.fr;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "fr",
  setLang: () => {},
});

function useLang() {
  const { lang } = useContext(LangCtx);
  return (key: TranslationKey): string =>
    (TRANSLATIONS[lang] as Record<string, string>)[key] ?? (TRANSLATIONS.fr as Record<string, string>)[key] ?? key;
}

function Rich({ text }: { text: string }) {
  const parts = text.split(/\{([^}]+)\}/g);
  return <>{parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p))}</>;
}

const INSTAGRAM = "https://www.instagram.com/chateau_de_gaure/";
const SITE = "https://chateaudegaure.fr";
const TEL = "06 43 47 36 85";
const ADDR = "DOMAINE DE GAURE, 11250 Rouffiac-d'Aude";

const VineSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 Q30 20 50 35 Q70 50 90 25 Q110 5 130 30 Q150 55 170 30 Q185 15 195 20" stroke="#C8A96E" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <circle cx="50" cy="35" r="3" fill="#C8A96E" opacity="0.6"/>
    <circle cx="90" cy="25" r="2.5" fill="#C8A96E" opacity="0.6"/>
    <circle cx="130" cy="30" r="3" fill="#C8A96E" opacity="0.6"/>
    <circle cx="170" cy="30" r="2.5" fill="#C8A96E" opacity="0.6"/>
    <path d="M50 35 Q55 28 60 22" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M90 25 Q95 18 100 14" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M130 30 Q135 22 140 18" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <ellipse cx="62" cy="18" rx="5" ry="4" fill="#4A5E3A" opacity="0.5"/>
    <ellipse cx="102" cy="11" rx="5" ry="4" fill="#4A5E3A" opacity="0.5"/>
    <ellipse cx="142" cy="15" rx="5" ry="4" fill="#4A5E3A" opacity="0.5"/>
  </svg>
);

const GoldDivider = () => (
  <div className="divider-wrap">
    <span className="divider-line" />
    <span className="divider-diamond">◆</span>
    <span className="divider-line" />
  </div>
);

const easeOut = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, delay = 0, y = 32 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, stagger = 0.12 }: { children: React.ReactNode; stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

function Loader({ onDone }: { onDone: () => void }) {
  const t = useLang();
  useEffect(() => {
    const id = setTimeout(onDone, 2200);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: easeOut } }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="loader-inner"
      >
        <VineSVG className="loader-vine" />
        <motion.h1
          className="loader-title"
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{ letterSpacing: "0.15em", opacity: 1 }}
          transition={{ duration: 1.2, ease: easeOut, delay: 0.2 }}
        >
          {t("loader_text")}
        </motion.h1>
        <motion.div className="loader-bar-track" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <motion.div
            className="loader-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.6, ease: easeOut }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const LANG_LABELS: Record<Lang, string> = { fr: "FR", en: "EN", es: "ES" };
const LANG_FLAGS: Record<Lang, string> = { fr: "🇫🇷", en: "🇬🇧", es: "🇪🇸" };

function LangSwitcher() {
  const { lang, setLang } = useContext(LangCtx);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="lang-switcher" ref={ref}>
      <button className="lang-btn" onClick={() => setOpen(o => !o)} aria-label="Change language">
        <span>{LANG_FLAGS[lang]}</span>
        <span className="lang-code">{LANG_LABELS[lang]}</span>
        <motion.svg width="8" height="5" viewBox="0 0 8 5" fill="none" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <path d="M1 1l3 3 3-3" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round"/>
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang-dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            {(["fr", "en", "es"] as Lang[]).map(l => (
              <li key={l}>
                <button
                  className={`lang-option ${l === lang ? "lang-option--active" : ""}`}
                  onClick={() => { setLang(l); setOpen(false); }}
                >
                  <span>{LANG_FLAGS[l]}</span>
                  <span>{LANG_LABELS[l]}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const SEO_DATA: Record<Lang, {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
}> = {
  fr: {
    title: "Château de Gaure | Vin Biodynamique & Art en Languedoc",
    description: "Découvrez le Château de Gaure à Rouffiac-d'Aude : vins biodynamiques d'exception, œuvres d'art et dégustation au cœur du Languedoc. Note 4,6/5 (50 avis).",
    keywords: [
      "Château de Gaure",
      "vin biodynamique",
      "domaine viticole Aude",
      "Rouffiac-d'Aude",
      "AOP Limoux",
      "AOC Languedoc",
      "dégustation vin Languedoc",
      "cuvée Princesse Aldérica",
      "vignoble art",
      "Pierre Fabre artiste",
      "vin nature pétillant",
    ],
    ogLocale: "fr_FR",
  },
  en: {
    title: "Château de Gaure | Biodynamic Wine & Art in Languedoc",
    description: "Discover Château de Gaure in Rouffiac-d'Aude: exceptional biodynamic wines, artworks and tastings in the heart of Languedoc. Rated 4.6/5 (50 reviews).",
    keywords: [
      "Château de Gaure",
      "biodynamic wine",
      "Aude wine estate",
      "Rouffiac-d'Aude",
      "AOP Limoux",
      "AOC Languedoc",
      "wine tasting Languedoc",
      "Princesse Aldérica cuvée",
      "vineyard art",
      "Pierre Fabre artist",
      "natural sparkling wine",
    ],
    ogLocale: "en_US",
  },
  es: {
    title: "Château de Gaure | Vino Biodinámico y Arte en Languedoc",
    description: "Descubre el Château de Gaure en Rouffiac-d'Aude: vinos biodinámicos excepcionales, obras de arte y catas en el corazón de Languedoc. Valoración 4,6/5 (50 reseñas).",
    keywords: [
      "Château de Gaure",
      "vino biodinámico",
      "dominio vinícola Aude",
      "Rouffiac-d'Aude",
      "AOP Limoux",
      "AOC Languedoc",
      "cata de vino Languedoc",
      "cuvée Princesse Aldérica",
      "viñedo y arte",
      "Pierre Fabre artista",
      "vino espumoso natural",
    ],
    ogLocale: "es_ES",
  },
};

function SEO() {
  const { lang } = useContext(LangCtx);
  const data = SEO_DATA[lang];
  const url = "https://chateaudegaure.fr";

  useEffect(() => {
    document.title = data.title;
    document.documentElement.lang = lang;

    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        const tag = selector.startsWith("link") ? "link" : "meta";
        el = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
        const match = selector.match(/\[(.+?)="(.+?)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };

    setMeta('meta[name="description"]', "content", data.description);
    setMeta('meta[name="keywords"]', "content", data.keywords.join(", "));
    setMeta('meta[name="author"]', "content", "Château de Gaure");
    setMeta('meta[name="robots"]', "content", "index, follow");
    setMeta('link[rel="canonical"]', "href", url);

    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:locale"]', "content", data.ogLocale);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:site_name"]', "content", "Château de Gaure");
    setMeta('meta[property="og:title"]', "content", data.title);
    setMeta('meta[property="og:description"]', "content", data.description);
    setMeta('meta[property="og:image"]', "content", `${url}/og-image.jpg`);
    setMeta('meta[property="og:image:width"]', "content", "1200");
    setMeta('meta[property="og:image:height"]', "content", "630");
    setMeta('meta[property="og:image:alt"]', "content", "Château de Gaure");

    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", data.title);
    setMeta('meta[name="twitter:description"]', "content", data.description);
    setMeta('meta[name="twitter:creator"]', "content", "@chateaudegaure");
    setMeta('meta[name="twitter:image"]', "content", `${url}/og-image.jpg`);

    const ldJson = {
      "@context": "https://schema.org",
      "@type": "Winery",
      "name": "Château de Gaure",
      "image": `${url}/og-image.jpg`,
      "telephone": "+33643473685",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Domaine de Gaure",
        "addressLocality": "Rouffiac-d'Aude",
        "postalCode": "11250",
        "addressCountry": "FR",
      },
      "url": url,
      "sameAs": [INSTAGRAM],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "reviewCount": "50",
      },
    };

    let script = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ldJson);
  }, [lang, data, url]);

  return null;
}

function Nav() {
  const t = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { key: "nav_chateau", href: "#histoire" },
    { key: "nav_vignoble", href: "#vignoble" },
    { key: "nav_cuvees", href: "#cuvees" },
    { key: "nav_art", href: "#art" },
    { key: "nav_visiter", href: "#visiter" },
  ] as const;

  return (
    <motion.nav
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 2.0, ease: easeOut }}
    >
      <a href="#hero" className="nav-logo">
        <span className="nav-logo-ch">CHÂTEAU</span>
        <span className="nav-logo-de"> DE </span>
        <span className="nav-logo-gaure">GAURE</span>
      </a>
      <button className="nav-burger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>{t(l.key)}</a>
          </li>
        ))}
        <li>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="nav-ig">
            <InstagramIcon />
          </a>
        </li>
        <li><LangSwitcher /></li>
      </ul>
    </motion.nav>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function Hero() {
  const t = useLang();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);

  return (
    <section id="hero" className="hero">
      <motion.div className="hero-video-wrap" style={{ scale: heroScale }}>
        <video
          className="hero-video"
          src="/bg-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay" />
      </motion.div>
      <motion.div className="hero-content" style={{ opacity: heroOpacity, y: heroY }}>
        <motion.p className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 2.3, ease: easeOut }}>
          {t("hero_eyebrow")}
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 2.45, ease: easeOut }}>
          <VineSVG className="hero-vine" />
        </motion.div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.55, ease: easeOut }}
        >
          <span>CHÂTEAU</span>
          <span className="hero-title-de">&nbsp;DE&nbsp;</span>
          <span>GAURE</span>
        </motion.h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.75, ease: easeOut }}>
          {t("hero_sub").split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </motion.p>
        <motion.div className="hero-cta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.9, ease: easeOut }}>
          <a href="#cuvees" className="btn btn--gold">{t("hero_cta1")}</a>
          <a href="#visiter" className="btn btn--outline">{t("hero_cta2")}</a>
        </motion.div>
        <motion.div className="hero-stars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 3.05 }}>
          {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
          <span className="hero-rating-num">4,6</span>
          <span className="hero-rating-count">(50 {t("hero_reviews")})</span>
        </motion.div>
      </motion.div>
      <motion.a
        href="#histoire"
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 3.2, duration: 0.6 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3.2 } }}
        style={{ opacity: heroOpacity }}
      >
        <span>{t("hero_scroll")}</span>
        <svg width="14" height="24" viewBox="0 0 14 24"><path d="M7 0v20M1 14l6 6 6-6" stroke="#C8A96E" strokeWidth="1.5" fill="none"/></svg>
      </motion.a>
    </section>
  );
}

function Histoire() {
  const t = useLang();
  const stats = [
    { num: "20", label: t("hist_stat1") },
    { num: "1000", label: t("hist_stat2") },
    { num: "4,6★", label: t("hist_stat3") },
    { num: "Bio", label: t("hist_stat4") },
  ];

  return (
    <section id="histoire" className="section section--cream">
      <div className="container container--narrow">
        <Reveal>
          <p className="eyebrow">{t("hist_eyebrow")}</p>
          <GoldDivider />
          <h2 className="section-title">
            {t("hist_title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="body-text"><Rich text={t("hist_p1")} /></p>
          <p className="body-text" style={{ marginTop: "1.2rem" }}>{t("hist_p2")}</p>
        </Reveal>
        <StaggerGroup>
          <div className="info-grid">
            {stats.map(({ num, label }) => (
              <motion.div key={label} className="info-card" variants={staggerItem} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
                <span className="info-card-num">{num}</span>
                <span className="info-card-label">{label}</span>
              </motion.div>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}

function Vignoble() {
  const t = useLang();
  const items = [
    { icon: "🌿", titleKey: "vig_bio_t", textKey: "vig_bio_d" },
    { icon: "🏔️", titleKey: "vig_ter_t", textKey: "vig_ter_d" },
    { icon: "🦋", titleKey: "vig_bio2_t", textKey: "vig_bio2_d" },
  ] as const;

  return (
    <section id="vignoble" className="section section--dark">
      <div className="container">
        <Reveal>
          <p className="eyebrow eyebrow--light">{t("vig_eyebrow")}</p>
          <GoldDivider />
          <h2 className="section-title section-title--light">
            {t("vig_title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
        </Reveal>
        <StaggerGroup>
          <div className="cards-row">
            {items.map(item => (
              <motion.div key={item.titleKey} className="card card--dark" variants={staggerItem} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
                <span className="card-icon">{item.icon}</span>
                <h3 className="card-title">{t(item.titleKey)}</h3>
                <p className="card-text">{t(item.textKey)}</p>
              </motion.div>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}

function Cuvees() {
  const t = useLang();
  const cuvees = [
    {
      name: "Campagne Syrah Grenache",
      year: "2021",
      img: "/wines/syrah-grenache-campagne.png",
      typeKey: "cuv_syrah_type",
      descKey: "cuv_syrah_desc",
      bg: "#C8923C",
    },
    {
      name: "AOP Limoux",
      year: "2021",
      img: "/wines/aop-limoux.png",
      typeKey: "cuv_limoux_type",
      descKey: "cuv_limoux_desc",
      bg: "#1F9D6E",
    },
    {
      name: "Campagne Chardonnay",
      year: "2021",
      img: "/wines/chardonnay-campagne.png",
      typeKey: "cuv_chard_type",
      descKey: "cuv_chard_desc",
      bg: "#C8923C",
    },
    {
      name: "Languedoc",
      year: "2021",
      img: "/wines/languedoc.png",
      typeKey: "cuv_languedoc_type",
      descKey: "cuv_languedoc_desc",
      bg: "#1F9D6E",
    },
    {
      name: "Oppidum",
      year: "2021",
      img: "/wines/oppidum.png",
      typeKey: "cuv_oppidum_type",
      descKey: "cuv_oppidum_desc",
      bg: "#D9651F",
    },
    {
      name: "Pour Mon Père",
      year: "2021",
      img: "/wines/pour-mon-pere.png",
      typeKey: "cuv_pourmonpere_type",
      descKey: "cuv_pourmonpere_desc",
      bg: "#D9651F",
    },
    {
      name: "Princesse Aldérica",
      year: "2021",
      img: "/wines/princesse-alderica.png",
      typeKey: "cuv_alderica_type",
      descKey: "cuv_alderica_desc",
      bg: "#C0392B",
    },
  ] as const;

  return (
    <section id="cuvees" className="section section--cream">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t("cuv_eyebrow")}</p>
          <GoldDivider />
          <h2 className="section-title">
            {t("cuv_title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
          </h2>
        </Reveal>
        <StaggerGroup stagger={0.1}>
          <div className="cuvees-grid">
            {cuvees.map(c => (
              <motion.div
                key={c.name}
                className="cuvee-card"
                variants={staggerItem}
                whileHover={{ y: -8, boxShadow: "0 12px 36px rgba(92,26,26,0.2)", transition: { duration: 0.3 } }}
              >
                <div className="cuvee-bottle-photo" style={{ background: `radial-gradient(circle at 50% 35%, ${c.bg}33, transparent 70%)` }}>
                  <img src={c.img} alt={`Bouteille ${c.name} ${c.year} Château de Gaure`} loading="lazy" />
                </div>
                <div className="cuvee-body">
                  <p className="cuvee-type">{t(c.typeKey)}</p>
                  <h3 className="cuvee-name">{c.name} <span className="cuvee-year">{c.year}</span></h3>
                  <p className="cuvee-desc">{t(c.descKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerGroup>
        <Reveal delay={300}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href={`${SITE}/boutique/`} target="_blank" rel="noopener noreferrer" className="btn btn--burgundy">
              {t("cuv_order")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ArtSection() {
  const t = useLang();
  return (
    <section id="art" className="section section--burgundy">
      <div className="container container--split">
        <Reveal>
          <div className="split-text">
            <p className="eyebrow eyebrow--light">{t("art_eyebrow")}</p>
            <GoldDivider />
            <h2 className="section-title section-title--light">
              {t("art_title").split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
            </h2>
            <p className="body-text body-text--light"><Rich text={t("art_p1")} /></p>
            <p className="body-text body-text--light" style={{ marginTop: "1rem" }}>{t("art_p2")}</p>
            <a href={`${SITE}/lart-et-le-chateau-de-gaure/`} target="_blank" rel="noopener noreferrer"
               className="btn btn--gold" style={{ marginTop: "2rem", display: "inline-block" }}>
              {t("art_btn")}
            </a>
          </div>
        </Reveal>
        <Reveal delay={200} y={0}>
          <motion.div
            className="split-art"
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <Image
              src="/contents/art-frame.jpg"
              alt="Œuvre d'art dans le Château de Gaure"
              width={300}
              height={320}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function Visiter() {
  const t = useLang();
  return (
    <section id="visiter" className="section section--cream">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{t("vis_eyebrow")}</p>
          <GoldDivider />
          <h2 className="section-title">{t("vis_title")}</h2>
        </Reveal>
        <StaggerGroup>
          <div className="visit-grid">
            <motion.div className="visit-card" variants={staggerItem} whileHover={{ y: -4 }}>
              <div className="visit-icon">📍</div>
              <h3>{t("vis_adr_t")}</h3>
              <p>{ADDR}</p>
              <p style={{ marginTop: "0.5rem", color: "#5C1A1A", fontWeight: 600 }}>{t("vis_adr_hrs")}</p>
            </motion.div>
            <motion.div className="visit-card" variants={staggerItem} whileHover={{ y: -4 }}>
              <div className="visit-icon">📞</div>
              <h3>{t("vis_tel_t")}</h3>
              <a href={`tel:${TEL.replace(/\s/g, "")}`} className="visit-link">{TEL}</a>
              <a href={`${SITE}/contactez-nous/`} target="_blank" rel="noopener noreferrer" className="visit-link">
                {t("vis_tel_form")}
              </a>
            </motion.div>
            <motion.div className="visit-card" variants={staggerItem} whileHover={{ y: -4 }}>
              <div className="visit-icon">🍷</div>
              <h3>{t("vis_deg_t")}</h3>
              <p>{t("vis_deg_d")}</p>
            </motion.div>
            <motion.div className="visit-card" variants={staggerItem} whileHover={{ y: -4 }}>
              <div className="visit-icon"><InstagramIcon /></div>
              <h3>{t("vis_ig_t")}</h3>
              <p>{t("vis_ig_d")}</p>
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
                 className="btn btn--burgundy" style={{ marginTop: "1rem", fontSize: "0.8rem", padding: "0.5rem 1.2rem" }}>
                @chateau_de_gaure
              </a>
            </motion.div>
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}

function Footer() {
  const t = useLang();
  return (
    <footer className="footer">
      <VineSVG className="footer-vine" />
      <div className="footer-brand">
        <span className="footer-title">CHÂTEAU DE GAURE</span>
        <span className="footer-sub">{t("ft_sub")}</span>
      </div>
      <div className="footer-links">
        <a href={SITE} target="_blank" rel="noopener noreferrer">{t("ft_site")}</a>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={`tel:${TEL.replace(/\s/g,"")}`}>{TEL}</a>
      </div>
      <p className="footer-legal">© 2026 Château de Gaure · {t("ft_legal")}</p>
    </footer>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --burgundy: #5C1A1A;
    --gold: #C8A96E;
    --stone: #F5F0E8;
    --cream: #EDE6D6;
    --dark: #1C1C1C;
    --sage: #4A5E3A;
    --sage-light: #E8EDE3;
    --text: #2A1A0E;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Raleway', sans-serif; font-weight: 300; color: var(--text); background: var(--stone); overflow-x: hidden; }

  .loader {
    position: fixed; inset: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(145deg, #2A0808 0%, #1C0505 50%, #1C1C1C 100%);
  }
  .loader-inner { text-align: center; }
  .loader-vine { width: 180px; margin: 0 auto 1.5rem; display: block; }
  .loader-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem,4vw,2.4rem); color: var(--stone); font-weight: 300; margin-bottom: 2rem; }
  .loader-bar-track { width: 180px; height: 1px; background: rgba(245,240,232,0.2); margin: 0 auto; overflow: hidden; }
  .loader-bar-fill { width: 100%; height: 100%; background: var(--gold); transform-origin: left; }

  .lang-switcher { position: relative; }
  .lang-btn { display: flex; align-items: center; gap: 0.35rem; background: none; border: 1px solid rgba(200,169,110,0.35); cursor: pointer; color: var(--stone); padding: 0.25rem 0.6rem; border-radius: 2px; font-family: 'Raleway', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.1em; transition: border-color 0.2s, color 0.2s; }
  .lang-btn:hover { border-color: var(--gold); color: var(--gold); }
  .lang-code { text-transform: uppercase; }
  .lang-dropdown { position: absolute; top: calc(100% + 6px); right: 0; background: #1A0505; border: 1px solid rgba(200,169,110,0.3); list-style: none; min-width: 90px; z-index: 200; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
  .lang-option { display: flex; align-items: center; gap: 0.5rem; width: 100%; background: none; border: none; cursor: pointer; color: rgba(245,240,232,0.7); padding: 0.55rem 0.85rem; font-family: 'Raleway', sans-serif; font-size: 0.75rem; font-weight: 400; letter-spacing: 0.1em; transition: background 0.15s, color 0.15s; text-align: left; }
  .lang-option:hover { background: rgba(200,169,110,0.1); color: var(--gold); }
  .lang-option--active { color: var(--gold); font-weight: 600; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 3rem; transition: background 0.4s, padding 0.4s, box-shadow 0.4s; }
  .nav--scrolled { background: rgba(28,10,10,0.96); padding: 0.8rem 3rem; box-shadow: 0 2px 20px rgba(0,0,0,0.35); backdrop-filter: blur(8px); }
  .nav-logo { text-decoration: none; letter-spacing: 0.15em; font-size: 0.95rem; color: var(--stone); }
  .nav-logo-ch, .nav-logo-gaure { font-weight: 600; color: var(--gold); }
  .nav-logo-de { font-weight: 300; color: var(--stone); }
  .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
  .nav-links a { color: var(--stone); text-decoration: none; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 400; transition: color 0.2s; opacity: 0.85; }
  .nav-links a:hover { color: var(--gold); opacity: 1; }
  .nav-ig { display: flex; align-items: center; }
  .nav-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
  .nav-burger span { display: block; width: 24px; height: 1.5px; background: var(--stone); }
  @media (max-width: 900px) {
    .nav { padding: 1rem 1.5rem; background: rgba(28,10,10,0.92); }
    .nav-burger { display: flex; }
    .nav-links { display: none; flex-direction: column; gap: 1.5rem; position: absolute; top: 100%; left: 0; right: 0; background: rgba(28,10,10,0.97); padding: 2rem; }
    .nav-links--open { display: flex; }
  }

  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; background: linear-gradient(145deg, #2A0808 0%, #1C0505 40%, #3A1A0A 70%, #1C1C1C 100%); }
  .hero-video-wrap { position: absolute; inset: 0; overflow: hidden; }
  .hero-video { width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .hero-video-overlay {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg, rgba(28,8,8,0.55) 0%, rgba(28,8,8,0.35) 40%, rgba(20,6,6,0.75) 100%),
      radial-gradient(ellipse 60% 50% at 70% 30%, rgba(200,169,110,0.10) 0%, transparent 70%);
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-video { display: none; }
    .hero-video-wrap { background: linear-gradient(145deg, #2A0808 0%, #1C0505 40%, #3A1A0A 70%, #1C1C1C 100%); }
  }
  .hero-content { position: relative; z-index: 1; text-align: center; padding: 2rem 1.5rem; max-width: 700px; }
  .hero-eyebrow { color: var(--gold); font-size: 0.72rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1.5rem; font-weight: 400; }
  .hero-vine { width: 200px; margin: 0 auto 1.5rem; display: block; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(3rem,9vw,7rem); font-weight: 300; color: var(--stone); letter-spacing: 0.08em; line-height: 1; margin-bottom: 1.5rem; }
  .hero-title-de { color: var(--gold); font-style: italic; }
  .hero-sub { color: rgba(245,240,232,0.7); font-size: clamp(0.9rem,2vw,1.05rem); letter-spacing: 0.06em; margin-bottom: 2.5rem; line-height: 1.7; }
  .hero-cta-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .hero-stars { color: var(--gold); font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.3rem; }
  .hero-rating-num { color: var(--stone); font-weight: 600; margin-left: 0.3rem; }
  .hero-rating-count { color: rgba(245,240,232,0.5); font-size: 0.75rem; }
  .hero-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: var(--gold); text-decoration: none; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; }

  .btn { display: inline-block; text-decoration: none; cursor: pointer; border: none; font-family: 'Raleway', sans-serif; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.85rem 2rem; transition: all 0.25s; }
  .btn--gold { background: var(--gold); color: var(--dark); }
  .btn--gold:hover { background: #D4B97A; box-shadow: 0 4px 20px rgba(200,169,110,0.4); transform: translateY(-1px); }
  .btn--outline { background: transparent; color: var(--stone); border: 1px solid rgba(245,240,232,0.5); }
  .btn--outline:hover { border-color: var(--gold); color: var(--gold); }
  .btn--burgundy { background: var(--burgundy); color: var(--cream); }
  .btn--burgundy:hover { background: #701F1F; transform: translateY(-1px); }

  .section { padding: 6rem 1.5rem; }
  .section--cream { background: var(--cream); }
  .section--dark { background: var(--dark); }
  .section--burgundy { background: var(--burgundy); }
  .section--sage { background: var(--sage-light); }
  .container { max-width: 1100px; margin: 0 auto; }
  .container--narrow { max-width: 780px; margin: 0 auto; }
  .container--split { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  @media (max-width: 768px) { .container--split { grid-template-columns: 1fr; gap: 2.5rem; } }

  .divider-wrap { display: flex; align-items: center; gap: 1rem; margin: 1.2rem 0; }
  .divider-line { flex: 1; height: 1px; background: var(--gold); opacity: 0.4; }
  .divider-diamond { color: var(--gold); font-size: 0.6rem; opacity: 0.8; }

  .eyebrow { font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 0.5rem; }
  .eyebrow--light { color: var(--gold); }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem,4.5vw,3.2rem); font-weight: 300; line-height: 1.2; margin: 1rem 0 2rem; color: var(--text); }
  .section-title--light { color: var(--stone); }
  .body-text { font-size: 1rem; line-height: 1.8; color: #3A2A1E; font-weight: 300; }
  .body-text strong { font-weight: 600; color: var(--burgundy); }
  .body-text--light { color: rgba(245,240,232,0.8); }
  .body-text--light strong { color: var(--gold); }

  .info-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; margin-top: 3rem; }
  @media (max-width: 600px) { .info-grid { grid-template-columns: repeat(2,1fr); } }
  .info-card { text-align: center; padding: 1.8rem 1rem; border: 1px solid rgba(200,169,110,0.3); background: rgba(255,255,255,0.4); }
  .info-card-num { display: block; font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 600; color: var(--burgundy); }
  .info-card-label { font-size: 0.75rem; letter-spacing: 0.1em; color: #6A5A50; text-transform: uppercase; }

  .cards-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 2rem; margin-top: 3rem; }
  @media (max-width: 768px) { .cards-row { grid-template-columns: 1fr; } }
  .card { padding: 2.5rem 2rem; }
  .card--dark { border: 1px solid rgba(200,169,110,0.2); background: rgba(255,255,255,0.04); }
  .card-icon { font-size: 2rem; display: block; margin-bottom: 1rem; }
  .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--gold); margin-bottom: 0.8rem; font-weight: 400; }
  .card-text { color: rgba(245,240,232,0.7); font-size: 0.9rem; line-height: 1.8; }

  .cuvees-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.8rem; margin-top: 3rem; }
  @media (max-width: 1000px) { .cuvees-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 560px) { .cuvees-grid { grid-template-columns: 1fr; } }
  .cuvee-card { background: var(--stone); border: 1px solid rgba(92,26,26,0.15); display: flex; flex-direction: column; align-items: center; padding: 2rem 1.2rem; }
  .cuvee-bottle-photo { width: 100%; height: 220px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; border-radius: 4px; }
  .cuvee-bottle-photo img { height: 100%; width: auto; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.25)); }
  .cuvee-body { text-align: center; }
  .cuvee-type { font-size: 0.66rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
  .cuvee-name { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 600; color: var(--burgundy); }
  .cuvee-year { font-weight: 300; font-size: 1.05rem; color: #8A6A5A; }
  .cuvee-desc { font-size: 0.84rem; line-height: 1.65; color: #5A4A40; margin-top: 0.6rem; }

  .split-art { display: flex; justify-content: center; align-items: center; }

  .angelique-wrap { display: grid; grid-template-columns: 200px 1fr; gap: 3rem; align-items: start; }
  @media (max-width: 600px) { .angelique-wrap { grid-template-columns: 1fr; } }
  .angelique-bird { display: flex; justify-content: center; }

  .visit-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5rem; margin-top: 3rem; }
  @media (max-width: 900px) { .visit-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 500px) { .visit-grid { grid-template-columns: 1fr; } }
  .visit-card { background: var(--stone); border: 1px solid rgba(92,26,26,0.12); padding: 2rem 1.5rem; }
  .visit-icon { font-size: 1.8rem; margin-bottom: 0.8rem; }
  .visit-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: var(--burgundy); margin-bottom: 0.6rem; font-weight: 600; }
  .visit-card p { font-size: 0.9rem; line-height: 1.7; color: #5A4A40; }
  .visit-link { color: var(--burgundy); font-size: 0.9rem; text-decoration: none; font-weight: 500; display: block; margin-top: 0.4rem; }
  .visit-link:hover { color: var(--gold); }

  .footer { background: #120404; color: var(--stone); padding: 4rem 2rem 2rem; text-align: center; }
  .footer-vine { width: 240px; margin: 0 auto 2rem; display: block; }
  .footer-brand { margin-bottom: 1.5rem; }
  .footer-title { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; letter-spacing: 0.2em; color: var(--gold); }
  .footer-sub { display: block; font-size: 0.72rem; letter-spacing: 0.15em; color: rgba(245,240,232,0.5); margin-top: 0.4rem; }
  .footer-links { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .footer-links a { color: rgba(245,240,232,0.6); text-decoration: none; font-size: 0.8rem; letter-spacing: 0.1em; transition: color 0.2s; }
  .footer-links a:hover { color: var(--gold); }
  .footer-legal { font-size: 0.68rem; color: rgba(245,240,232,0.3); letter-spacing: 0.05em; }
`;

export default function App() {
  const [lang, setLang] = useState<Lang>("fr");
  const [loading, setLoading] = useState(true);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <SEO />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>
      <Nav />
      <Hero />
      <Histoire />
      <Vignoble />
      <Cuvees />
      <ArtSection />
      <Visiter />
      <Footer />
    </LangCtx.Provider>
  );
}