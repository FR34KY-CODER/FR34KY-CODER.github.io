import { CoreRoleId } from "./roles";

export type ShopTone = "ink" | "red" | "stone" | "brick";

export interface ProjectCaseStudy {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  roles: CoreRoleId[];
  /**
   * Client engagement flag: when true, strictly showcase Problem, Idea, and Impact ONLY.
   * Zero proprietary architecture diagrams, zero code insights, and zero tech stack tags.
   */
  isClientEngagement: boolean;
  clientBadge?: string;
  shopTone: ShopTone;
  headlineMetric: {
    value: string;
    label: string;
  };
  stats: Array<{ label: string; value: string }>;
  summary: string;
  previewHighlights: string[];
  groups: Array<{
    title: string;
    items: string[];
  }>;
  /** Only populated for public open-source projects; intentionally domain-only for client work */
  pills: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    number: "01",
    slug: "lexnext-ai",
    title: "LexNext.AI",
    subtitle: "Indian Legal Case Intelligence Platform",
    year: "2025–2026",
    category: "AI · ML · Data Science",
    roles: ["ai", "ml", "ds"],
    isClientEngagement: false,
    shopTone: "ink",
    headlineMetric: {
      value: "10,000+",
      label: "Supreme Court judgments parsed, chunked & indexed for semantic Q&A",
    },
    stats: [
      { label: "CORPUS", value: "10K+ Cases" },
      { label: "TAXONOMY", value: "65+ Classes" },
      { label: "SUMMARIZER", value: "LexRank+BART" },
      { label: "RAG LLM", value: "Llama 3.1 8B" },
    ],
    summary:
      "B.Tech Research Project built under LICAI (LNMIIT) mentorship: an end-to-end legal intelligence pipeline performing zero-shot taxonomy classification, hybrid extractive-abstractive summarization, and RAG-grounded case Q&A.",
    previewHighlights: [
      "Zero-shot legal classification with BAAI/bge-small-en",
      "Max-pooled cosine similarity across 512-token chunks",
      "Hybrid LexRank + BART fidelity summarization",
    ],
    groups: [
      {
        title: "01 — Semantic Vectorization & Taxonomy",
        items: [
          "Processed 10,000+ Supreme Court judgments through custom cleaning & TOON JSON chunking.",
          "Embedded chunks locally with BAAI/bge-small-en and Sentence-BERT.",
          "Mapped a hierarchical taxonomy of 50–65+ legal categories via max-pooling cosine confidence.",
        ],
      },
      {
        title: "02 — Hybrid Summarization & Case RAG",
        items: [
          "Paired extractive LexRank sentence centrality with abstractive BART polishing to eliminate hallucinated facts.",
          "Indexed case chunks into ChromaDB for fast vector retrieval with Llama 3.1 8B Instant Q&A.",
          "Designed for a decoupled FastAPI + Next.js web intelligence interface.",
        ],
      },
    ],
    pills: [
      "Python",
      "PyTorch",
      "Sentence-BERT",
      "BAAI/bge-small-en",
      "LexRank",
      "BART",
      "ChromaDB",
      "Llama 3.1 8B",
      "FastAPI",
      "Next.js",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/Legal-Case-Intelligence-System-Phase-2",
  },
  {
    number: "02",
    slug: "autonomous-commerce",
    title: "Autonomous Commerce",
    subtitle: "Conditional Purchasing & Real-Time Trigger Idea",
    year: "2026",
    category: "Client Engagement",
    roles: ["ai", "backend"],
    isClientEngagement: true,
    clientBadge: "CLIENT ENGAGEMENT · IDEA & IMPACT",
    shopTone: "red",
    headlineMetric: {
      value: "ZERO-TOUCH",
      label: "Conceptual shift from manual price tracking to intent-driven autonomous purchasing",
    },
    stats: [
      { label: "SCOPE", value: "Client R&D" },
      { label: "DOMAIN", value: "Commerce AI" },
      { label: "MODE", value: "Event-Driven" },
      { label: "TRUST", value: "Cryptographic" },
    ],
    summary:
      "A high-level enterprise concept enabling users to declare purchase intents and budget rules once, allowing intelligent background evaluators to verify price movements and execute authorized transactions safely without manual re-approval.",
    previewHighlights: [
      "User-defined intent & price threshold triggers",
      "Tamper-evident authorization boundaries",
      "Automated recurring fulfillment concept",
    ],
    groups: [
      {
        title: "01 — The Core Idea",
        items: [
          "Replaces repetitive manual cart checking with declarative user buying mandates.",
          "Continuously observes catalogue price mutations against pre-authorized user boundaries.",
          "Ensures every autonomous action carries verifiable user consent and non-repudiation.",
        ],
      },
      {
        title: "02 — Business Impact",
        items: [
          "Eliminates drop-off between user purchase intent and real-time flash-price opportunities.",
          "Establishes a zero-trust safety perimeter before any autonomous execution occurs.",
          "High-level product concept delivered as an enterprise client engagement (implementation details confidential).",
        ],
      },
    ],
    pills: [
      "Client Engagement",
      "Autonomous Commerce",
      "Conditional Triggers",
      "Zero-Trust Consent",
      "Event-Driven Idea",
    ],
  },
  {
    number: "03",
    slug: "adaptive-traffic",
    title: "Adaptive Traffic Control",
    subtitle: "Real-Time YOLOv8 Signal Optimization",
    year: "2025",
    category: "ML Engineer · Vision",
    roles: ["ml", "backend"],
    isClientEngagement: false,
    shopTone: "stone",
    headlineMetric: {
      value: "DYNAMIC",
      label: "Real-time green-light allocation driven by live stop-line vehicle queues",
    },
    stats: [
      { label: "DETECTOR", value: "YOLOv8" },
      { label: "TRACKER", value: "TinyTrack" },
      { label: "SERVER", value: "Flask MJPEG" },
      { label: "DATASET", value: "IITM-HeTra" },
    ],
    summary:
      "AI-powered traffic signal controller that replaces static timers with real-time computer vision queue estimation, smoothing detections via a lightweight IoU tracker and preventing lane starvation with fairness weighting.",
    previewHighlights: [
      "Custom polygon ROI queue counting during RED",
      "EMA-smoothed TinyTrack eliminates jittery boxes",
      "Dual Camera & Video Upload MJPEG HUD",
    ],
    groups: [
      {
        title: "01 — Vision & Queue Estimation",
        items: [
          "Fine-tuned YOLOv8 on Indian urban traffic datasets (IITM-HeTra) for robust local vehicle detection.",
          "Built TinyTrack: lightweight IoU tracking with exponential moving average smoothing.",
          "Computes median stopped vehicle density inside custom polygon stop-line ROIs.",
        ],
      },
      {
        title: "02 — Signal FSM & Live Dashboard",
        items: [
          "Calculates clamped adaptive green duration (`base + k * queue + wait_bonus`) to stop lane starvation.",
          "Streams annotated real-time MJPEG feeds and live signal countdowns via Flask.",
        ],
      },
    ],
    pills: [
      "Python",
      "YOLOv8",
      "OpenCV",
      "Flask",
      "Computer Vision",
      "Signal FSM",
      "Real-Time Streaming",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/Adaptive-Traffic-Control-System",
  },
  {
    number: "04",
    slug: "causal-inventory-copilot",
    title: "Causal Retail Copilot",
    subtitle: "Conversational Inventory Diagnostics Concept",
    year: "2026",
    category: "Client Engagement",
    roles: ["ai", "ds"],
    isClientEngagement: true,
    clientBadge: "CLIENT ENGAGEMENT · IDEA & IMPACT",
    shopTone: "brick",
    headlineMetric: {
      value: "CAUSAL",
      label: "Conversational root-cause diagnostics bridging business questions & supply data",
    },
    stats: [
      { label: "SCOPE", value: "Client R&D" },
      { label: "DOMAIN", value: "Retail Ops" },
      { label: "FOCUS", value: "Root-Cause AI" },
      { label: "OUTCOME", value: "Decision Speed" },
    ],
    summary:
      "An enterprise decision-intelligence concept where retail operators ask plain-language diagnostic questions about stockouts or anomalies and receive structured, evidence-backed causal explanations rather than raw spreadsheet dumps.",
    previewHighlights: [
      "Multi-step conversational diagnostic reasoning",
      "Grounded evidence retrieval over business metrics",
      "Decision-ready executive insights",
    ],
    groups: [
      {
        title: "01 — The Core Idea",
        items: [
          "Bridges the gap between high-level retail KPIs and multi-layered operational root causes.",
          "Orchestrates specialized reasoning steps to isolate why inventory or sales metrics drifted.",
        ],
      },
      {
        title: "02 — Business Impact",
        items: [
          "Compresses hours of manual analyst cross-referencing into interactive diagnostic threads.",
          "Delivers transparent, auditable reasoning trails (proprietary architecture & stack omitted).",
        ],
      },
    ],
    pills: [
      "Client Engagement",
      "Causal Reasoning",
      "Retail Diagnostics",
      "Decision Intelligence",
    ],
  },
  {
    number: "05",
    slug: "gyastro",
    title: "GYAstro",
    subtitle: "Agentic Astrological Knowledge Engine",
    year: "2026",
    category: "AI Engineer · Systems",
    roles: ["ai", "backend"],
    isClientEngagement: false,
    shopTone: "ink",
    headlineMetric: {
      value: "D1–D16",
      label: "Precision astronomical math fused with ontology-backed multi-agent synthesis",
    },
    stats: [
      { label: "MATH CORE", value: "Swiss Ephem" },
      { label: "CHARTS", value: "9 Vargas" },
      { label: "DASHAS", value: "120-Yr Tree" },
      { label: "PROGRESS", value: "Phase 2" },
    ],
    summary:
      "An AI-driven reasoning engine combining Swiss Ephemeris astronomical calculations (D1–D16 divisional charts, Ashtakavarga, Nakshatras, Vimshottari Dashas) with structured graph ontology and specialized review agents.",
    previewHighlights: [
      "Exact planetary, Nakshatra & dignity calculations",
      "Structured domain ontology for non-hallucinated synthesis",
      "Multi-agent facet review & coherent Q&A",
    ],
    groups: [
      {
        title: "01 — Precision Calculation Engine",
        items: [
          "Computes 9 planetary positions, Ascendant, and D1–D16 divisional charts via Swiss Ephemeris.",
          "Generates Ashtakavarga bindus, Upagrahas, and 120-year Vimshottari Dashas to Pratyantardasha precision.",
        ],
      },
      {
        title: "02 — Knowledge Ontology & Synthesis",
        items: [
          "Maps planets, houses, signs, and aspects into structured graph relationships rather than static template lookup.",
          "Separates deterministic calculation from specialized interpretive synthesis.",
        ],
      },
    ],
    pills: [
      "Python",
      "Swiss Ephemeris",
      "Knowledge Graphs",
      "Multi-Agent AI",
      "Ontology Design",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/GYAstro",
  },
  {
    number: "06",
    slug: "uniapply",
    title: "UniApply",
    subtitle: "Dynamic Rule-Driven Application Marketplace",
    year: "2025",
    category: "Backend Developer",
    roles: ["backend"],
    isClientEngagement: false,
    shopTone: "red",
    headlineMetric: {
      value: "DYNAMIC",
      label: "Zero-code admin rule engine enforcing strict program eligibility & RBAC",
    },
    stats: [
      { label: "STACK", value: "TS / Node 20" },
      { label: "ORM / DB", value: "Prisma + PG" },
      { label: "AUTH", value: "JWT + RBAC" },
      { label: "DEPLOY", value: "Dockerized" },
    ],
    summary:
      "A full-stack two-sided marketplace connecting students and university admins, centered around a dynamic configurable eligibility rule engine, AI-simulated document verification, and referentially clean cascading persistence.",
    previewHighlights: [
      "No hardcoded rules: dynamic admin schema builder",
      "5-step student wizard with real-time bounds checks",
      "Split-view review console + hard-delete cascade",
    ],
    groups: [
      {
        title: "01 — Dynamic Eligibility & Validation",
        items: [
          "Admins author numeric bounds, boolean flags, and standardized enum schemas without touching code.",
          "Real-time validation prevents invalid GPA, percentage, or prerequisite submissions.",
        ],
      },
      {
        title: "02 — Backend Architecture & Security",
        items: [
          "Role-based JWT authorization separating Student Portal and Admin Review Console.",
          "PostgreSQL + Prisma relational integrity with containerized Docker deployment.",
        ],
      },
    ],
    pills: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "JWT & RBAC",
      "REST API",
      "Docker",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/Hero-Vired-Project",
  },
  {
    number: "07",
    slug: "site-engineer",
    title: "Site-Engineer",
    subtitle: "100% Local GPU AI Website Generator",
    year: "2025",
    category: "AI Engineer · Backend",
    roles: ["ai", "backend"],
    isClientEngagement: false,
    shopTone: "stone",
    headlineMetric: {
      value: "0 CLOUD",
      label: "Token-by-token live HTML/CSS/JS code generation streamed off local VRAM",
    },
    stats: [
      { label: "MODEL", value: "DeepSeek 6.7B" },
      { label: "RUNTIME", value: "llama.cpp" },
      { label: "BACKEND", value: "FastAPI" },
      { label: "LATENCY", value: "Live Stream" },
    ],
    summary:
      "A privacy-first local AI builder inspired by DeepSite that converts natural language prompts into responsive multi-file websites, streaming tokens directly from consumer GPU hardware into an interactive split editor and live preview.",
    previewHighlights: [
      "Zero API keys, zero cloud cost, full local privacy",
      "Custom system prompt tuned for clean responsive UI",
      "Real-time token streaming into live iframe preview",
    ],
    groups: [
      {
        title: "01 — Local Inference Engine",
        items: [
          "Executes quantized DeepSeek Coder 6.7B models locally with configurable GPU layer offloading.",
          "Eliminates external API latency and token quotas for rapid iterative prototyping.",
        ],
      },
      {
        title: "02 — Streaming Full-Stack Workspace",
        items: [
          "FastAPI streaming backend pipes live output tokens straight to a vanilla JS split preview.",
        ],
      },
    ],
    pills: [
      "Python",
      "FastAPI",
      "DeepSeek Coder 6.7B",
      "llama.cpp",
      "Streaming UI",
      "Bootstrap",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/Site-Engineer",
  },
  {
    number: "08",
    slug: "semantic-graph-discovery",
    title: "Semantic Graph Discovery",
    subtitle: "Enterprise Entity Resolution Concept",
    year: "2026",
    category: "Client Engagement",
    roles: ["ai", "ml"],
    isClientEngagement: true,
    clientBadge: "CLIENT ENGAGEMENT · IDEA & IMPACT",
    shopTone: "brick",
    headlineMetric: {
      value: "MULTI-HOP",
      label: "Connecting ambiguous entities with relational context for high-confidence retrieval",
    },
    stats: [
      { label: "SCOPE", value: "Client R&D" },
      { label: "DOMAIN", value: "Enterprise KG" },
      { label: "METHOD", value: "Hybrid Recall" },
      { label: "FOCUS", value: "Precision" },
    ],
    summary:
      "A discovery engine concept combining semantic similarity with structured multi-hop relationship traversal so complex domain queries resolve exact entities reliably across dense catalogs and schemas.",
    previewHighlights: [
      "Resolves synonyms & ambiguous queries via context",
      "Combines semantic meaning with structural relationships",
      "Strict confidence gating before evidence synthesis",
    ],
    groups: [
      {
        title: "01 — The Core Idea",
        items: [
          "Pure keyword search misses intent; pure vector search misses relational constraints.",
          "Pairing semantic embeddings with graph relationship context grounds discovery in verifiable entity paths.",
        ],
      },
      {
        title: "02 — Business Impact",
        items: [
          "Significantly reduces false positives in complex enterprise lookups (technical stack & thresholds confidential).",
        ],
      },
    ],
    pills: [
      "Client Engagement",
      "Entity Resolution",
      "Semantic Discovery",
      "Graph Reasoning Idea",
    ],
  },
  {
    number: "09",
    slug: "async-booking-api",
    title: "Async Booking Engine",
    subtitle: "Real-Time WebSocket & PostgreSQL Backend",
    year: "2026",
    category: "Backend Developer",
    roles: ["backend"],
    isClientEngagement: false,
    shopTone: "ink",
    headlineMetric: {
      value: "ASYNC",
      label: "Non-blocking appointment lifecycle with instant WebSocket state broadcast",
    },
    stats: [
      { label: "API", value: "FastAPI" },
      { label: "DRIVER", value: "asyncpg" },
      { label: "REALTIME", value: "WebSockets" },
      { label: "TESTS", value: "Pytest+HTTPX" },
    ],
    summary:
      "High-performance asynchronous REST & WebSocket service demonstrating clean OOP user inheritance, generator-managed database sessions, custom execution-timing decorators, and instant client slot synchronization.",
    previewHighlights: [
      "Role-based Client & Provider appointment lifecycle",
      "Live WebSocket slot broadcasts on booking mutations",
      "Protected X-API-KEY routes & automated HTTPX suite",
    ],
    groups: [
      {
        title: "01 — Asynchronous Core & Patterns",
        items: [
          "Built on SQLAlchemy asyncio + asyncpg for non-blocking PostgreSQL transactions.",
          "Implements custom decorators for endpoint timing/observability and generator session lifecycles.",
        ],
      },
      {
        title: "02 — Real-Time Sync & Testing",
        items: [
          "Broadcasts booking creates, updates, and cancellations instantaneously over WebSockets.",
          "Validated end-to-end with Pytest and async HTTPX test suites.",
        ],
      },
    ],
    pills: [
      "Python 3.13+",
      "FastAPI",
      "PostgreSQL",
      "asyncpg",
      "SQLAlchemy",
      "WebSockets",
      "Pytest",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/FastAPI-PostgresSQL",
  },
  {
    number: "10",
    slug: "canonical-data-shield",
    title: "Canonical Data & Quality Shield",
    subtitle: "Multi-Layer Observability & Retail Modeling Idea",
    year: "2026",
    category: "Client Engagement",
    roles: ["ds", "backend"],
    isClientEngagement: true,
    clientBadge: "CLIENT ENGAGEMENT · IDEA & IMPACT",
    shopTone: "red",
    headlineMetric: {
      value: "4-LAYER",
      label: "Automated anomaly tracing from reporting tables back to raw ingestion",
    },
    stats: [
      { label: "SCOPE", value: "Client R&D" },
      { label: "DOMAIN", value: "Data Quality" },
      { label: "MODELING", value: "Canonical" },
      { label: "TRACE", value: "End-to-End" },
    ],
    summary:
      "An enterprise data governance and canonical modeling initiative pairing declarative quality contracts with reverse-lineage diagnostics—pinpointing the exact upstream source of downstream inconsistencies while aligning retail data schemas to unified outcome packages.",
    previewHighlights: [
      "Declarative contract checks across data tiers",
      "Automated root-cause isolation across lineage layers",
      "Canonical domain modeling for scalable retail analytics",
    ],
    groups: [
      {
        title: "01 — The Core Idea",
        items: [
          "Shifts reactive data debugging into proactive, declarative contract verification.",
          "Unifies fragmented retail entities into reusable canonical packages aligned to business outcomes.",
        ],
      },
      {
        title: "02 — Business Impact",
        items: [
          "Accelerates data anomaly triage across multi-hop pipelines and prevents bad ingestion from reaching analytics.",
        ],
      },
    ],
    pills: [
      "Client Engagement",
      "Data Observability",
      "Canonical Data Modeling",
      "Root-Cause Lineage",
    ],
  },
  {
    number: "11",
    slug: "ml-predictive-suite",
    title: "Predictive ML & NLP Suite",
    subtitle: "Churn ROC-AUC, Placement SVM & Language ID",
    year: "2025",
    category: "Data Scientist · ML",
    roles: ["ds", "ml"],
    isClientEngagement: false,
    shopTone: "stone",
    headlineMetric: {
      value: "LIVE ML",
      label: "From feature engineering & ROC-AUC benchmarking to live Streamlit apps",
    },
    stats: [
      { label: "CHURN", value: "LightGBM" },
      { label: "PLACEMENT", value: "SVM / LR" },
      { label: "NLP", value: "Lang Detect" },
      { label: "APP", value: "Streamlit" },
    ],
    summary:
      "A cohesive suite of applied ML & Data Science projects covering bank customer churn prediction (LightGBM + ROC-AUC evaluation), live deployed student placement prediction (SVM + Logistic Regression on Streamlit), and multi-lingual NLP classification.",
    previewHighlights: [
      "Deployed interactive Streamlit inference app",
      "Comparative ROC-AUC evaluation on banking churn",
      "End-to-end feature scaling & NLP tokenization",
    ],
    groups: [
      {
        title: "01 — Tabular Modeling & Deployment",
        items: [
          "Evaluated LightGBM and ensemble classifiers on imbalanced bank churn datasets using ROC-AUC.",
          "Shipped an interactive SVM-based Placement Prediction web app hosted live on Streamlit.",
        ],
      },
      {
        title: "02 — Text & Feature Foundations",
        items: [
          "Built NLP Language Detection pipelines alongside reproducible EDA, PCA, and feature selection templates.",
        ],
      },
    ],
    pills: [
      "Python",
      "Scikit-Learn",
      "LightGBM",
      "SVM",
      "Pandas",
      "ROC-AUC",
      "NLP",
      "Streamlit",
    ],
    githubUrl: "https://github.com/FR34KY-CODER/Customer-Churn-Prediction-Using-ML",
    liveUrl: "https://placement-prediction-using-machine-learning-algorithms-cmy2s3s.streamlit.app/",
  },
  {
    number: "12",
    slug: "open-retail-data-model",
    title: "Open Retail Data Model",
    subtitle: "Databricks Industry Solutions · Open Source",
    year: "2026",
    category: "Open Source · Databricks Data Model",
    roles: ["ds", "backend"],
    isClientEngagement: false,
    shopTone: "brick",
    headlineMetric: {
      value: "4.2K+ ODCS",
      label: "Canonical Inventory core + 12 Balancing Margin & Volume metric views shipped to Databricks OSS",
    },
    stats: [
      { label: "ODCS SPEC", value: "4,473 Lines" },
      { label: "GOLD LAYER", value: "11 Views" },
      { label: "METRICS", value: "12 Views" },
      { label: "QUALITY", value: "565+ SQL" },
    ],
    summary:
      "Collaborated remotely alongside Databricks Industry Solutions engineers to design and publish canonical retail data models and outcome packages to the official Databricks Open Retail Data Model (ORDM) repository.",
    previewHighlights: [
      "Authored canonical-core/inventory DDL, ODCS contract & ERD lineage",
      "Shipped Balancing Margin & Volume package with 12 metric views & 11 Gold tables",
      "Built 515+ lines of automated SQL data quality checks & comments",
    ],
    groups: [
      {
        title: "01 — Canonical Core · Inventory Foundation",
        items: [
          "Published canonical-core/inventory table definitions (inventory_position.sql), relationship keys, and 237-line Open Data Contract Standard (inventory.odcs.yaml).",
          "Delivered Mermaid & DBML entity-relationship diagrams alongside standardized retail terminology glossary.",
        ],
      },
      {
        title: "02 — Outcome Package · Balancing Margin & Volume",
        items: [
          "Authored a 4,236-line ODCS specification, 11 Gold-tier analytical tables, and 12 semantic metric views to unify retail pricing, margin, and stockout trade-off analytics.",
          "Implemented 515+ lines of automated SQL quality assertions, executable sample datasets, and validation notebooks.",
        ],
      },
    ],
    pills: [
      "Databricks",
      "ODCS YAML",
      "SQL DDL",
      "Gold Lakehouse",
      "Data Contracts",
      "Dimensional Modeling",
      "Metric Views",
      "Open Source",
    ],
    githubUrl: "https://github.com/databricks-industry-solutions/open-retail-data-model",
  },
];

