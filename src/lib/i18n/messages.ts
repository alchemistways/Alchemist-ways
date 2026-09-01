/**
 * Landing copy catalogs — EN (FINAL PDF) + Canadian French (fr-CA).
 * Brand / book title kept in English where they are product names.
 */

export type MovementCopy = {
  key: string;
  label: string;
  short: string;
  body: string;
  explore: string;
};

export type Messages = {
  meta: {
    title: string;
    description: string;
  };
  common: {
    readMore: string;
    readLess: string;
  };
  a11y: {
    language: string;
    openMenu: string;
    closeMenu: string;
    dismissMenu: string;
    primaryNav: string;
    mobileNav: string;
    mapMovements: string;
    mapProgress: (current: number, total: number) => string;
    previous: string;
    nextMovement: string;
    goToStage: (label: string) => string;
  };
  nav: {
    map: string;
    book: string;
    conversations: string;
    about: string;
    clarityCall: string;
  };
  hero: {
    line1: string;
    line2: string;
    subline: string[];
    exploreMap: string;
    getBook: string;
    bookAlt: string;
  };
  protect: {
    title: string;
    perhapsBy: string;
    ways: readonly string[];
    lede: string;
  };
  whyProtect: {
    title: string;
    p1: string;
    p2Before: string;
    p2Quote: string;
    rails: readonly string[];
    p3: string;
    pull: string;
    p4: string;
  };
  meet: {
    title: string;
    perhapsWith: string;
    ways: readonly string[];
    lede: string;
    whyTitle: string;
    whyLede: string;
    shapes: readonly string[];
    pull: string;
  };
  mapBridge: {
    title: string;
  };
  map: {
    eyebrow: string;
    title: string;
    lede: string;
    invitationLine: string;
    scrollHint: string;
    clickStep: (n: number) => string;
    walk: string;
    continue: string;
    movements: readonly MovementCopy[];
  };
  about: {
    eyebrow: string;
    portraitAlt: string;
    verses: readonly (readonly string[])[];
    displayVerseIndex: number;
    signoff: string;
  };
  invitation: {
    eyebrow: string;
    lines: readonly string[];
    closer: readonly string[];
  };
  begin: {
    title: string;
    bookEyebrow: string;
    bookTitle: string;
    bookSub: string;
    bookVerse: readonly string[];
    bookCta: string;
    conversationsEyebrow: string;
    conversationsVerse: readonly string[];
    conversationsCta: string;
    clarityEyebrow: string;
    clarityVerse: readonly string[];
    clarityTone: readonly string[];
    clarityCta: string;
    clarityOpt1: string;
    clarityOpt2: string;
    communityEyebrow: string;
    communityVerse: readonly string[];
    communityCta: string;
  };
  final: {
    lines: readonly string[];
    tagline: string;
  };
  discover: {
    linkLabel: string;
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    back: string;
  };
  footer: {
    rights: string;
  };
};

