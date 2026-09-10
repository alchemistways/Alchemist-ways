import type { Lang } from "./language";

type Node = { n: string; title: string; sub: string };

export type Content = {
  nav: { map: string; book: string; podcast: string; about: string; begin: string; menu: string; close: string };
  hero: { title: string; tagline: string; ctaBook: string; ctaMap: string; bookAlt: string };
  mapNodes: Node[];
  stageNodes: Node[];
  availableNodes: Node[];
  protection: {
    eyebrow: string;
    heading: string;
    items: { name: string; line: string; words: string }[];
    closing: string;
    closingEyebrow: string;
  };
  childhood: {
    lead: string;
    line2: string;
    line3: string;
    question: string;
    maybes: string[];
    closing: string;
  };
  automatic: {
    pairs: [string, string][];
    pattern: string;
    heading: string;
    closing: string;
  };
  map: {
    title: string;
    tagline: string;
    stages: { n: string; title: string; sub: string; body: string }[];
    cta: string;
  };
  available: {
    heading: string;
    capacityEyebrow: string;
    capacities: { title: string; meta: string; body: string }[];
    closing: string;
  };
  founder: {
    eyebrow: string;
    heading: string;
    paragraphs: { text: string; accent?: boolean; strong?: boolean }[];
    name: string;
    role: string;
    cta: string;
    portraitAlt: string;
  };
  dunes: { eyebrow: string; line1: string; line2: string; alt: string };
  creative: { heading: string; lead: string; body: string; closing: string };
  begin: {
    heading: string;
    tagline: string;
    cards: { title: string; kicker: string; lines: string[]; cta: string }[];
    closing: string;
  };
  footer: { call: string; session: string; rights: string };
};

