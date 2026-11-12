import { PROJECTS } from "@/data/projects";
import { FACTORY_CRATES } from "@/data/factory";
import { PROFILE } from "@/data/profile";
import { CORE_ROLES, ROLES } from "@/data/roles";

export interface BotActionLink {
  label: string;
  href: string;
}

export interface BotReply {
  id: string;
  sender: "user" | "bot";
  text: string;
  badge?: string;
  links?: BotActionLink[];
}

const STOP_WORDS_REGEX =
  /\b(hey|hi|hello|please|can you|could you|would you|tell me|show me|give me|what|which|who|where|how|about|regarding|for|with|uses?|using|built|made|does|have|has|any|the|a|an|in|of|to|on|me|your|ojasvi|goyal|projects?|work|built|is|are)\b/gi;

function stripFiller(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[?!.,'":;()]/g, " ")
    .replace(STOP_WORDS_REGEX, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findProjectMatch(query: string) {
  const q = query.toLowerCase();
  if (!q) return null;
  return (
    PROJECTS.find(
      (p) =>
        p.slug.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        q.includes(p.slug.toLowerCase()) ||
        q.includes(p.title.toLowerCase())
    ) ||
    PROJECTS.find((p) => {
      const hay = `${p.title} ${p.subtitle} ${p.category} ${p.summary} ${
        p.isClientEngagement ? "" : p.pills.join(" ")
      }`.toLowerCase();
      return q.split(/\s+/).some((tok) => tok.length > 2 && hay.includes(tok));
    })
  );
}

function formatProjectReply(p: (typeof PROJECTS)[number]): Omit<BotReply, "id" | "sender"> {
  if (p.isClientEngagement) {
    return {
      badge: `CLIENT ENGAGEMENT · IDEA & IMPACT`,
      text: `${p.title} (${p.year}) — ${p.headlineMetric.value}: ${p.headlineMetric.label}. ${p.summary} (Internal stacks & code kept private per NDA.)`,
      links: [{ label: `Read ${p.title} Idea Brief →`, href: `/work/${p.slug}` }],
    };
  }
  const crateMatches = FACTORY_CRATES.filter((c) =>
    p.githubUrl && c.githubUrl.toLowerCase().includes(p.githubUrl.split("/").pop()?.toLowerCase() || "__none__")
  );
  const crateNote =
    crateMatches.length > 0
      ? ` Related module(s): ${crateMatches.map((c) => c.name).join(", ")}.`
      : "";
  return {
    badge: `OPEN SOURCE · ${p.category.toUpperCase()}`,
    text: `${p.title} (${p.year}) — ${p.headlineMetric.value}: ${p.headlineMetric.label}. Key tools: ${p.pills.slice(0, 6).join(", ")}.${crateNote}`,
    links: [
      { label: `Open Case Study →`, href: `/work/${p.slug}` },
      ...(p.githubUrl ? [{ label: `GitHub Repo ↗`, href: p.githubUrl }] : []),
    ],
  };
}

export function resolveDevBotQuery(rawInput: string): Omit<BotReply, "id" | "sender"> {
  const input = rawInput.trim();
  const lower = input.toLowerCase();

  // Explicit slash commands first
  if (lower === "/help" || lower === "help") {
    return {
      badge: "COMMAND & NL ROUTER",
      text: "Ask in natural language or try commands: /project LexNext.AI · /project Open Retail · /skill FastAPI · /edu · /achievements · /roles · /links · /contact",
    };
  }

  if (lower.startsWith("/contact") || /\b(hire|contact|email|reach out|message|mail|recruit)\b/i.test(input)) {
    return {
      badge: "DISPATCH RELAY",
      text: "You can dispatch a structured HTML mission brief right from /contact — themed around \"The Visitor is interested in contacting you!\" with instant preview & direct delivery.",
      links: [
        { label: "Open Contact Dispatch →", href: "/contact" },
        { label: `Mail ${PROFILE.email}`, href: `mailto:${PROFILE.email}` },
      ],
    };
  }

  if (
    lower.startsWith("/edu") ||
    /\b(education|college|university|lnmiit|degree|btech|b\.tech|study|studied|licai)\b/i.test(input)
  ) {
    return {
      badge: "EDUCATION & RESEARCH",
      text: `${PROFILE.educationDetail.degree} at ${PROFILE.educationDetail.institution} (${PROFILE.educationDetail.period}, ${PROFILE.educationDetail.location}). ${PROFILE.educationDetail.research}.`,
      links: [{ label: "See LexNext Research →", href: "/work/lexnext-ai" }],
    };
  }

  if (
    lower.startsWith("/ach") ||
    /\b(achievement|award|gdg|google developer|unity|game dev|databricks|ordm|open source|contribution|highlight|milestone)\b/i.test(
      input
    )
  ) {
    return {
      badge: "ACHIEVEMENTS & RESUME HIGHLIGHTS",
      text: PROFILE.achievements
        .map((ach, idx) => `(${idx + 1}) ${ach.shortTitle}: ${ach.metric}`)
        .join(" · "),
      links: [
        { label: "Databricks ORDM Case Study →", href: "/work/open-retail-data-model" },
        {
          label: "Databricks OSS Repo ↗",
          href: "https://github.com/databricks-industry-solutions/open-retail-data-model",
        },
        { label: "LexNext Research →", href: "/work/lexnext-ai" },
      ],
    };
  }

  if (
    lower.startsWith("/links") ||
    /\b(github|linkedin|leetcode|kaggle|medium|social|links?|profiles?)\b/i.test(input)
  ) {
    return {
      badge: "VERIFIED PROFILES",
      text: `All verified profiles: GitHub (${PROFILE.handle}), LinkedIn (ojasvi-goyal), LeetCode (DSA_FR34K), Kaggle (ojasvigoyal), and Medium (@fr34ky-coder).`,
      links: PROFILE.socials.map((s) => ({ label: `${s.label} ↗`, href: s.href })),
    };
  }

  if (lower.startsWith("/roles") || /\b(roles?|four|disciplines?|what do you do)\b/i.test(input)) {
    return {
      badge: "4 ROLES UNDER ONE HOOD",
      text: CORE_ROLES.map((r) => `${r.code} ${r.title}: ${r.heroSplitLeft.subline}`).join(" | "),
      links: CORE_ROLES.map((r) => ({ label: `${r.shortLabel} Work →`, href: `/work?role=${r.id}` })),
    };
  }

  // Explicit /project <name>
  if (lower.startsWith("/project")) {
    const q = input.replace(/^\/projects?\s*/i, "").trim();
    const matched = findProjectMatch(q);
    if (matched) return formatProjectReply(matched);
    return {
      badge: "PROJECT INDEX (12)",
      text: `Specify a project name! Available: ${PROJECTS.map((p) => p.title).join(", ")}.`,
      links: [{ label: "Browse All Work →", href: "/work" }],
    };
  }

  // Explicit /skill <name> or skill-based matching across projects + crates
  const isSkillCmd = lower.startsWith("/skill");
  const stripped = stripFiller(isSkillCmd ? input.replace(/^\/skills?\s*/i, "") : input);

  // Check if query matches a role directly
  const roleAlias: Record<string, keyof typeof ROLES> = {
    ai: "ai",
    agent: "ai",
    rag: "ai",
    llm: "ai",
    backend: "backend",
    api: "backend",
    server: "backend",
    ds: "ds",
    data: "ds",
    databricks: "ds",
    ml: "ml",
    vision: "ml",
    yolo: "ml",
    yolov8: "ml",
    pytorch: "ml",
  };

  if (isSkillCmd || stripped) {
    const tokens = stripped.split(/\s+/).filter((t) => t.length > 1);

    // First look for matching open-source projects + factory crates by skill tag/pill
    const matchingProjects = PROJECTS.filter((p) => {
      if (p.isClientEngagement) {
        // Never match client projects on hidden stack keywords; only problem/domain keywords
        return tokens.some((t) =>
          `${p.title} ${p.subtitle} ${p.summary}`.toLowerCase().includes(t)
        );
      }
      const hay = `${p.title} ${p.subtitle} ${p.pills.join(" ")} ${p.summary}`.toLowerCase();
      return tokens.some((t) => hay.includes(t));
    });

    const matchingCrates = FACTORY_CRATES.filter((c) => {
      const hay = `${c.name} ${c.tag} ${c.summary} ${c.roleLabel}`.toLowerCase();
      return tokens.some((t) => hay.includes(t));
    });

    // If user named a specific project directly in natural language
    const exactProj = findProjectMatch(stripped);
    if (!isSkillCmd && exactProj && (tokens.length <= 3 || lower.includes(exactProj.title.toLowerCase()))) {
      return formatProjectReply(exactProj);
    }

    if (matchingProjects.length > 0 || matchingCrates.length > 0) {
      const projNames = matchingProjects.slice(0, 4).map((p) => p.title);
      const crateNames = matchingCrates.slice(0, 3).map((c) => c.name);
      return {
        badge: `SKILL MATCH · "${stripped.toUpperCase()}"`,
        text: `${projNames.length ? `Projects using ${stripped}: ${projNames.join(", ")}. ` : ""}${
          crateNames.length ? `Factory modules: ${crateNames.join(", ")}.` : ""
        }`.trim(),
        links: matchingProjects.slice(0, 3).map((p) => ({
          label: `${p.title} →`,
          href: `/work/${p.slug}`,
        })),
      };
    }

    const matchedRoleKey = tokens.map((t) => roleAlias[t]).find(Boolean);
    if (matchedRoleKey && matchedRoleKey !== "all") {
      const r = ROLES[matchedRoleKey];
      return {
        badge: `ROLE PROFILE · ${r.shortLabel}`,
        text: `${r.title} (${r.code}) — ${r.heroSplitLeft.headline} ${r.heroSplitLeft.subline}`,
        links: [{ label: `Filter ${r.shortLabel} Work →`, href: `/work?role=${r.id}` }],
      };
    }
  }

  return {
    badge: "DETERMINISTIC DEVBOT",
    text: `Didn't match "${input}" directly. Try asking about a skill (FastAPI, Databricks, YOLOv8, LangGraph), a project (/project LexNext.AI, Open Retail), /edu, /achievements, /links, or /contact.`,
    links: [
      { label: "View All 12 Projects →", href: "/work" },
      { label: "Open /contact →", href: "/contact" },
    ],
  };
}

