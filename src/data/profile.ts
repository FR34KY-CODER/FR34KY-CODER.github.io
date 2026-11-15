export interface AchievementItem {
  id: string;
  badge: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  metric: string;
  href?: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "databricks-ordm",
    badge: "OPEN SOURCE · DATABRICKS",
    title: "Open Retail Data Model (ORDM v0.5)",
    shortTitle: "Databricks ORDM v0.5",
    subtitle:
      "Co-authored canonical inventory & margin/volume outcome packages remotely with Databricks Industry Solutions engineers.",
    metric: "8.8K+ LINES · 12 METRIC VIEWS",
    href: "https://github.com/databricks-industry-solutions/open-retail-data-model",
  },
  {
    id: "gdg-lead",
    badge: "LEADERSHIP · AUG 2024–AUG 2025",
    title: "GDG On Campus Domain Lead (LNMIIT)",
    shortTitle: "GDG Unity & Game Dev Lead",
    subtitle:
      "Organized and led hands-on workshops on game development, guiding peers through Unity engine fundamentals and project-based learning.",
    metric: "GOOGLE DEVELOPER GROUPS",
  },
  {
    id: "licai-research",
    badge: "B.TECH RESEARCH · LICAI LAB (LNMIIT)",
    title: "LexNext.AI Legal Case Intelligence",
    shortTitle: "LICAI Research · LexNext.AI",
    subtitle:
      "Under Dr. Sarada Samantaray: processed 10,000+ Supreme Court cases across 50+ hierarchical legal categories with fidelity summarization & RAG Q&A.",
    metric: "10,000+ JUDGMENTS INDEXED",
    href: "/work/lexnext-ai",
  },
  {
    id: "celebal-engineer",
    badge: "INDUSTRY · DEC 2025–PRESENT",
    title: "Client-Side AI & Data Solutions · Celebal Tech",
    shortTitle: "Celebal · Client AI & DS",
    subtitle:
      "Delivering enterprise diagnostic copilots, autonomous transactional workflows, semantic discovery & data trust platforms (48+ YAML quality contracts; proprietary internals confidential).",
    metric: "4 ENTERPRISE ENGAGEMENTS",
    href: "/work?role=client",
  },
  {
    id: "adaptive-traffic-cv",
    badge: "COMPUTER VISION · MAY–JUN 2025",
    title: "Adaptive Traffic Control System (YOLOv8)",
    shortTitle: "YOLOv8 Traffic Vision",
    subtitle:
      "Self-undertaken real-time traffic signal controller fine-tuned on urban Indian road conditions to replace static timers with live vehicle queue optimization.",
    metric: "REAL-TIME SIGNAL FSM",
    href: "/work/adaptive-traffic",
  },
  {
    id: "polyglot-dsa-kaggle",
    badge: "ENGINEERING · C++ / PYTHON / SQL",
    title: "32+ Open-Source Repos · LeetCode & Kaggle",
    shortTitle: "32+ OSS · LeetCode & Kaggle",
    subtitle:
      "Verified multi-domain open-source builder across C++, Python & SQL alongside algorithmic problem solving (@DSA_FR34K) and ML notebooks (@ojasvigoyal).",
    metric: "GITHUB · LEETCODE · KAGGLE",
    href: "https://github.com/FR34KY-CODER",
  },
];

export const PROFILE = {
  name: "OJASVI GOYAL",
  handle: "FR34KY-CODER",
  monogram: "OG",
  tagline: "AI · BACKEND · DATA SCIENCE · ML",
  city: "JAIPUR",
  countryCode: "IN",
  timezone: "Asia/Kolkata",
  statusLabel: "OPEN TO 2026 ROLES",
  currentRole: "AI & Data Science Engineer · Celebal Technologies",
  education: "B.Tech · LNMIIT Jaipur ('26)",
  leadership: "Former Domain Lead · Google Developer Groups On Campus (LNMIIT)",
  email: "ojasvigoyal275@gmail.com",
  educationDetail: {
    institution: "The LNM Institute of Information Technology (LNMIIT)",
    shortInstitution: "LNMIIT Jaipur",
    degree: "Bachelor of Technology (B.Tech.)",
    period: "2022 – 2026",
    location: "Jaipur, Rajasthan",
    research: "Undergraduate Researcher · LICAI Lab (Mentor: Dr. Sarada Samantaray)",
  },
  achievements: ACHIEVEMENTS,
  socials: [
    {
      label: "GitHub",
      handle: "@FR34KY-CODER",
      href: "https://github.com/FR34KY-CODER",
    },
    {
      label: "LinkedIn",
      handle: "ojasvi-goyal",
      href: "https://www.linkedin.com/in/ojasvi-goyal-85b82525b",
    },
    {
      label: "LeetCode",
      handle: "DSA_FR34K",
      href: "https://leetcode.com/u/DSA_FR34K/",
    },
    {
      label: "Kaggle",
      handle: "ojasvigoyal",
      href: "https://www.kaggle.com/ojasvigoyal",
    },
    {
      label: "Medium",
      handle: "@fr34ky-coder",
      href: "https://medium.com/@fr34ky-coder",
    },
  ],
  dossierStats: [
    { label: "CURRENTLY", value: "Celebal Tech" },
    { label: "ALMA MATER", value: "LNMIIT · '26" },
    { label: "OPEN SOURCE", value: "32+ Repos" },
    { label: "BASED IN", value: "Jaipur, IN" },
  ],
} as const;