const en: Content = {
  nav: {
    map: "The Map",
    book: "The Book",
    podcast: "Podcast",
    about: "About",
    begin: "Begin",
    menu: "Open menu",
    close: "Close menu",
  },
  hero: {
    title: "THE MAP",
    tagline: "A different way to meet what was once *invisible* and *automatic*.",
    ctaBook: "Get the Book",
    ctaMap: "Explore the Map",
    bookAlt: "Meet Yourself, Differently — a book by Malek Najm Ghaleb",
  },
  mapNodes: [
    { n: "01", title: "Reactivity", sub: "From automatic to aware." },
    { n: "02", title: "Awareness", sub: "From invisible to visible." },
    { n: "03", title: "Integration", sub: "From rejection to wholeness." },
    { n: "04", title: "Sovereignty", sub: "From protection to values." },
    { n: "05", title: "Creative Agency", sub: "From limitation to creation." },
  ],
  stageNodes: [
    { n: "01", title: "Reactivity", sub: "Automatic" },
    { n: "02", title: "Awareness", sub: "Visible" },
    { n: "03", title: "Integration", sub: "Met" },
    { n: "04", title: "Sovereignty", sub: "Choosable" },
    { n: "05", title: "Creative Agency", sub: "Available" },
  ],
  availableNodes: [
    { n: "01", title: "Self", sub: "" },
    { n: "02", title: "Experience", sub: "" },
    { n: "03", title: "Expression", sub: "" },
    { n: "04", title: "Relationship", sub: "" },
    { n: "05", title: "Creation", sub: "" },
  ],
  protection: {
    eyebrow: "Sometimes protection doesn't look like protection.",
    heading: "It can look and feel like who *you* are.",
    items: [
      {
        name: "Suppress",
        line: "Turn down what is happening inside you.",
        words: "Silence · numbness\nhiding · shutting down\nminimizing · disconnecting from needs",
      },
      {
        name: "Control",
        line: "Get it right before something can go wrong.",
        words:
          "Perfectionism · overthinking\nprocrastination · fixing\ncertainty-seeking\ncontrolling outcomes",
      },
      {
        name: "Defend",
        line: "Mobilize against what feels threatening.",
        words: "Reactivity · anger\nblame · explaining\njustifying · attacking\nneeding to be right",
      },
      {
        name: "Avoid",
        line: "Move away from what feels difficult to face or feel.",
        words:
          "Withdrawal · distraction\nnumbing · compulsions\nisolation · escaping\navoiding vulnerability",
      },
      {
        name: "Adapt",
        line: "Change yourself to preserve connection.",
        words:
          "People-pleasing · approval seeking\nperforming · over-giving\nhiding preferences\nabandoning boundaries",
      },
    ],
    closing: "Different strategies.\nA similar intelligence:",
    closingEyebrow: "To protect what once didn't feel safe to be.",
  },
  childhood: {
    lead: "These responses weren't random.",
    line2: "They may once have helped you navigate the world you were in as a child.",
    line3: "In different ways, they answered a question:",
    question: "Given the world I'm experiencing, what is the *safest* way to be?",
    maybes: [
      "Maybe staying quiet kept connection.",
      "Maybe perfection brought approval.",
      "Maybe people-pleasing kept the peace.",
      "Maybe independence protected vulnerability.",
      "Maybe shutting down made overwhelming feelings more manageable.",
    ],
    closing: "And sometimes, what helped us adapt becomes automatic.",
  },
  automatic: {
    pairs: [
      ["You say yes", "before noticing you wanted to say no."],
      ["You become defensive", "before realizing something hurt."],
      ["You pull away", "when what you really want is closeness."],
      ["You try to get it right", "before allowing yourself to create."],
      [
        "You look outside yourself for reassurance",
        "before asking what you actually feel or want.",
      ],
      ["You shut down", "before knowing what became too much."],
    ],
    pattern: "The pattern can happen so quickly\nthat it doesn't feel like a pattern.",
    heading: "IT JUST FEELS\nLIKE YOU.",
    closing: "What has become familiar\nis not necessarily all of who you are.",
  },
  map: {
    title: "THE MAP",
    tagline: "A Map for meeting what was once *invisible* and *automatic*, differently.",
    stages: [
      {
        n: "01",
        title: "Reactivity",
        sub: "Automatic",
        body: "The pattern is happening before you can see it.",
      },
      {
        n: "02",
        title: "Awareness",
        sub: "Visible",
        body: "What was automatic becomes something you can observe.",
      },
      {
        n: "03",
        title: "Integration",
        sub: "Met",
        body: "What became visible can be met differently.",
      },
      {
        n: "04",
        title: "Sovereignty",
        sub: "Choosable",
        body: "What once chose for you no longer has to choose for you.",
      },
      {
        n: "05",
        title: "Creative Agency",
        sub: "Available",
        body: "What becomes available when protection no longer has to lead.",
      },
    ],
    cta: "Explore the Map",
  },
  available: {
    heading: "WHAT BECOMES *AVAILABLE?*",
    capacityEyebrow: "Greater capacity for:",
    capacities: [
      { title: "Grounding", meta: "01 · Self", body: "Stay with yourself when life gets difficult." },
      {
        title: "Presence",
        meta: "02 · Experience",
        body: "Feel what you feel without being ruled by it.",
      },
      {
        title: "Authenticity",
        meta: "03 · Expression",
        body: "Say what is true without hiding who you are.",
      },
      {
        title: "Relational Security",
        meta: "04 · Relationship",
        body: "Stay secure within yourself even as someone gets close.",
      },
      {
        title: "Creative Freedom",
        meta: "05 · Creation",
        body: "Create what matters without needing to prove yourself.",
      },
    ],
    closing: "More of you.",
  },
  founder: {
    eyebrow: "Founder Story",
    heading: "WHY ALCHEMIST WAYS EXISTS",
    paragraphs: [
      { text: "For years, I thought I was searching for freedom.\nValidation. Creativity. Love." },
      { text: "But beneath all of those desires was something quieter\nI couldn't yet see." },
      { text: "I was searching for inner safety.", accent: true },
      {
        text: "Much of my life had become organized around looking outside myself— for approval, direction, permission, and confirmation that who I was and what I wanted could be trusted.",
      },
      {
        text: "Eventually, I stopped trying to escape my anger and began trying to understand it.",
      },
      { text: "What is this anger trying to communicate?", accent: true },
      {
        text: "Following that question led me beneath the anger— to fear, hurt, protection, old conclusions about myself, and parts of myself I had left behind.",
      },
      { text: "The Map emerged from that process.", strong: true },
      { text: "Alchemist Ways grew from learning to meet those parts differently." },
    ],
    name: "Malek Najm Ghaleb",
    role: "Founder, Alchemist Ways",
    cta: "Read the Founder Story",
    portraitAlt: "Malek Najm Ghaleb, founder of Alchemist Ways",
  },
  dunes: {
    eyebrow: "What was always here within you becomes",
    line1: "STILL ENOUGH TO SEE.",
    line2: "FREE ENOUGH TO CREATE.",
    alt: "Sunlit desert dunes at sunrise",
  },
  creative: {
    heading: "Creative Agency",
    lead: "Creative Agency is *not* control over life. It is the *growing freedom* to meet what life brings with *more of yourself.*",
    body: "Not because fear disappears.\nNot because old patterns never return.\nBut because they no longer have to be the only forces choosing what happens next.",
    closing: "More of you *becomes available.*",
  },
  begin: {
    heading: "BEGIN WHERE YOU ARE",
    tagline: "There is no *single* place you have to begin.",
    cards: [
      {
        title: "Explore",
        kicker: "Meet what's here.",
        lines: [
          "A 10-minute Emotional Awareness Tool.",
          "Take one reaction, feeling, or pattern and begin seeing the invisible architecture beneath it.",
        ],
        cta: "Explore the Tool",
      },
      {
        title: "Understand",
        kicker: "Meet Yourself, Differently.",
        lines: [
          "The complete Map, in book form.",
          "Go deeper into the hidden architecture beneath your patterns—and the process from reactivity to Creative Agency.",
        ],
        cta: "Explore the Book",
      },
      {
        title: "Practice",
        kicker: "Work with Malek.",
        lines: [
          "Workshops, group experiences, and one-on-one work.",
          "Bring the Map into lived experience.",
        ],
        cta: "Explore Working Together",
      },
    ],
    closing:
      "You don't have to become someone else. You can learn to meet what is already here, *differently*.",
  },
  footer: {
    call: "Free Clarity Call",
    session: "Clarity Session",
    rights: "Alchemist Ways · Malek Najm Ghaleb",
  },
};

