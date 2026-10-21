/** Privacy Policy text (source of truth: /workspace/alch/privacy-policy.md). Inline: **bold**, *italic*, [text](url). */
export type PolicyBlock =
  { t: "h"; x: string } | { t: "p"; x: string } | { t: "ul"; items: string[] };
export const POLICY_UPDATED = "Last updated: October 21, 2026";
export const POLICY: PolicyBlock[] = [
  {
    t: "p",
    x: "Your privacy matters to us. Meeting yourself differently begins with feeling safe, and that includes knowing what happens to your information. This policy explains, in plain language, what Alchemist Ways collects, why, where it goes, and the choices and rights you have. It is written to meet Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA), Quebec’s Act respecting the protection of personal information in the private sector (as amended by Law 25), and Canada’s Anti-Spam Legislation (CASL).",
  },
  {
    t: "h",
    x: "Who is responsible",
  },
  {
    t: "p",
    x: "Alchemist Ways is operated from Montreal, Quebec, Canada. The person in charge of the protection of personal information is:",
  },
  {
    t: "ul",
    items: ["**Malek Najm Ghaleb**, Founder, Alchemist Ways", "Email: [[PRIVACY_EMAIL]]"],
  },
  {
    t: "p",
    x: "You can contact Malek about any question, request or concern related to this policy or your personal information.",
  },
  {
    t: "h",
    x: "What we collect and why",
  },
  {
    t: "p",
    x: "We keep what we collect to a minimum.",
  },
  {
    t: "ul",
    items: [
      "**Newsletter sign-up (Stay Connected).** When you subscribe, we collect your **email address** and, if you choose to give it, your **name**. We use them only to send you reflections, insights and invitations from Alchemist Ways, and to address you by name. The form also shows an optional phone number field. **Your phone number is not sent, collected or stored**: the form only transmits your name and email address.",
      "**Basic technical information.** Like every website, our hosting provider automatically receives technical information when you visit, such as your IP address, browser type, the page requested and the date and time. This is used to deliver the site and keep it secure. We do not use it to identify you.",
      "**What we don’t collect.** This website does not use analytics, advertising or tracking tools, does not set cookies, and does not create a profile of you.",
    ],
  },
  {
    t: "p",
    x: "When you buy the book, join the community, book a session or visit our social media pages, you leave this website and the provider of that service collects information under its own privacy policy (see “Service providers and other websites” below).",
  },
  {
    t: "h",
    x: "Consent",
  },
  {
    t: "p",
    x: "We collect and use your personal information only with your consent, and only for the purposes described here. By subscribing to the newsletter, you give your express consent to receive emails from Alchemist Ways.",
  },
  {
    t: "p",
    x: "You can withdraw your consent at any time, at no cost:",
  },
  {
    t: "ul",
    items: [
      "by clicking the **unsubscribe link included in every email** we send, or",
      "by writing to us by email. Privacy contact: [[PRIVACY_EMAIL]]",
    ],
  },
  {
    t: "p",
    x: "Our newsletter follows Canada’s Anti-Spam Legislation (CASL). We send emails only to people who have given express consent, every email clearly identifies Alchemist Ways as the sender, and every email includes a working unsubscribe link. Unsubscribe requests are processed promptly, and in any case within 10 business days.",
  },
  {
    t: "h",
    x: "Service providers and other websites",
  },
  {
    t: "p",
    x: "We rely on a small number of trusted providers. Some of them store or process information outside Quebec and outside Canada, mainly in the United States, where it may be subject to the laws of those countries, including access by courts or authorities there. Before using a provider, we consider whether it protects personal information adequately.",
  },
  {
    t: "ul",
    items: [
      "**Kit (ConvertKit)** stores our newsletter list (your name and email address) and sends our emails. [Kit privacy policy](https://kit.com/privacy)",
      "**GitHub Pages** hosts this website and receives the technical information described above. [GitHub privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement)",
      "**Payhip** handles the purchase of the book *Meet Yourself, Differently.* when you choose to buy it. [Payhip privacy policy](https://payhip.com/privacy)",
      "**Skool** hosts the Alchemist Ways community membership when you choose to join. [Skool legal and privacy](https://www.skool.com/legal)",
      "**Calendly** handles bookings for conversations and sessions with Malek when you choose to book. [Calendly privacy notice](https://calendly.com/privacy)",
      "**Instagram, YouTube and TikTok** host our social media pages that we link to. [Instagram](https://privacycenter.instagram.com/policy), [YouTube (Google)](https://policies.google.com/privacy), [TikTok](https://www.tiktok.com/legal/page/row/privacy-policy/en)",
    ],
  },
  {
    t: "p",
    x: "Payhip, Skool, Calendly and the social platforms are only involved when you follow a link to them. They collect information under their own policies, and we encourage you to read them.",
  },
  {
    t: "h",
    x: "We don’t sell your information",
  },
  {
    t: "p",
    x: "We do not sell, rent or trade your personal information, and we do not share it with anyone for their own marketing.",
  },
  {
    t: "h",
    x: "Cookies and similar technologies",
  },
  {
    t: "p",
    x: "This website does not set cookies and does not use local storage, analytics, advertising pixels or other tracking technologies. Our fonts and images are served from our own site, not from third-party font or image services. The third-party websites we link to (such as Payhip, Skool, Calendly, Kit’s hosted pages and social media) may use cookies under their own policies once you visit them.",
  },
  {
    t: "h",
    x: "How long we keep information",
  },
  {
    t: "p",
    x: "We keep your name and email address for as long as you remain subscribed. When you unsubscribe, you stop receiving emails right away. On request, we will delete your information from our list, keeping only what we need to respect your choice not to be contacted and to meet our legal obligations. Technical logs are kept by our hosting provider under its own retention practices.",
  },
  {
    t: "h",
    x: "How we protect it",
  },
  {
    t: "p",
    x: "We use reputable providers with strong security practices, encrypted connections (HTTPS) on this website, and access to our accounts limited to the people who need it. No method of transmission or storage is perfectly secure, but we take reasonable measures, suited to the sensitivity of the information, to protect it against loss, theft and unauthorized access, use or disclosure.",
  },
  {
    t: "h",
    x: "Your rights",
  },
  {
    t: "p",
    x: "You have the right to:",
  },
  {
    t: "ul",
    items: [
      "**Access** the personal information we hold about you, and know how it is used and to whom it has been disclosed.",
      "**Correct** information that is inaccurate, incomplete or out of date.",
      "**Withdraw your consent** at any time, for example by unsubscribing.",
      "**Ask us to delete** your information, or to stop disseminating it, where the law allows.",
      "**Receive your information** in a structured, commonly used technological format, or have it transferred to another organization (data portability, under Quebec law).",
      "**Be informed** about how and why your information is collected, as described in this policy.",
    ],
  },
  {
    t: "p",
    x: "To make a request, write to Malek Najm Ghaleb by email. Privacy contact: [[PRIVACY_EMAIL]] We may ask you to confirm your identity before acting on a request. We will respond in writing within 30 days of receiving it, and there is no charge for a request.",
  },
  {
    t: "h",
    x: "Confidentiality incidents",
  },
  {
    t: "p",
    x: "If a confidentiality incident involving your personal information occurs (for example, unauthorized access or loss), we will act quickly to reduce the risk of harm and prevent it from happening again. If the incident presents a risk of serious harm, we will notify you, the Commission d’accès à l’information du Québec and the Office of the Privacy Commissioner of Canada, as the law requires, and we keep a register of incidents.",
  },
  {
    t: "h",
    x: "Complaints",
  },
  {
    t: "p",
    x: "If you have a concern, please contact us first so we can try to resolve it. You also have the right to file a complaint with:",
  },
  {
    t: "ul",
    items: [
      "the [Commission d’accès à l’information du Québec](https://www.cai.gouv.qc.ca/), and",
      "the [Office of the Privacy Commissioner of Canada](https://www.priv.gc.ca/en/report-a-concern/).",
    ],
  },
  {
    t: "h",
    x: "Children",
  },
  {
    t: "p",
    x: "This website and our newsletter are intended for adults. We do not knowingly collect personal information from anyone under 14. If you believe a child has subscribed, please contact us and we will delete the information.",
  },
  {
    t: "h",
    x: "Changes to this policy",
  },
  {
    t: "p",
    x: "We may update this policy from time to time. When we do, we will post the new version on this page and change the “Last updated” date above. If a change is significant, we will let subscribers know by email.",
  },
  {
    t: "h",
    x: "Contact",
  },
  {
    t: "p",
    x: "Malek Najm Ghaleb, Founder and person in charge of the protection of personal information, Alchemist Ways, Montreal, Quebec, Canada. Email: [[PRIVACY_EMAIL]]",
  },
];
