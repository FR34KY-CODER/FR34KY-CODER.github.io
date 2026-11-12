import { CoreRoleId } from "./roles";

export interface KnowledgeNode {
  id: string;
  label: string;
  kind: "hub" | "project" | "skill";
  x: number; // percentage 0-100 inside graph viewBox 0..420 x 0..320
  y: number;
  info: string;
  href?: string;
}

export interface KnowledgeEdge {
  from: string;
  to: string;
}

export interface RoleGraphData {
  roleId: CoreRoleId;
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

export const ROLE_KNOWLEDGE_GRAPHS: Record<CoreRoleId, RoleGraphData> = {
  ai: {
    roleId: "ai",
    nodes: [
      {
        id: "hub-ai",
        label: "AI ENGINEER",
        kind: "hub",
        x: 210,
        y: 160,
        info: "Agentic orchestration, hybrid RAG pipelines & deterministic safety bounds.",
      },
      {
        id: "p-lexnext",
        label: "LexNext.AI",
        kind: "project",
        x: 92,
        y: 72,
        info: "10,000+ Supreme Court judgments parsed, classified & queried via hybrid RAG.",
        href: "/work/lexnext-ai",
      },
      {
        id: "p-gyastro",
        label: "GYAstro",
        kind: "project",
        x: 325,
        y: 78,
        info: "Knowledge-grounded multi-agent synthesis over structured ephemeris graphs.",
        href: "/work/gyastro",
      },
      {
        id: "p-site-eng",
        label: "Site-Engineer",
        kind: "project",
        x: 334,
        y: 238,
        info: "Zero-cloud local GPU code generation & SSE token streaming.",
        href: "/work/site-engineer",
      },
      {
        id: "s-langgraph",
        label: "LangGraph · MCP",
        kind: "skill",
        x: 84,
        y: 238,
        info: "Stateful multi-agent workflows, tool contracts & controlled execution.",
      },
      {
        id: "s-rag",
        label: "Hybrid RAG",
        kind: "skill",
        x: 210,
        y: 44,
        info: "Combines semantic embeddings, LexRank centrality & grounded Q&A.",
      },
      {
        id: "s-local",
        label: "Llama 3.1 / Local GPU",
        kind: "skill",
        x: 210,
        y: 278,
        info: "Low-latency local LLM inference via llama.cpp & quantized runtimes.",
      },
    ],
    edges: [
      { from: "hub-ai", to: "p-lexnext" },
      { from: "hub-ai", to: "p-gyastro" },
      { from: "hub-ai", to: "p-site-eng" },
      { from: "hub-ai", to: "s-langgraph" },
      { from: "hub-ai", to: "s-rag" },
      { from: "hub-ai", to: "s-local" },
      { from: "s-rag", to: "p-lexnext" },
      { from: "s-local", to: "p-site-eng" },
      { from: "s-langgraph", to: "p-gyastro" },
    ],
  },
  backend: {
    roleId: "backend",
    nodes: [
      {
        id: "hub-be",
        label: "BACKEND DEV",
        kind: "hub",
        x: 210,
        y: 160,
        info: "High-throughput async APIs, transactional rules, OAuth 2.1 & real-time streams.",
      },
      {
        id: "p-uniapply",
        label: "UniApply",
        kind: "project",
        x: 92,
        y: 78,
        info: "Configurable RBAC + schema-driven eligibility engine with TypeScript & Prisma.",
        href: "/work/uniapply",
      },
      {
        id: "p-booking",
        label: "Async Booking API",
        kind: "project",
        x: 325,
        y: 74,
        info: "Non-blocking FastAPI + PostgreSQL asyncpg engine with live WebSocket sync.",
        href: "/work/async-booking-api",
      },
      {
        id: "p-commerce",
        label: "Autonomous Commerce",
        kind: "project",
        x: 330,
        y: 240,
        info: "Client R&D: Event-driven conditional execution concept (idea & impact only).",
        href: "/work/autonomous-commerce",
      },
      {
        id: "s-fastapi",
        label: "FastAPI + AsyncPG",
        kind: "skill",
        x: 88,
        y: 240,
        info: "Concurrent Python APIs, connection pooling, custom timing & SSE streaming.",
      },
      {
        id: "s-oauth",
        label: "OAuth 2.1 / Keycloak",
        kind: "skill",
        x: 210,
        y: 44,
        info: "Zero-trust RS256/JWKS verification, RBAC & cryptographic session boundaries.",
      },
      {
        id: "s-ws",
        label: "PostgreSQL · WS",
        kind: "skill",
        x: 210,
        y: 278,
        info: "ACID relational modeling paired with bidirectional event channels.",
      },
    ],
    edges: [
      { from: "hub-be", to: "p-uniapply" },
      { from: "hub-be", to: "p-booking" },
      { from: "hub-be", to: "p-commerce" },
      { from: "hub-be", to: "s-fastapi" },
      { from: "hub-be", to: "s-oauth" },
      { from: "hub-be", to: "s-ws" },
      { from: "s-fastapi", to: "p-booking" },
      { from: "s-oauth", to: "p-uniapply" },
      { from: "s-ws", to: "p-booking" },
    ],
  },
  ds: {
    roleId: "ds",
    nodes: [
      {
        id: "hub-ds",
        label: "DATA SCIENTIST",
        kind: "hub",
        x: 210,
        y: 160,
        info: "Canonical lakehouse contracts, causal inference, SQL checks & statistical modeling.",
      },
      {
        id: "p-ordm",
        label: "Databricks ORDM",
        kind: "project",
        x: 92,
        y: 74,
        info: "Open source contribution to Databricks: Canonical Inventory + Margin/Volume contracts.",
        href: "/work/open-retail-data-model",
      },
      {
        id: "p-shield",
        label: "Canonical Shield",
        kind: "project",
        x: 325,
        y: 78,
        info: "Client Idea & Impact: automated cross-layer data quality contracts & diagnostics.",
        href: "/work/canonical-data-shield",
      },
      {
        id: "p-causal",
        label: "Causal Copilot",
        kind: "project",
        x: 332,
        y: 238,
        info: "Client Idea & Impact: explaining retail KPI swings with root-cause attribution.",
        href: "/work/causal-inventory-copilot",
      },
      {
        id: "s-odcs",
        label: "Databricks · ODCS",
        kind: "skill",
        x: 84,
        y: 238,
        info: "4,400+ lines of Open Data Contract Standard specs, Gold tables & metric views.",
      },
      {
        id: "s-sql",
        label: "SQL Quality Checks",
        kind: "skill",
        x: 210,
        y: 44,
        info: "515+ SQL integrity assertions guarding schema drift & medallion anomalies.",
      },
      {
        id: "s-eda",
        label: "EDA · ROC-AUC",
        kind: "skill",
        x: 210,
        y: 278,
        info: "Feature pipelines, PCA, statistical attribution & imbalanced evaluation.",
      },
    ],
    edges: [
      { from: "hub-ds", to: "p-ordm" },
      { from: "hub-ds", to: "p-shield" },
      { from: "hub-ds", to: "p-causal" },
      { from: "hub-ds", to: "s-odcs" },
      { from: "hub-ds", to: "s-sql" },
      { from: "hub-ds", to: "s-eda" },
      { from: "s-odcs", to: "p-ordm" },
      { from: "s-sql", to: "p-shield" },
      { from: "s-eda", to: "p-causal" },
    ],
  },
  ml: {
    roleId: "ml",
    nodes: [
      {
        id: "hub-ml",
        label: "ML ENGINEER",
        kind: "hub",
        x: 210,
        y: 160,
        info: "Computer vision (YOLOv8), Sentence-BERT embeddings, LightGBM & CUDA serving.",
      },
      {
        id: "p-traffic",
        label: "Adaptive Traffic",
        kind: "project",
        x: 92,
        y: 74,
        info: "Fine-tuned YOLOv8 + TinyTrack IoU smoothing optimizing dynamic signal phases.",
        href: "/work/adaptive-traffic",
      },
      {
        id: "p-lexnext-ml",
        label: "LexNext Embeds",
        kind: "project",
        x: 325,
        y: 78,
        info: "Max-pooled BAAI/bge-small-en + LexRank + BART legal classifier & summarizer.",
        href: "/work/lexnext-ai",
      },
      {
        id: "p-suite",
        label: "Predictive ML Suite",
        kind: "project",
        x: 332,
        y: 238,
        info: "LightGBM churn scoring + live Streamlit SVM placement prediction app.",
        href: "/work/ml-predictive-suite",
      },
      {
        id: "s-yolo",
        label: "YOLOv8 · OpenCV",
        kind: "skill",
        x: 86,
        y: 238,
        info: "Real-time object detection, ROI filtering & EMA stabilization.",
      },
      {
        id: "s-torch",
        label: "PyTorch · BERT",
        kind: "skill",
        x: 210,
        y: 44,
        info: "Deep learning from scratch, transformers, cosine semantic scoring.",
      },
      {
        id: "s-boost",
        label: "XGBoost · LGBM",
        kind: "skill",
        x: 210,
        y: 278,
        info: "Gradient boosted ensembles, SVMs & calibrated classification pipelines.",
      },
    ],
    edges: [
      { from: "hub-ml", to: "p-traffic" },
      { from: "hub-ml", to: "p-lexnext-ml" },
      { from: "hub-ml", to: "p-suite" },
      { from: "hub-ml", to: "s-yolo" },
      { from: "hub-ml", to: "s-torch" },
      { from: "hub-ml", to: "s-boost" },
      { from: "s-yolo", to: "p-traffic" },
      { from: "s-torch", to: "p-lexnext-ml" },
      { from: "s-boost", to: "p-suite" },
    ],
  },
};

