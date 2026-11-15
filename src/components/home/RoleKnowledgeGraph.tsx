"use client";

import React, { memo, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Handle,
  Node,
  NodeProps,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { ArrowUpRight, Cpu, FolderGit2, Layers } from "lucide-react";
import { KnowledgeNode, ROLE_KNOWLEDGE_GRAPHS } from "@/data/knowledgeGraph";
import { CoreRoleId } from "@/data/roles";
import { useRole } from "@/context/RoleContext";
import { triggerRouteNavigation } from "@/lib/navigation";

interface KgNodeData extends Record<string, unknown> {
  label: string;
  kind: KnowledgeNode["kind"];
  info: string;
  href?: string;
  accentColor: string;
  theme?: "paper" | "night";
}

const KgHubNode = memo(function KgHubNode({ data }: NodeProps<Node<KgNodeData>>) {
  const isPaper = data.theme !== "night";
  return (
    <div
      className="relative flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 shadow-md backdrop-blur-md transition-transform hover:scale-105 cursor-grab active:cursor-grabbing"
      style={{
        borderColor: data.accentColor,
        backgroundColor: isPaper ? "rgba(255, 255, 255, 0.98)" : "rgba(11, 14, 20, 0.96)",
        boxShadow: isPaper
          ? `0 6px 20px -6px ${data.accentColor}44, 0 2px 6px rgba(15,18,23,0.06)`
          : `0 0 28px -6px ${data.accentColor}88`,
      }}
    >
      <Cpu size={14} style={{ color: data.accentColor }} />
      <span
        className={`font-mono text-[11px] font-black tracking-[0.14em] uppercase ${
          isPaper ? "text-[#0f1217]" : "text-[#f4f1ea]"
        }`}
      >
        {data.label}
      </span>
      <Handle type="source" position={Position.Right} className="!opacity-0" />
      <Handle type="source" position={Position.Left} className="!opacity-0" />
      <Handle type="source" position={Position.Top} className="!opacity-0" />
      <Handle type="source" position={Position.Bottom} className="!opacity-0" />
    </div>
  );
});

const KgProjectNode = memo(function KgProjectNode({ data }: NodeProps<Node<KgNodeData>>) {
  const isPaper = data.theme !== "night";
  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl border px-3 py-2 shadow-xs transition-all hover:scale-105 cursor-pointer"
      style={{
        borderColor: data.accentColor,
        backgroundColor: isPaper ? "rgba(255, 255, 255, 0.96)" : "rgba(18, 22, 31, 0.94)",
        boxShadow: isPaper ? "0 4px 12px -3px rgba(15,18,23,0.08)" : "none",
      }}
    >
      <FolderGit2 size={12} style={{ color: data.accentColor }} />
      <div className="flex flex-col">
        <span
          className={`font-mono text-[8px] tracking-[0.14em] uppercase ${
            isPaper ? "text-[#6f685d]" : "text-[#f4f1ea]/55"
          }`}
        >
          PROJECT CASE
        </span>
        <span
          className={`font-mono text-[11px] font-bold ${
            isPaper ? "text-[#0f1217]" : "text-[#f4f1ea]"
          }`}
        >
          {data.label}
        </span>
      </div>
      {data.href && <ArrowUpRight size={11} style={{ color: data.accentColor }} />}
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0" />
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0" />
      <Handle type="source" position={Position.Right} className="!opacity-0" />
    </div>
  );
});

const KgSkillNode = memo(function KgSkillNode({ data }: NodeProps<Node<KgNodeData>>) {
  const isPaper = data.theme !== "night";
  return (
    <div
      className={`relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-xs transition-transform hover:scale-105 cursor-grab ${
        isPaper
          ? "border-[#0f1217]/14 bg-[#ffffff]/90 text-[#0f1217]"
          : "border-[#f4f1ea]/22 bg-[#0f131b]/92 text-[#f4f1ea]/90"
      }`}
    >
      <Layers size={10} className={isPaper ? "text-[#6f685d]" : "text-[#f4f1ea]/70"} />
      <span className="font-mono text-[10px] font-semibold tracking-[0.04em]">
        {data.label}
      </span>
      <Handle type="target" position={Position.Top} className="!opacity-0" />
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <Handle type="target" position={Position.Right} className="!opacity-0" />
      <Handle type="target" position={Position.Bottom} className="!opacity-0" />
    </div>
  );
});

const NODE_TYPES = {
  kgHub: KgHubNode,
  kgProject: KgProjectNode,
  kgSkill: KgSkillNode,
};