const fr: Content = {
  nav: {
    map: "La Carte",
    book: "Le Livre",
    podcast: "Balado",
    about: "À propos",
    begin: "Commencer",
    menu: "Ouvrir le menu",
    close: "Fermer le menu",
  },
  hero: {
    title: "LA CARTE",
    tagline: "Une autre façon d'accueillir ce qui était autrefois *invisible* et *automatique*.",
    ctaBook: "Obtenir le livre",
    ctaMap: "Explorer la Carte",
    bookAlt: "Meet Yourself, Differently — un livre de Malek Najm Ghaleb",
  },
  mapNodes: [
    { n: "01", title: "Réactivité", sub: "De l'automatisme à la conscience." },
    { n: "02", title: "Conscience", sub: "De l'invisible au visible." },
    { n: "03", title: "Intégration", sub: "Du rejet à l'entièreté." },
    { n: "04", title: "Souveraineté", sub: "De la protection aux valeurs." },
    { n: "05", title: "Pouvoir créateur", sub: "De la limite à la création." },
  ],
  stageNodes: [
    { n: "01", title: "Réactivité", sub: "Automatique" },
    { n: "02", title: "Conscience", sub: "Visible" },
    { n: "03", title: "Intégration", sub: "Accueilli" },
    { n: "04", title: "Souveraineté", sub: "Au choix" },
    { n: "05", title: "Pouvoir créateur", sub: "Disponible" },
  ],
  availableNodes: [
    { n: "01", title: "Soi", sub: "" },
    { n: "02", title: "Expérience", sub: "" },
    { n: "03", title: "Expression", sub: "" },
    { n: "04", title: "Relation", sub: "" },
    { n: "05", title: "Création", sub: "" },
  ],
  protection: {
    eyebrow: "Parfois, la protection n'a pas l'air d'une protection.",
    heading: "Elle peut ressembler à ce que *vous* êtes.",
    items: [
      {
        name: "Supprimer",
        line: "Baisser le volume de ce qui se passe en vous.",
        words: "Silence · engourdissement\nse cacher · se refermer\nminimiser · se couper de ses besoins",
      },
      {
        name: "Contrôler",
        line: "Tout réussir avant que quelque chose puisse mal tourner.",
        words:
          "Perfectionnisme · surréflexion\nprocrastination · réparer\nrecherche de certitude\ncontrôle des résultats",
      },
      {
        name: "Défendre",
        line: "Se mobiliser contre ce qui semble menaçant.",
        words:
          "Réactivité · colère\nblâme · explications\njustifications · attaques\nbesoin d'avoir raison",
      },
      {
        name: "Éviter",
        line: "S'éloigner de ce qui est difficile à affronter ou à ressentir.",
        words:
          "Retrait · distraction\nanesthésie · compulsions\nisolement · fuite\névitement de la vulnérabilité",
      },
      {
        name: "S'adapter",
        line: "Se transformer pour préserver le lien.",
        words:
          "Complaisance · recherche d'approbation\nperformance · trop donner\ntaire ses préférences\nabandonner ses limites",
      },
    ],
    closing: "Des stratégies différentes.\nUne intelligence semblable :",
    closingEyebrow: "Protéger ce qu'il ne semblait pas sécuritaire d'être.",
  },
  childhood: {
    lead: "Ces réponses n'avaient rien d'aléatoire.",
    line2: "Elles vous ont peut-être aidé à naviguer le monde de votre enfance.",
    line3: "Chacune à sa manière, elles répondaient à une question :",
    question: "Dans le monde que je vis, quelle est la façon d'être la plus *sécuritaire* ?",
    maybes: [
      "Peut-être que se taire préservait le lien.",
      "Peut-être que la perfection apportait l'approbation.",
      "Peut-être que plaire aux autres maintenait la paix.",
      "Peut-être que l'indépendance protégeait la vulnérabilité.",
      "Peut-être que se refermer rendait les émotions envahissantes plus supportables.",
    ],
    closing: "Et parfois, ce qui nous a aidés à nous adapter devient automatique.",
  },
  automatic: {
    pairs: [
      ["Vous dites oui", "avant de remarquer que vous vouliez dire non."],
      ["Vous devenez sur la défensive", "avant de réaliser que quelque chose vous a blessé."],
      ["Vous vous éloignez", "alors que ce que vous voulez vraiment, c'est la proximité."],
      ["Vous cherchez à bien faire", "avant de vous permettre de créer."],
      [
        "Vous cherchez à l'extérieur de vous une réassurance",
        "avant de vous demander ce que vous ressentez ou voulez vraiment.",
      ],
      ["Vous vous refermez", "avant de savoir ce qui est devenu trop lourd."],
    ],
    pattern: "Le schéma peut survenir si vite\nqu'il ne ressemble pas à un schéma.",
    heading: "ON DIRAIT\nSIMPLEMENT VOUS.",
    closing:
      "Ce qui est devenu familier\nn'est pas nécessairement tout ce que vous êtes.",
  },
  map: {
    title: "LA CARTE",
    tagline:
      "Une carte pour accueillir autrement ce qui était autrefois *invisible* et *automatique*.",
    stages: [
      {
        n: "01",
        title: "Réactivité",
        sub: "Automatique",
        body: "Le schéma se déclenche avant même que vous puissiez le voir.",
      },
      {
        n: "02",
        title: "Conscience",
        sub: "Visible",
        body: "Ce qui était automatique devient quelque chose que vous pouvez observer.",
      },
      {
        n: "03",
        title: "Intégration",
        sub: "Accueilli",
        body: "Ce qui est devenu visible peut être accueilli autrement.",
      },
      {
        n: "04",
        title: "Souveraineté",
        sub: "Au choix",
        body: "Ce qui choisissait pour vous n'a plus à choisir pour vous.",
      },
      {
        n: "05",
        title: "Pouvoir créateur",
        sub: "Disponible",
        body: "Ce qui devient possible quand la protection n'a plus à mener.",
      },
    ],
    cta: "Explorer la Carte",
  },
  available: {
    heading: "QU'EST-CE QUI DEVIENT *POSSIBLE ?*",
    capacityEyebrow: "Une plus grande capacité à :",
    capacities: [
      {
        title: "Ancrage",
        meta: "01 · Soi",
        body: "Rester avec vous-même quand la vie devient difficile.",
      },
      {
        title: "Présence",
        meta: "02 · Expérience",
        body: "Ressentir ce que vous ressentez sans en être gouverné.",
      },
      {
        title: "Authenticité",
        meta: "03 · Expression",
        body: "Dire ce qui est vrai sans cacher qui vous êtes.",
      },
      {
        title: "Sécurité relationnelle",
        meta: "04 · Relation",
        body: "Demeurer en sécurité en vous-même même quand quelqu'un se rapproche.",
      },
      {
        title: "Liberté créatrice",
        meta: "05 · Création",
        body: "Créer ce qui compte sans avoir besoin de faire ses preuves.",
      },
    ],
    closing: "Davantage de vous.",
  },
  founder: {
    eyebrow: "Histoire du fondateur",
    heading: "POURQUOI ALCHEMIST WAYS EXISTE",
    paragraphs: [
      {
        text: "Pendant des années, je croyais chercher la liberté.\nLa validation. La créativité. L'amour.",
      },
      {
        text: "Mais sous tous ces désirs se trouvait quelque chose de plus discret\nque je ne pouvais pas encore voir.",
      },
      { text: "Je cherchais une sécurité intérieure.", accent: true },
      {
        text: "Une grande partie de ma vie s'était organisée autour du regard extérieur — pour l'approbation, la direction, la permission, et la confirmation que ce que j'étais et ce que je voulais pouvaient être dignes de confiance.",
      },
      {
        text: "Puis j'ai cessé de fuir ma colère et j'ai commencé à chercher à la comprendre.",
      },
      { text: "Qu'est-ce que cette colère tente de communiquer ?", accent: true },
      {
        text: "Suivre cette question m'a mené sous la colère — vers la peur, la blessure, la protection, de vieilles conclusions sur moi-même, et des parts de moi que j'avais laissées derrière.",
      },
      { text: "La Carte est née de ce processus.", strong: true },
      {
        text: "Alchemist Ways est né de l'apprentissage d'accueillir ces parts autrement.",
      },
    ],
    name: "Malek Najm Ghaleb",
    role: "Fondateur, Alchemist Ways",
    cta: "Lire l'histoire du fondateur",
    portraitAlt: "Malek Najm Ghaleb, fondateur d'Alchemist Ways",
  },
  dunes: {
    eyebrow: "Ce qui a toujours été en vous devient",
    line1: "ASSEZ CALME POUR VOIR.",
    line2: "ASSEZ LIBRE POUR CRÉER.",
    alt: "Dunes du désert au lever du soleil",
  },
  creative: {
    heading: "Pouvoir créateur",
    lead: "Le pouvoir créateur n'est *pas* le contrôle sur la vie. C'est la *liberté grandissante* d'accueillir ce que la vie apporte avec *davantage de vous-même.*",
    body: "Non pas parce que la peur disparaît.\nNon pas parce que les vieux schémas ne reviennent jamais.\nMais parce qu'ils n'ont plus à être les seules forces qui décident de la suite.",
    closing: "Davantage de vous *devient disponible.*",
  },
  begin: {
    heading: "COMMENCEZ LÀ OÙ VOUS ÊTES",
    tagline: "Il n'y a pas *un seul* endroit où commencer.",
    cards: [
      {
        title: "Explorer",
        kicker: "Accueillir ce qui est là.",
        lines: [
          "Un outil de conscience émotionnelle de 10 minutes.",
          "Prenez une réaction, une émotion ou un schéma et commencez à voir l'architecture invisible qui se cache dessous.",
        ],
        cta: "Explorer l'outil",
      },
      {
        title: "Comprendre",
        kicker: "Meet Yourself, Differently.",
        lines: [
          "La Carte complète, sous forme de livre.",
          "Allez plus loin dans l'architecture cachée sous vos schémas — et dans le passage de la réactivité au pouvoir créateur.",
        ],
        cta: "Explorer le livre",
      },
      {
        title: "Pratiquer",
        kicker: "Travailler avec Malek.",
        lines: [
          "Ateliers, expériences de groupe et accompagnement individuel.",
          "Amener la Carte dans l'expérience vécue.",
        ],
        cta: "Explorer la collaboration",
      },
    ],
    closing:
      "Vous n'avez pas à devenir quelqu'un d'autre. Vous pouvez apprendre à accueillir *autrement* ce qui est déjà là.",
  },
  footer: {
    call: "Appel de clarté gratuit",
    session: "Séance de clarté",
    rights: "Alchemist Ways · Malek Najm Ghaleb",
  },
};

export const content: Record<Lang, Content> = { en, fr };
