export type RoleId = "all" | "ai" | "backend" | "ds" | "ml";
export type CoreRoleId = Exclude<RoleId, "all">;

export interface RoleDefinition {
  id: RoleId;
  code: string;
  title: string;
  shortLabel: string;
  /** High-contrast color on dark obsidian (#0f1217) */
  accentNight: string;
  /** High-contrast color on warm paper (#f4f1ea) */
  accentPaper: string;
  /** Subtle tint surface */
  tint: string;
  heroSplitLeft: {
    eyebrow: string;
    headline: string;
    subline: string;
    metricValue: string;
    metricLabel: string;
    badges: string[];
  };
  heroSplitRight: {
    promptCommand: string;
    lines: Array<{ text: string; tone: "dim" | "accent" | "ok" }>;
    footerCommand: string;
  };
  balanceScore: number;
  mission?: {
    number: string;
    title: string;
    summary: string;
    loadout: string[];
    featuredSlugs: string[];
    ctaLabel: string;
  };
}

export const ROLES: Record<RoleId, RoleDefinition> = {
  all: {
    id: "all",
    code: "00",
    title: "All 4 Disciplines",
    shortLabel: "ALL 4",
    accentNight: "#EA1D0F",
    accentPaper: "#EA1D0F",
    tint: "rgba(234, 29, 15, 0.14)",
    heroSplitLeft: {
      eyebrow: "UNIFIED ENGINEERING MATRIX",
      headline: "EVERY SYSTEM HAS FOUR SIDES.",
      subline: "From mathematical models and data pipelines to autonomous agents and async APIs.",
      metricValue: "4×",
      metricLabel: "PRODUCTION DOMAINS",
      badges: ["AI Engineer", "Backend Dev", "Data Scientist", "ML Engineer"],
    },
    heroSplitRight: {
      promptCommand: "$ whoami --roles --all",
      lines: [
        { text: "AI_ENG   :: reasoning agents & RAG engines", tone: "accent" },
        { text: "BACKEND  :: async FastAPI / Node + real-time WS", tone: "ok" },
        { text: "DATA_SCI :: modeling, telemetry & data lineage", tone: "accent" },
        { text: "ML_ENG   :: vision (YOLOv8) & semantic NLP", tone: "ok" },
      ],
      footerCommand: "$ deploy --mode full-stack-intelligence",
    },
    balanceScore: 100,
  },
  ai: {
    id: "ai",
    code: "01",
    title: "AI Engineer",
    shortLabel: "AI ENG",
    accentNight: "#EA1D0F",
    accentPaper: "#D91B0E",
    tint: "rgba(234, 29, 15, 0.14)",
    heroSplitLeft: {
      eyebrow: "01 · AGENTIC & LLM SYSTEMS",
      headline: "SYSTEMS THAT REASON & ACT.",
      subline: "Multi-agent workflows, hybrid RAG retrieval, local GPU inference, and semantic Q&A.",
      metricValue: "10K+",
      metricLabel: "DOCS INDEXED & QUERIED",
      badges: ["Multi-Agent AI", "RAG Pipelines", "Local LLMs", "Semantic Search"],
    },
    heroSplitRight: {
      promptCommand: "$ agent-runtime --inspect --mode=reasoning",
      lines: [
        { text: "RETRIEVER :: semantic embeddings + vector search", tone: "accent" },
        { text: "SUMMARIZE :: hybrid LexRank + BART active", tone: "ok" },
        { text: "LOCAL_GPU :: llama.cpp streaming tokens", tone: "accent" },
      ],
      footerCommand: "$ stream --model llama-3.1-8b --rag verified",
    },
    balanceScore: 95,
    mission: {
      number: "01",
      title: "AI Engineer",
      summary:
        "Designing reasoning pipelines, hybrid retrieval-augmented systems, local LLM tooling, and agentic workflows that turn unstructured data into reliable action.",
      loadout: ["LLMs & Transformers", "Hybrid RAG", "Semantic Search", "Multi-Agent Flows", "Local Inference"],
      featuredSlugs: ["lexnext-ai", "gyastro", "site-engineer"],
      ctaLabel: "Hire for AI Engineering",
    },
  },
  backend: {
    id: "backend",
    code: "02",
    title: "Backend Developer",
    shortLabel: "BACKEND",
    accentNight: "#FFB547",
    accentPaper: "#B45309",
    tint: "rgba(255, 181, 71, 0.16)",
    heroSplitLeft: {
      eyebrow: "02 · APIS, DATA STORES & REAL-TIME",
      headline: "ENGINEERED FOR THROUGHPUT.",
      subline: "Async Python & TypeScript backends, PostgreSQL schemas, WebSockets, RBAC, and Dockerized services.",
      metricValue: "WS",
      metricLabel: "REAL-TIME EVENT STREAMS",
      badges: ["FastAPI", "PostgreSQL", "WebSockets", "RBAC & Docker"],
    },
    heroSplitRight: {
      promptCommand: "$ uvicorn app.main:app --workers 4",
      lines: [
        { text: "POOL     :: asyncpg PostgreSQL pool ready", tone: "ok" },
        { text: "STREAM   :: WebSocket & SSE channels live", tone: "accent" },
        { text: "SECURITY :: RBAC + JWT / API-Key verified", tone: "ok" },
      ],
      footerCommand: "$ curl -i /api/v1/health -> 200 OK",
    },
    balanceScore: 90,
    mission: {
      number: "02",
      title: "Backend Developer",
      summary:
        "Building asynchronous REST & WebSocket APIs, dynamic rule engines, relational data layers, and containerized services designed for resilience and speed.",
      loadout: ["FastAPI", "PostgreSQL", "Node.js & Prisma", "WebSockets & SSE", "Docker & RBAC"],
      featuredSlugs: ["uniapply", "async-booking-api", "autonomous-commerce"],
      ctaLabel: "Hire for Backend Systems",
    },
  },
  ds: {
    id: "ds",
    code: "03",
    title: "Data Scientist",
    shortLabel: "DATA SCI",
    accentNight: "#22D3EE",
    accentPaper: "#0E7490",
    tint: "rgba(34, 211, 238, 0.15)",
    heroSplitLeft: {
      eyebrow: "03 · ANALYTICS, MODELING & INSIGHT",
      headline: "SIGNAL EXTRACTED FROM NOISE.",
      subline: "Canonical data thinking, predictive churn & classification analytics, EDA, and automated quality shields.",
      metricValue: "65+",
      metricLabel: "TAXONOMY CATEGORIES",
      badges: ["Statistical EDA", "Feature Engineering", "Data Quality", "Predictive Analytics"],
    },
    heroSplitRight: {
      promptCommand: "$ ds-pipeline --validate --profile=production",
      lines: [
        { text: "EDA      :: outlier & variance checks passed", tone: "ok" },
        { text: "FEATURES :: PCA + target encoding fitted", tone: "accent" },
        { text: "QUALITY  :: cross-layer anomaly check clean", tone: "ok" },
      ],
      footerCommand: "$ evaluate --metric roc-auc --status optimal",
    },
    balanceScore: 92,
    mission: {
      number: "03",
      title: "Data Scientist",
      summary:
        "Turning raw, messy datasets and multi-layer enterprise tables into clean canonical representations, validated insights, and actionable predictive models.",
      loadout: ["Python & SQL", "Feature Pipelines", "Canonical Modeling", "Data Quality Diagnostics", "Statistical Analysis"],
      featuredSlugs: ["canonical-data-shield", "causal-inventory-copilot", "ml-predictive-suite"],
      ctaLabel: "Hire for Data Science",
    },
  },
  ml: {
    id: "ml",
    code: "04",
    title: "ML Engineer",
    shortLabel: "ML ENG",
    accentNight: "#A78BFA",
    accentPaper: "#6D28D9",
    tint: "rgba(167, 139, 250, 0.16)",
    heroSplitLeft: {
      eyebrow: "04 · VISION, EMBEDDINGS & PRODUCTION ML",
      headline: "MODELS TUNED FOR REAL WORLD.",
      subline: "Fine-tuned YOLOv8 computer vision, zero-shot Sentence-BERT embeddings, LightGBM, and low-latency inference.",
      metricValue: "CV+NLP",
      metricLabel: "END-TO-END MODEL PIPELINES",
      badges: ["YOLOv8 Vision", "Sentence-BERT", "XGBoost / LGBM", "PyTorch & CUDA"],
    },
    heroSplitRight: {
      promptCommand: "$ python train_eval.py --device cuda:0",
      lines: [
        { text: "VISION   :: YOLOv8 + TinyTrack ROI stable", tone: "accent" },
        { text: "EMBED    :: BAAI/bge-small-en cosine pooling", tone: "ok" },
        { text: "TABULAR  :: LightGBM / XGBoost tuned", tone: "accent" },
      ],
      footerCommand: "$ export --onnx --serve-inference",
    },
    balanceScore: 93,
    mission: {
      number: "04",
      title: "ML Engineer",
      summary:
        "Training, fine-tuning, and deploying computer vision, NLP embedding, and gradient-boosted models from experimentation notebooks to interactive applications.",
      loadout: ["PyTorch & TensorFlow", "YOLOv8 & OpenCV", "Sentence-BERT & BART", "XGBoost & LightGBM", "Flask / Streamlit Serving"],
      featuredSlugs: ["adaptive-traffic", "lexnext-ai", "semantic-graph-discovery"],
      ctaLabel: "Hire for ML Engineering",
    },
  },
};

export const CORE_ROLES: RoleDefinition[] = [
  ROLES.ai,
  ROLES.backend,
  ROLES.ds,
  ROLES.ml,
];