function FitViewSync({ fullPage }: { fullPage: boolean }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const t1 = window.setTimeout(() => fitView({ padding: fullPage ? 0.16 : 0.14, duration: 280 }), 120);
    const t2 = window.setTimeout(() => fitView({ padding: fullPage ? 0.16 : 0.14, duration: 280 }), 740);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [fitView, fullPage]);
  return null;
}

interface RoleKnowledgeGraphProps {
  roleId: CoreRoleId;
  accentColor: string;
  active: boolean;
  fullPage?: boolean;
  theme?: "paper" | "night";
}

export function RoleKnowledgeGraph({
  roleId,
  accentColor,
  active,
  fullPage = false,
  theme = "paper",
}: RoleKnowledgeGraphProps) {
  const router = useRouter();
  const { setHoverInfo } = useRole();
  const graph = ROLE_KNOWLEDGE_GRAPHS[roleId];
  const isPaper = theme !== "night";

  const builtNodes = useMemo<Node<KgNodeData>[]>(() => {
    const scaleX = fullPage ? 1.58 : 1.18;
    const scaleY = fullPage ? 1.32 : 0.96;

    return graph.nodes.map((node) => ({
      id: node.id,
      type:
        node.kind === "hub"
          ? "kgHub"
          : node.kind === "project"
            ? "kgProject"
            : "kgSkill",
      position: {
        x: Math.round(node.x * scaleX),
        y: Math.round(node.y * scaleY),
      },
      data: {
        label: node.label,
        kind: node.kind,
        info: node.info,
        href: node.href,
        accentColor,
        theme,
      },
    }));
  }, [graph.nodes, accentColor, fullPage, theme]);

  const builtEdges = useMemo<Edge[]>(() => {
    return graph.edges.map((edge, idx) => ({
      id: `${roleId}-e-${idx}`,
      source: edge.from,
      target: edge.to,
      animated: active,
      type: "smoothstep",
      style: {
        stroke: accentColor,
        strokeWidth: active ? 2 : 1.25,
        strokeDasharray: active ? "5 4" : "3 3",
        opacity: active ? (isPaper ? 0.85 : 0.72) : (isPaper ? 0.35 : 0.25),
      },
    }));
  }, [graph.edges, roleId, accentColor, active, isPaper]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<KgNodeData>>(builtNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(builtEdges);

  useEffect(() => {
    setNodes(builtNodes);
  }, [builtNodes, setNodes]);

  useEffect(() => {
    setEdges(builtEdges);
  }, [builtEdges, setEdges]);

  return (
    <div
      className="relative h-full w-full select-none"
      aria-label={`${roleId} interactive knowledge graph`}
    >
      <ReactFlow
        key={`${roleId}-${fullPage ? "full" : "tile"}-${theme}`}
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        minZoom={0.4}
        maxZoom={1.8}
        fitViewOptions={{ padding: fullPage ? 0.12 : 0.14 }}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        preventScrolling={false}
        panOnDrag={fullPage}
        nodesDraggable={fullPage}
        nodesConnectable={false}
        elementsSelectable={fullPage}
        proOptions={{ hideAttribution: true }}
        onNodeMouseEnter={(_, node) => {
          setHoverInfo({
            badge: `${node.data.kind.toUpperCase()} · ${roleId.toUpperCase()} GRAPH`,
            title: node.data.label,
            detail: node.data.info + (node.data.href ? " · Click node for case study." : ""),
            accent: accentColor,
          });
        }}
        onNodeMouseLeave={() => setHoverInfo(null)}
        onNodeClick={(_, node) => {
          if (node.data.href) {
            triggerRouteNavigation(node.data.href, router);
          }
        }}
      >
        <FitViewSync fullPage={fullPage} />
        {fullPage && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1.2}
            color={isPaper ? "rgba(15,18,23,0.12)" : "rgba(244,241,234,0.16)"}
          />
        )}
        <FitViewSync fullPage={fullPage} />
        {fullPage && (
          <Controls
            showInteractive={false}
            className={
              isPaper
                ? "!bg-[#ffffff] !border-[#0f1217]/14 !rounded-xl !shadow-md [&>button]:!bg-[#f4f1ea] [&>button]:!border-[#0f1217]/10 [&>button]:!fill-[#0f1217]"
                : "!bg-[#0f1217]/90 !border-[#f4f1ea]/18 !rounded-xl [&>button]:!bg-[#161b24] [&>button]:!border-[#f4f1ea]/12 [&>button]:!fill-[#f4f1ea]"
            }
          />
        )}
      </ReactFlow>
    </div>
  );
}
