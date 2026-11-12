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
}

const KgHubNode = memo(function KgHubNode({ data }: NodeProps<Node<KgNodeData>>) {
  return (
    <div
      className="relative flex items-center gap-2 rounded-2xl border-2 px-4 py-2.5 shadow-lg backdrop-blur-md transition-transform hover:scale-105 cursor-grab active:cursor-grabbing"
      style={{
        borderColor: data.accentColor,
        backgroundColor: "rgba(11, 14, 20, 0.96)",
        boxShadow: `0 0 28px -6px ${data.accentColor}88`,
      }}
    >
      <Cpu size={14} style={{ color: data.accentColor }} />
      <span className="font-mono text-[11px] font-black tracking-[0.14em] uppercase text-[#f4f1ea]">
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
  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl border px-3 py-2 shadow-md transition-all hover:scale-105 cursor-pointer"
      style={{
        borderColor: data.accentColor,
        backgroundColor: "rgba(18, 22, 31, 0.94)",
      }}
    >
      <FolderGit2 size={12} style={{ color: data.accentColor }} />
      <div className="flex flex-col">
        <span className="font-mono text-[8px] tracking-[0.14em] uppercase text-[#f4f1ea]/55">
          PROJECT CASE
        </span>
        <span className="font-mono text-[11px] font-bold text-[#f4f1ea]">
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
  return (
    <div
      className="relative flex items-center gap-1.5 rounded-full border border-[#f4f1ea]/22 bg-[#0f131b]/92 px-3 py-1.5 shadow-sm transition-transform hover:scale-105 cursor-grab"
    >
      <Layers size={10} className="text-[#f4f1ea]/70" />
      <span className="font-mono text-[10px] font-semibold tracking-[0.04em] text-[#f4f1ea]/90">
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
}

export function RoleKnowledgeGraph({
  roleId,
  accentColor,
  active,
  fullPage = false,
}: RoleKnowledgeGraphProps) {
  const router = useRouter();
  const { setHoverInfo } = useRole();
  const graph = ROLE_KNOWLEDGE_GRAPHS[roleId];

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
      },
    }));
  }, [graph.nodes, accentColor, fullPage]);

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
        opacity: active ? 0.72 : 0.25,
      },
    }));
  }, [graph.edges, roleId, accentColor, active]);

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
        key={`${roleId}-${fullPage ? "full" : "tile"}`}
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
            color="rgba(244,241,234,0.16)"
          />
        )}
        <FitViewSync fullPage={fullPage} />
        {fullPage && (
          <Controls
            showInteractive={false}
            className="!bg-[#0f1217]/90 !border-[#f4f1ea]/18 !rounded-xl [&>button]:!bg-[#161b24] [&>button]:!border-[#f4f1ea]/12 [&>button]:!fill-[#f4f1ea]"
          />
        )}
      </ReactFlow>
    </div>
  );
}