export const en: Messages = {
  meta: {
    title: "Alchemist Ways — Meet Yourself, Differently.",
    description: "A map from emotional reactivity to creative agency",
  },
  common: {
    readMore: "Read more",
    readLess: "Read less",
  },
  a11y: {
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    dismissMenu: "Dismiss menu",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    mapMovements: "Alchemist Ways map movements",
    mapProgress: (current, total) => `Map movement ${current} of ${total}`,
    previous: "Previous",
    nextMovement: "Next movement",
    goToStage: (label) => `Go to ${label}`,
  },
  nav: {
    map: "The Map",
    book: "The Book",
    conversations: "Conversations",
    about: "About",
    clarityCall: "Book a Clarity Call",
  },
  hero: {
    line1: "Meet Yourself,",
    line2: "Differently.",
    subline: ["A map", "from emotional reactivity", "to creative agency"],
    exploreMap: "Explore the Map",
    getBook: "Get the Book",
    bookAlt: "Meet Yourself, Differently. Alchemist Ways hardcover",
  },
  protect: {
    title: "How did you learn to protect yourself?",
    perhapsBy: "Perhaps by…",
    ways: [
      "Staying quiet.",
      "Being perfect.",
      "Being defensive.",
      "Avoiding vulnerability.",
      "People-pleasing.",
      "Controlling.",
      "Hiding.",
      "withdrawing.",
      "Being independent.",
      "Shutting down.",
    ],
    lede: "Without even knowing it, these ways of protecting yourself may once have helped you navigate the environment in which they developed.",
  },
  whyProtect: {
    title: "Why did I learn to do that?",
    p1: "The ways you learned to protect yourself were shaped by what your system learned was safest.",
    p2Before: "Growing up, your mind and body were continually learning:",
    p2Quote: "“Given the world I’m experiencing, what is the safest way to be?”",
    rails: [
      "Maybe staying quiet kept connection.",
      "Maybe perfection brought approval.",
      "Maybe people-pleasing kept the peace.",
      "Maybe independence protected vulnerability.",
      "Maybe shutting down made overwhelming feelings more manageable.",
    ],
    p3: "These responses weren’t random. They helped you navigate the world you were in.",
    pull: "The problem is not that protection exists. It’s that ways of protecting yourself can become automatic—and continue shaping how you meet life even when the circumstances around you have changed.",
    p4: "What once helped you adapt to the world as a child may no longer be how you want to meet yourself—and life—as an adult.",
  },
  meet: {
    title: "And how did you learn to meet yourself?",
    perhapsWith: "Perhaps with…",
    ways: [
      "Self-doubt.",
      "Self-judgment.",
      "Shame.",
      "Comparison.",
      "Holding back parts of yourself.",
      "Self-abandonment.",
      "Never quite feeling enough.",
    ],
    lede: "These patterns didn’t only shape how you met the world. They shaped how you learned to meet yourself.",
    whyTitle: "Why does the way I meet myself matter?",
    whyLede: "Because the relationship you have with yourself shapes how you meet everything else.",
    shapes: [
      "Your emotions.",
      "Your thoughts.",
      "Your body.",
      "Your relationships.",
      "Your work.",
      "Your creativity.",
      "Your life.",
    ],
    pull: "What protects you also shapes what becomes possible.",
  },
  mapBridge: {
    title: "What if you could meet yourself differently?",
  },
  map: {
    eyebrow: "The Map",
    title: "From Emotional Reactivity to Creative Agency",
    lede: "A map that reveals what has quietly been shaping your inner experience — and how your relationship to it can change.",
    invitationLine: "Alchemist Ways is an invitation to meet yourself, differently.",
    scrollHint: "Five movements from Emotional Reactivity to Creative Agency.",
    clickStep: (n) => `Click a step · 1–${n}`,
    walk: "Walk the map ↓",
    continue: "Continue ↓",
    movements: [
      {
        key: "reactivity",
        label: "Reactivity",
        short: "Automatic",
        body: "The pattern is happening before you can see it.",
        explore: "Explore Reactivity",
      },
      {
        key: "awareness",
        label: "Awareness",
        short: "Visible",
        body: "What was automatic becomes something you can observe.",
        explore: "Explore Awareness",
      },
      {
        key: "integration",
        label: "Integration",
        short: "Met",
        body: "What became visible can be met differently.",
        explore: "Explore Integration",
      },
      {
        key: "sovereignty",
        label: "Sovereignty",
        short: "Choosable",
        body: "What once chose for you no longer has to determine your response.",
        explore: "Explore Sovereignty",
      },
      {
        key: "agency",
        label: "Creative Agency",
        short: "Available",
        body: "Energy once organized around protection becomes increasingly available for life.",
        explore: "Explore Creative Agency",
      },
    ],
  },
  about: {
    eyebrow: "About Malek",
    portraitAlt: "Malek Najm Ghaleb",
    displayVerseIndex: 2,
    verses: [
      [
        "For years,",
        "I thought I was searching",
        "for freedom.",
        "Validation.",
        "Creativity.",
        "Love.",
      ],
      [
        "Yet beneath all those desires",
        "was something quieter.",
        "Something",
        "I couldn’t yet see.",
      ],
      ["I was searching", "for inner safety."],
      [
        "Not physical safety.",
        "The kind of inner safety",
        "that allows someone",
        "to express themselves honestly.",
        "To create art",
        "without constantly second-guessing themselves.",
        "To speak",
        "without silently holding back.",
        "To live",
        "instead of performing.",
      ],
      [
        "At the time,",
        "I couldn’t see beyond",
        "my conditioning.",
        "I only knew",
        "that despite my strengths,",
        "my ambitions,",
        "and my creativity,",
        "much of my life felt shaped by fear,",
        "self-doubt,",
        "shame,",
        "anxiety,",
        "and emotional reactivity.",
      ],
      [
        "Eventually,",
        "life slowed me down enough",
        "to ask",
        "a different question.",
        "Not,",
        "“How do I fix myself?”",
        "But…",
        "“What is this experience trying to communicate?”",
      ],
      [
        "The Map emerged slowly.",
        "Through observation.",
        "Practice.",
        "Discomfort.",
        "Radical honesty.",
        "And through the privilege",
        "of walking beside others",
        "doing the same.",
      ],
    ],
    signoff: "— Malek Najm Ghaleb",
  },
  invitation: {
    eyebrow: "An Invitation",
    lines: [
      "Remain curious.",
      "Explore the Map.",
      "Test it",
      "against your own experience.",
      "Keep what is true.",
      "Leave what isn’t.",
    ],
    closer: [
      "Alchemist Ways is an invitation—",
      "not to become someone else—",
      "but to discover",
      "a different relationship",
      "with yourself.",
    ],
  },
  begin: {
    title: "There Are Several Ways to Begin",
    bookEyebrow: "The Book",
    bookTitle: "Meet Yourself, Differently.",
    bookSub: "A Map from Emotional Reactivity to Creative Agency.",
    bookVerse: ["Begin here", "if you’d like to explore the work", "quietly,", "at your own pace."],
    bookCta: "Explore the Book",
    conversationsEyebrow: "Conversations",
    conversationsVerse: [
      "Watch the philosophy",
      "come alive",
      "through reflections,",
      "teachings,",
      "and real conversations.",
    ],
    conversationsCta: "Watch Conversations",
    clarityEyebrow: "A Clarity Call",
    clarityVerse: [
      "An honest conversation",
      "about where you are,",
      "what patterns",
      "keep repeating,",
      "and whether this work",
      "feels like",
      "the right next step.",
    ],
    clarityTone: [
      "No pressure.",
      "No performance.",
      "Just curiosity, generous listening, care,",
      "and thoughtful inquiry.",
    ],
    clarityCta: "Book a Clarity Call",
    clarityOpt1: "Option 1. Clarity Conversation (Free · 30 min)",
    clarityOpt2: "Option 2. Clarity Session (Paid · 90 min)",
    communityEyebrow: "The Community",
    communityVerse: [
      "Walk alongside others",
      "learning to meet",
      "their inner lives",
      "with greater awareness,",
      "honesty,",
      "and choice.",
    ],
    communityCta: "Explore the Community",
  },
  final: {
    lines: [
      "Start where you are.",
      "Bring your curiosity.",
      "The rest",
      "will unfold naturally.",
      "Keep what is true.",
      "Leave what isn’t.",
    ],
    tagline: "A practical map from Emotional Reactivity to Creative Agency.",
  },
  discover: {
    linkLabel: "Discover more",
    metaTitle: "Discover — Alchemist Ways",
    metaDescription: "The full Alchemist Ways narrative — the book, and the ways to begin.",
    eyebrow: "Discover",
    title: "Discover more",
    back: "Back to home",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

/** Canadian French — intimate coaching tone; brand + book title stay EN. */
export const frCA: Messages = {
  meta: {
    title: "Alchemist Ways — Meet Yourself, Differently.",
    description: "Une carte de la réactivité émotionnelle à l’agentivité créative",
  },
  common: {
    readMore: "Lire la suite",
    readLess: "Réduire",
  },
  a11y: {
    language: "Langue",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    dismissMenu: "Fermer le menu",
    primaryNav: "Navigation principale",
    mobileNav: "Navigation mobile",
    mapMovements: "Mouvements de la carte Alchemist Ways",
    mapProgress: (current, total) => `Mouvement ${current} sur ${total}`,
    previous: "Précédent",
    nextMovement: "Mouvement suivant",
    goToStage: (label) => `Aller à ${label}`,
  },
  nav: {
    map: "La Carte",
    book: "Le Livre",
    conversations: "Conversations",
    about: "À propos",
    clarityCall: "Réserver un appel Clarté",
  },
  hero: {
    line1: "Meet Yourself,",
    line2: "Differently.",
    subline: ["Une carte", "de la réactivité émotionnelle", "à l’agentivité créative"],
    exploreMap: "Explorer la Carte",
    getBook: "Obtenir le livre",
    bookAlt: "Meet Yourself, Differently. Livre cartonné Alchemist Ways",
  },
  protect: {
    title: "Comment as-tu appris à te protéger?",
    perhapsBy: "Peut-être en…",
    ways: [
      "En restant silencieux.",
      "En étant parfait.",
      "En étant sur la défensive.",
      "En évitant la vulnérabilité.",
      "En faisant plaisir à tout le monde.",
      "En contrôlant.",
      "En te cachant.",
      "En te retirant.",
      "En restant indépendant.",
      "En te fermant.",
    ],
    lede: "Sans même le savoir, ces façons de te protéger t’ont peut-être jadis aidé à naviguer l’environnement dans lequel elles se sont formées.",
  },
  whyProtect: {
    title: "Pourquoi ai-je appris à faire ça?",
    p1: "Les façons dont tu as appris à te protéger ont été façonnées par ce que ton système a appris comme étant le plus sûr.",
    p2Before: "En grandissant, ton esprit et ton corps apprenaient sans cesse :",
    p2Quote: "« Dans le monde que je vis, quelle est la façon la plus sûre d’être? »",
    rails: [
      "Peut-être que rester silencieux maintenait le lien.",
      "Peut-être que la perfection apportait l’approbation.",
      "Peut-être que faire plaisir à tout le monde préservait la paix.",
      "Peut-être que l’indépendance protégeait la vulnérabilité.",
      "Peut-être que te fermer rendait les émotions écrasantes plus gérables.",
    ],
    p3: "Ces réponses n’étaient pas aléatoires. Elles t’ont aidé à naviguer le monde dans lequel tu étais.",
    pull: "Le problème n’est pas que la protection existe. C’est que les façons de te protéger peuvent devenir automatiques — et continuer à façonner ta façon de rencontrer la vie, même quand les circonstances autour de toi ont changé.",
    p4: "Ce qui t’a jadis aidé à t’adapter au monde enfant n’est peut-être plus la façon dont tu veux te rencontrer — et rencontrer la vie — en tant qu’adulte.",
  },
  meet: {
    title: "Et comment as-tu appris à te rencontrer?",
    perhapsWith: "Peut-être avec…",
    ways: [
      "Le doute de soi.",
      "Le jugement de soi.",
      "La honte.",
      "La comparaison.",
      "En retenant des parts de toi.",
      "L’abandon de soi.",
      "En ne te sentant jamais tout à fait assez.",
    ],
    lede: "Ces schémas n’ont pas seulement façonné ta façon de rencontrer le monde. Ils ont façonné comment tu as appris à te rencontrer.",
    whyTitle: "Pourquoi la façon dont je me rencontre compte-t-elle?",
    whyLede:
      "Parce que la relation que tu as avec toi-même façonne ta façon de rencontrer tout le reste.",
    shapes: [
      "Tes émotions.",
      "Tes pensées.",
      "Ton corps.",
      "Tes relations.",
      "Ton travail.",
      "Ta créativité.",
      "Ta vie.",
    ],
    pull: "Ce qui te protège façonne aussi ce qui devient possible.",
  },
  mapBridge: {
    title: "Et si tu pouvais te rencontrer autrement?",
  },
  map: {
    eyebrow: "La Carte",
    title: "De la réactivité émotionnelle à l’agentivité créative",
    lede: "Une carte qui révèle ce qui façonne discrètement ton expérience intérieure — et comment ta relation à cela peut changer.",
    invitationLine: "Alchemist Ways est une invitation à te rencontrer autrement.",
    scrollHint: "Cinq mouvements, de la réactivité émotionnelle à l’agentivité créative.",
    clickStep: (n) => `Clique un pas · 1–${n}`,
    walk: "Parcourir la carte ↓",
    continue: "Continuer ↓",
    movements: [
      {
        key: "reactivity",
        label: "Réactivité",
        short: "Automatique",
        body: "Le schéma se produit avant même que tu puisses le voir.",
        explore: "Explorer la Réactivité",
      },
      {
        key: "awareness",
        label: "Conscience",
        short: "Visible",
        body: "Ce qui était automatique devient quelque chose que tu peux observer.",
        explore: "Explorer la Conscience",
      },
      {
        key: "integration",
        label: "Intégration",
        short: "Accueilli",
        body: "Ce qui est devenu visible peut être rencontré autrement.",
        explore: "Explorer l’Intégration",
      },
      {
        key: "sovereignty",
        label: "Souveraineté",
        short: "Choisisable",
        body: "Ce qui choisissait autrefois pour toi n’a plus à déterminer ta réponse.",
        explore: "Explorer la Souveraineté",
      },
      {
        key: "agency",
        label: "Agentivité créative",
        short: "Disponible",
        body: "L’énergie jadis organisée autour de la protection devient de plus en plus disponible pour la vie.",
        explore: "Explorer l’agentivité créative",
      },
    ],
  },
  about: {
    eyebrow: "À propos de Malek",
    portraitAlt: "Malek Najm Ghaleb",
    displayVerseIndex: 2,
    verses: [
      [
        "Pendant des années,",
        "je croyais chercher",
        "la liberté.",
        "La validation.",
        "La créativité.",
        "L’amour.",
      ],
      [
        "Pourtant, sous tous ces désirs,",
        "il y avait quelque chose de plus silencieux.",
        "Quelque chose",
        "que je ne pouvais pas encore voir.",
      ],
      ["Je cherchais", "une sécurité intérieure."],
      [
        "Pas une sécurité physique.",
        "Le genre de sécurité intérieure",
        "qui permet à quelqu’un",
        "de s’exprimer avec honnêteté.",
        "De créer de l’art",
        "sans se remettre sans cesse en doute.",
        "De parler",
        "sans se retenir en silence.",
        "De vivre",
        "plutôt que de jouer un rôle.",
      ],
      [
        "À l’époque,",
        "je ne pouvais pas voir au-delà",
        "de mon conditionnement.",
        "Je savais seulement",
        "qu’en dépit de mes forces,",
        "de mes ambitions,",
        "et de ma créativité,",
        "une grande part de ma vie semblait façonnée par la peur,",
        "le doute de soi,",
        "la honte,",
        "l’anxiété,",
        "et la réactivité émotionnelle.",
      ],
      [
        "Finalement,",
        "la vie m’a assez ralenti",
        "pour poser",
        "une autre question.",
        "Pas,",
        "« Comment me réparer? »",
        "Mais…",
        "« Qu’est-ce que cette expérience essaie de communiquer? »",
      ],
      [
        "La Carte a émergé lentement.",
        "Par l’observation.",
        "La pratique.",
        "Le malaise.",
        "Une honnêteté radicale.",
        "Et grâce au privilège",
        "de marcher aux côtés d’autres",
        "qui faisaient de même.",
      ],
    ],
    signoff: "— Malek Najm Ghaleb",
  },
  invitation: {
    eyebrow: "Une invitation",
    lines: [
      "Reste curieux.",
      "Explore la Carte.",
      "Teste-la",
      "à l’aune de ton expérience.",
      "Garde ce qui est vrai.",
      "Laisse ce qui ne l’est pas.",
    ],
    closer: [
      "Alchemist Ways est une invitation —",
      "non pas à devenir quelqu’un d’autre —",
      "mais à découvrir",
      "une autre relation",
      "avec toi-même.",
    ],
  },
  begin: {
    title: "Il y a plusieurs façons de commencer",
    bookEyebrow: "Le Livre",
    bookTitle: "Meet Yourself, Differently.",
    bookSub: "Une carte de la réactivité émotionnelle à l’agentivité créative.",
    bookVerse: ["Commence ici", "si tu veux explorer le travail", "en silence,", "à ton rythme."],
    bookCta: "Explorer le livre",
    conversationsEyebrow: "Conversations",
    conversationsVerse: [
      "Vois la philosophie",
      "prendre vie",
      "à travers des réflexions,",
      "des enseignements,",
      "et de vraies conversations.",
    ],
    conversationsCta: "Voir les conversations",
    clarityEyebrow: "Un appel Clarté",
    clarityVerse: [
      "Une conversation honnête",
      "sur où tu en es,",
      "quels schémas",
      "se répètent,",
      "et si ce travail",
      "semble être",
      "le bon prochain pas.",
    ],
    clarityTone: [
      "Sans pression.",
      "Sans performance.",
      "Juste de la curiosité, une écoute généreuse, du soin,",
      "et une exploration attentive.",
    ],
    clarityCta: "Réserver un appel Clarté",
    clarityOpt1: "Option 1. Conversation Clarté (Gratuit · 30 min)",
    clarityOpt2: "Option 2. Séance Clarté (Payant · 90 min)",
    communityEyebrow: "La communauté",
    communityVerse: [
      "Marche aux côtés d’autres",
      "qui apprennent à rencontrer",
      "leur vie intérieure",
      "avec plus de conscience,",
      "d’honnêteté,",
      "et de choix.",
    ],
    communityCta: "Explorer la communauté",
  },
  final: {
    lines: [
      "Commence où tu es.",
      "Apporte ta curiosité.",
      "Le reste",
      "se déploiera naturellement.",
      "Garde ce qui est vrai.",
      "Laisse ce qui ne l’est pas.",
    ],
    tagline: "Une carte concrète de la réactivité émotionnelle à l’agentivité créative.",
  },
  discover: {
    linkLabel: "Découvrir davantage",
    metaTitle: "Découvrir — Alchemist Ways",
    metaDescription: "Le récit complet d’Alchemist Ways — le livre et les façons de commencer.",
    eyebrow: "Découvrir",
    title: "Découvrir davantage",
    back: "Retour à l’accueil",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
};

export const catalogs: Record<"en" | "fr", Messages> = {
  en,
  fr: frCA,
};
