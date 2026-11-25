import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react';
import {
  DEPLOYMENT_PROFILES,
  PATHWAY_PILLARS,
  WALKTHROUGH_TRACES,
} from '../data/pathwayData';
import { DeploymentProfile, PathwayLeaf, PathwaySubNode } from '../types';

type SelectedEntity =
  | { kind: 'sub'; pillarTitle: string; node: PathwaySubNode }
  | { kind: 'leaf'; pillarTitle: string; parentTitle: string; node: PathwayLeaf };

export const PathwaySection: React.FC = () => {
  const [deploymentProfile, setDeploymentProfile] = useState<DeploymentProfile>(
    DeploymentProfile.HardenedK8s
  );
  const [expandedPillars, setExpandedPillars] = useState<string[]>([
    'pillar-sdk',
    'pillar-runtime',
    'pillar-security',
  ]);
  const [expandedSubNodes, setExpandedSubNodes] = useState<string[]>([
    'node-sdk-clients',
    'node-execd-daemon',
    'node-egress-policy',
  ]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('leaf-isolation-boundary');
  const [hoveredSummary, setHoveredSummary] = useState<string>(
    'Hover or keyboard-focus any pillar, node, or leaf to preview protocol specs; click to open Inspector.'
  );

  // Walkthrough Player state
  const [activeTraceId, setActiveTraceId] = useState<string>(WALKTHROUGH_TRACES[0].id);
  const [hopIndex, setHopIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeTrace =
    WALKTHROUGH_TRACES.find((t) => t.id === activeTraceId) ?? WALKTHROUGH_TRACES[0];
  const currentHop = activeTrace.hops[hopIndex] ?? activeTrace.hops[0];
  const activeProfileMeta =
    DEPLOYMENT_PROFILES.find((p) => p.id === deploymentProfile) ?? DEPLOYMENT_PROFILES[1];

  // Auto-advance walkthrough timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setHopIndex((prev) => {
        const next = prev + 1;
        if (next >= activeTrace.hops.length) {
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, 2400);
    return () => window.clearInterval(timer);
  }, [isPlaying, activeTrace.hops.length]);

  // Sync expansion & selection when hop changes
  useEffect(() => {
    if (!currentHop) return;
    setExpandedPillars((prev) =>
      prev.includes(currentHop.pillarId) ? prev : [...prev, currentHop.pillarId]
    );
    setExpandedSubNodes((prev) =>
      prev.includes(currentHop.subNodeId) ? prev : [...prev, currentHop.subNodeId]
    );
    setSelectedNodeId(currentHop.nodeId);
  }, [currentHop]);

  // Escape key dismisses inspector drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedNodeId) {
        setSelectedNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId]);

  const selectedEntity: SelectedEntity | null = useMemo(() => {
    if (!selectedNodeId) return null;
    for (const pillar of PATHWAY_PILLARS) {
      for (const sub of pillar.subNodes) {
        if (sub.id === selectedNodeId) {
          return { kind: 'sub', pillarTitle: `${pillar.index} ${pillar.title}`, node: sub };
        }
        for (const leaf of sub.leaves) {
          if (leaf.id === selectedNodeId) {
            return {
              kind: 'leaf',
              pillarTitle: `${pillar.index} ${pillar.title}`,
              parentTitle: sub.title,
              node: leaf,
            };
          }
        }
      }
    }
    return null;
  }, [selectedNodeId]);

  const togglePillar = (pillarId: string) => {
    setExpandedPillars((prev) =>
      prev.includes(pillarId) ? prev.filter((id) => id !== pillarId) : [...prev, pillarId]
    );
  };

  const toggleSubNode = (subId: string) => {
    setExpandedSubNodes((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const handleExpandAll = () => {
    setExpandedPillars(PATHWAY_PILLARS.map((p) => p.id));
    setExpandedSubNodes(PATHWAY_PILLARS.flatMap((p) => p.subNodes.map((s) => s.id)));
  };

  const handleCollapseAll = () => {
    setExpandedPillars([]);
    setExpandedSubNodes([]);
    setIsPlaying(false);
  };

  const handleResetPathway = () => {
    setIsPlaying(false);
    setHopIndex(0);
    setDeploymentProfile(DeploymentProfile.HardenedK8s);
    setExpandedPillars(['pillar-sdk', 'pillar-runtime', 'pillar-security']);
    setExpandedSubNodes(['node-sdk-clients', 'node-execd-daemon', 'node-egress-policy']);
    setSelectedNodeId(activeTrace.hops[0]?.nodeId ?? null);
  };

  const handleSelectTrace = (traceId: string) => {
    setIsPlaying(false);
    setActiveTraceId(traceId);
    setHopIndex(0);
  };

  const jumpToNode = (targetId: string) => {
    for (const pillar of PATHWAY_PILLARS) {
      for (const sub of pillar.subNodes) {
        if (sub.id === targetId) {
          setExpandedPillars((prev) => (prev.includes(pillar.id) ? prev : [...prev, pillar.id]));
          setSelectedNodeId(sub.id);
          return;
        }
        for (const leaf of sub.leaves) {
          if (leaf.id === targetId) {
            setExpandedPillars((prev) => (prev.includes(pillar.id) ? prev : [...prev, pillar.id]));
            setExpandedSubNodes((prev) => (prev.includes(sub.id) ? prev : [...prev, sub.id]));
            setSelectedNodeId(leaf.id);
            return;
          }
        }
      }
    }
  };

  return (
    <div className="space-y-10 pt-8">
      <header className="space-y-3">
        <p className="font-mono text-[12px] text-[#81c5c9]">
          04. Interactive Architecture Pathway &amp; Request Walkthrough
        </p>
        <h1 className="text-[clamp(1.85rem,3vw,2.6rem)] font-semibold tracking-tight text-[#f1f5f9]">
          OpenSandbox Runtime &amp; Audit Topology Explorer
        </h1>
        <p className="max-w-[74ch] text-[16px] leading-[1.65] text-[#aaaaaa]">
          Expand orthogonal pillars to inspect OpenSandbox&apos;s four-layer execution plane alongside Spenta 0.88 OPA and HelloKhata governance gates. Swap deployment profiles live or step through multi-hop request traces.
        </p>
      </header>

      {/* Deployment Profile Swapper + Pathway Controls */}
      <section
        aria-label="Deployment profile and pathway controls"
        className="rounded-[12px] bg-[#0d1117] p-5 shadow-token-1 space-y-5"
      >
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-1.5">
            <p className="font-mono text-[12px] text-[#aaaaaa]">
              Active Deployment Profile (Relabels Protocols, Boundaries &amp; Latencies Live)
            </p>
            <div
              role="group"
              aria-label="Select deployment profile"
              className="flex flex-wrap gap-1.5 rounded-[8px] bg-[#060a0f] p-1.5 shadow-token-1"
            >
              {DEPLOYMENT_PROFILES.map((profile) => {
                const isActive = profile.id === deploymentProfile;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setDeploymentProfile(profile.id)}
                    className={`min-h-[38px] rounded-[6px] px-3.5 py-1.5 text-[14px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#0d1117] text-[#81c5c9] shadow-token-1'
                        : 'text-[#aaaaaa] hover:text-[#f1f5f9]'
                    }`}
                  >
                    {profile.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExpandAll}
              className="min-h-[40px] rounded-[6px] border border-white/12 bg-[#060a0f] px-3.5 py-2 text-[13px] font-medium text-[#f1f5f9] hover:border-[#81c5c9] whitespace-nowrap cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="min-h-[40px] rounded-[6px] border border-white/12 bg-[#060a0f] px-3.5 py-2 text-[13px] font-medium text-[#f1f5f9] hover:border-[#81c5c9] whitespace-nowrap cursor-pointer"
            >
              Collapse All
            </button>
            <button
              type="button"
              onClick={handleResetPathway}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[6px] border border-white/12 bg-[#060a0f] px-3.5 py-2 text-[13px] font-medium text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9] whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Pathway</span>
            </button>
          </div>
        </div>

        {/* Profile Summary Strip */}
        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 text-[13px] md:grid-cols-3">
          <div>
            <span className="font-mono text-[11.5px] text-[#aaaaaa]">Transport Channel</span>
            <p className="mt-0.5 font-mono text-[#f1f5f9]">{activeProfileMeta.transport}</p>
          </div>
          <div>
            <span className="font-mono text-[11.5px] text-[#aaaaaa]">Isolation Boundary</span>
            <p className="mt-0.5 font-mono text-[#81c5c9]">{activeProfileMeta.isolation}</p>
          </div>
          <div>
            <span className="font-mono text-[11.5px] text-[#aaaaaa]">Latency Envelope</span>
            <p className="mt-0.5 font-mono text-[#f1f5f9] tabular-nums">
              {activeProfileMeta.latencyEnvelope}
            </p>
          </div>
        </div>
      </section>

      {/* Hop-by-Hop Request Walkthrough Player */}
      <section
        aria-labelledby="walkthrough-heading"
        className="rounded-[12px] bg-[#060a0f] p-5 shadow-token-1 space-y-4"
      >
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="font-mono text-[12px] text-[#81c5c9]">
              Hop-by-Hop Request Walkthrough Player
            </p>
            <h2 id="walkthrough-heading" className="mt-0.5 text-[18.24px] font-semibold text-[#f1f5f9]">
              {activeTrace.title}
            </h2>
            <p className="mt-1 text-[13.5px] text-[#aaaaaa]">{activeTrace.summary}</p>
          </div>

          {/* Transport Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Previous hop"
              disabled={hopIndex === 0}
              onClick={() => {
                setIsPlaying(false);
                setHopIndex((prev) => Math.max(0, prev - 1));
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/12 bg-[#0d1117] text-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-45 hover:border-[#81c5c9] cursor-pointer"
            >
              <SkipBack className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isPlaying && hopIndex >= activeTrace.hops.length - 1) {
                  setHopIndex(0);
                }
                setIsPlaying((prev) => !prev);
              }}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] border border-[#81c5c9] bg-[#81c5c9]/15 px-4 py-2 text-[14px] font-medium text-[#f1f5f9] hover:bg-[#81c5c9]/25 whitespace-nowrap cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
                  <span>Pause Trace</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 text-[#81c5c9]" aria-hidden="true" />
                  <span>Play Walkthrough</span>
                </>
              )}
            </button>

            <button
              type="button"
              aria-label="Next hop"
              disabled={hopIndex >= activeTrace.hops.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setHopIndex((prev) => Math.min(activeTrace.hops.length - 1, prev + 1));
              }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/12 bg-[#0d1117] text-[#f1f5f9] disabled:cursor-not-allowed disabled:opacity-45 hover:border-[#81c5c9] cursor-pointer"
            >
              <SkipForward className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Trace Scenario Selector */}
        <div
          role="group"
          aria-label="Select request walkthrough trace"
          className="flex flex-wrap gap-2"
        >
          {WALKTHROUGH_TRACES.map((trace) => {
            const active = trace.id === activeTraceId;
            return (
              <button
                key={trace.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelectTrace(trace.id)}
                className={`min-h-[38px] rounded-[6px] border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  active
                    ? 'border-[#81c5c9] bg-[#0d1117] text-[#81c5c9]'
                    : 'border-white/10 bg-[#0d1117]/60 text-[#aaaaaa] hover:text-[#f1f5f9]'
                }`}
              >
                {trace.title}
              </button>
            );
          })}
        </div>

        {/* Active Hop Telemetry Readout */}
        {currentHop && (
          <div className="rounded-[10px] border border-[#81c5c9]/35 bg-[#0d1117] p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[13px] font-semibold text-[#81c5c9] tabular-nums">
                  Hop {currentHop.step} / {activeTrace.hops.length}
                </span>
                <span className="text-[15.2px] font-semibold text-[#f1f5f9]">
                  {currentHop.label}
                </span>
              </div>
              <span className="font-mono text-[12px] text-[#81c5c9] tabular-nums">
                {currentHop.actor} · Latency ({activeProfileMeta.shortLabel}):{' '}
                {currentHop.latencyByProfile[deploymentProfile]}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-[13px] md:grid-cols-3">
              <div className="rounded-[6px] bg-[#060a0f] p-3">
                <span className="font-mono text-[11.5px] text-[#aaaaaa]">Payload &amp; Action</span>
                <p className="mt-1 font-mono text-[12px] text-[#f1f5f9] break-words">
                  {currentHop.payloadSummary}
                </p>
              </div>
              <div className="rounded-[6px] bg-[#060a0f] p-3">
                <span className="font-mono text-[11.5px] text-[#aaaaaa]">Security Boundary Check</span>
                <p className="mt-1 text-[#f1f5f9]">{currentHop.securityCheck}</p>
              </div>
              <div className="rounded-[6px] bg-[#060a0f] p-3">
                <span className="font-mono text-[11.5px] text-[#aaaaaa]">Failure Mitigation</span>
                <p className="mt-1 text-[#aaaaaa]">{currentHop.mitigation}</p>
              </div>
            </div>

            {/* Step Progress Rail */}
            <div className="flex flex-wrap gap-2 pt-1">
              {activeTrace.hops.map((hop, idx) => (
                <button
                  key={hop.step}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setHopIndex(idx);
                  }}
                  className={`min-h-[34px] rounded-[6px] border px-2.5 py-1 font-mono text-[12px] tabular-nums transition-colors duration-150 cursor-pointer ${
                    idx === hopIndex
                      ? 'border-[#81c5c9] bg-[#81c5c9]/15 text-[#f1f5f9]'
                      : 'border-white/10 bg-[#060a0f] text-[#aaaaaa] hover:text-[#f1f5f9]'
                  }`}
                >
                  0{hop.step}. {hop.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Main Split: Deterministic Orthogonal SVG Pathway + Slide-In Inspector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section
          aria-label="Interactive orthogonal architecture tree"
          className={`${
            selectedEntity ? 'lg:col-span-7' : 'lg:col-span-12'
          } rounded-[12px] bg-[#0d1117] p-5 shadow-token-1 space-y-4`}
        >
          {/* Contextual Hover Telemetry Bar */}
          <div className="rounded-[6px] border border-white/10 bg-[#060a0f] px-3.5 py-2.5 font-mono text-[12px] text-[#aaaaaa]">
            {hoveredSummary}
          </div>

          {/* Orthogonal SVG Backbone Spine Header */}
          <div className="overflow-x-auto pb-1">
            <svg
              viewBox="0 0 760 54"
              className="h-[54px] w-full min-w-[560px]"
              role="img"
              aria-label="Five-pillar OpenSandbox architecture spine"
            >
              <line
                x1="48"
                y1="27"
                x2="712"
                y2="27"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="1.5"
              />
              {PATHWAY_PILLARS.map((pillar, idx) => {
                const cx = 48 + idx * 166;
                const isExpanded = expandedPillars.includes(pillar.id);
                const isHopOwner = currentHop?.pillarId === pillar.id;
                return (
                  <g key={pillar.id}>
                    {idx < PATHWAY_PILLARS.length - 1 && isHopOwner && (
                      <line
                        x1={cx}
                        y1="27"
                        x2={cx + 166}
                        y2="27"
                        stroke="#81c5c9"
                        strokeWidth="2"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy="27"
                      r={isHopOwner ? 9 : 7}
                      fill={isHopOwner ? '#81c5c9' : isExpanded ? '#0d1117' : '#060a0f'}
                      stroke={isHopOwner || isExpanded ? '#81c5c9' : 'rgba(255,255,255,0.35)'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={cx}
                      y="49"
                      textAnchor="middle"
                      fill={isHopOwner ? '#81c5c9' : '#aaaaaa'}
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {pillar.index} {pillar.title.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Expandable Orthogonal Tree */}
          <div className="space-y-4">
            {PATHWAY_PILLARS.map((pillar) => {
              const isExpanded = expandedPillars.includes(pillar.id);
              const isActiveHopPillar = currentHop?.pillarId === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className={`rounded-[10px] border transition-colors duration-150 ${
                    isActiveHopPillar
                      ? 'border-[#81c5c9] bg-[#060a0f] shadow-token-3'
                      : 'border-white/10 bg-[#060a0f]'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={`pillar-branch-${pillar.id}`}
                    onClick={() => togglePillar(pillar.id)}
                    onMouseEnter={() =>
                      setHoveredSummary(`${pillar.index} ${pillar.title} — ${pillar.summary} (${pillar.metric})`)
                    }
                    onFocus={() =>
                      setHoveredSummary(`${pillar.index} ${pillar.title} — ${pillar.summary} (${pillar.metric})`)
                    }
                    className="flex min-h-[56px] w-full items-center justify-between gap-4 px-4 py-3 text-left cursor-pointer"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#81c5c9]" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="h-4 w-4 shrink-0 text-[#aaaaaa]" aria-hidden="true" />
                      )}
                      <span className="font-mono text-[13px] font-semibold text-[#81c5c9] tabular-nums">
                        {pillar.index}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[16px] font-semibold text-[#f1f5f9] truncate">
                          {pillar.title}
                        </p>
                        <p className="text-[12.5px] text-[#aaaaaa] truncate">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <span className="hidden font-mono text-[12px] text-[#aaaaaa] sm:inline whitespace-nowrap">
                      {pillar.metric}
                    </span>
                  </button>

                  {/* Sub-Nodes with Crisp Orthogonal SVG Connectors */}
                  {isExpanded && (
                    <div
                      id={`pillar-branch-${pillar.id}`}
                      className="border-t border-white/8 px-4 py-3 space-y-3"
                    >
                      {pillar.subNodes.map((sub) => {
                        const subExpanded = expandedSubNodes.includes(sub.id);
                        const isSelected = selectedNodeId === sub.id;
                        const isActiveHop = currentHop?.nodeId === sub.id;
                        const prof = sub.profiles[deploymentProfile];

                        return (
                          <div key={sub.id} className="relative pl-6">
                            {/* Orthogonal SVG elbow connector */}
                            <svg
                              aria-hidden="true"
                              className="pointer-events-none absolute left-0 top-0 h-full w-6"
                            >
                              <line
                                x1="8"
                                y1="0"
                                x2="8"
                                y2="100%"
                                stroke={isActiveHop || isSelected ? '#81c5c9' : 'rgba(255,255,255,0.16)'}
                                strokeWidth="1"
                              />
                              <line
                                x1="8"
                                y1="22"
                                x2="24"
                                y2="22"
                                stroke={isActiveHop || isSelected ? '#81c5c9' : 'rgba(255,255,255,0.16)'}
                                strokeWidth="1"
                              />
                            </svg>

                            <div
                              className={`rounded-[8px] border transition-colors duration-150 ${
                                isActiveHop || isSelected
                                  ? 'border-[#81c5c9] bg-[#0d1117]'
                                  : 'border-white/10 bg-[#0d1117]/80 hover:border-white/25'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedNodeId(sub.id);
                                    if (sub.leaves.length > 0 && !subExpanded) {
                                      toggleSubNode(sub.id);
                                    }
                                  }}
                                  onMouseEnter={() =>
                                    setHoveredSummary(
                                      `${sub.code} ${sub.title} · ${prof.protocol} · Latency: ${prof.latencyBudget}`
                                    )
                                  }
                                  onFocus={() =>
                                    setHoveredSummary(
                                      `${sub.code} ${sub.title} · ${prof.protocol} · Latency: ${prof.latencyBudget}`
                                    )
                                  }
                                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
                                >
                                  <span className="font-mono text-[12px] text-[#81c5c9] shrink-0">
                                    {sub.code}
                                  </span>
                                  <span className="text-[14.5px] font-medium text-[#f1f5f9] truncate">
                                    {sub.title}
                                  </span>
                                </button>

                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[11.5px] text-[#aaaaaa] tabular-nums">
                                    {prof.latencyBudget}
                                  </span>
                                  {sub.leaves.length > 0 && (
                                    <button
                                      type="button"
                                      aria-expanded={subExpanded}
                                      aria-label={`Toggle leaf specifications for ${sub.title}`}
                                      onClick={() => toggleSubNode(sub.id)}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-white/10 text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9] cursor-pointer"
                                    >
                                      {subExpanded ? (
                                        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                                      ) : (
                                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Leaf Compositions */}
                              {subExpanded && sub.leaves.length > 0 && (
                                <div className="border-t border-white/8 px-3.5 py-2.5 space-y-2">
                                  {sub.leaves.map((leaf) => {
                                    const leafSelected = selectedNodeId === leaf.id;
                                    const leafActiveHop = currentHop?.nodeId === leaf.id;
                                    const leafProf = leaf.profiles[deploymentProfile];
                                    return (
                                      <button
                                        key={leaf.id}
                                        type="button"
                                        onClick={() => setSelectedNodeId(leaf.id)}
                                        onMouseEnter={() =>
                                          setHoveredSummary(
                                            `${leaf.code} ${leaf.title} (${leaf.layer}) · ${leafProf.boundary} · ${leafProf.latencyBudget}`
                                          )
                                        }
                                        onFocus={() =>
                                          setHoveredSummary(
                                            `${leaf.code} ${leaf.title} (${leaf.layer}) · ${leafProf.boundary} · ${leafProf.latencyBudget}`
                                          )
                                        }
                                        className={`flex min-h-[42px] w-full flex-wrap items-center justify-between gap-2 rounded-[6px] border px-3 py-2 text-left transition-colors duration-150 cursor-pointer ${
                                          leafActiveHop || leafSelected
                                            ? 'border-[#81c5c9] bg-[#81c5c9]/12 text-[#f1f5f9]'
                                            : 'border-white/8 bg-[#060a0f] text-[#aaaaaa] hover:border-[#81c5c9]/60 hover:text-[#f1f5f9]'
                                        }`}
                                      >
                                        <span className="flex items-center gap-2 text-[13.5px]">
                                          <span className="font-mono text-[11.5px] text-[#81c5c9]">
                                            {leaf.code}
                                          </span>
                                          <span className="font-medium text-[#f1f5f9]">
                                            {leaf.title}
                                          </span>
                                        </span>
                                        <span className="font-mono text-[11.5px] text-[#aaaaaa] tabular-nums">
                                          {leaf.metric} · {leafProf.latencyBudget}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Slide-In Node Inspector Drawer */}
        {selectedEntity && (
          <aside
            aria-label="Selected architecture node inspector"
            className="lg:col-span-5"
          >
            <div className="sticky top-20 rounded-[12px] border border-[#81c5c9]/40 bg-[#0d1117] p-5 shadow-token-2 space-y-5">
              <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <p className="font-mono text-[12px] text-[#81c5c9]">
                    {selectedEntity.node.code} · {selectedEntity.pillarTitle}
                  </p>
                  <h3 className="text-[18.24px] font-semibold text-[#f1f5f9]">
                    {selectedEntity.node.title}
                  </h3>
                  {selectedEntity.kind === 'leaf' && (
                    <p className="font-mono text-[12px] text-[#aaaaaa]">
                      Parent: {selectedEntity.parentTitle} · {selectedEntity.node.layer}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Close node inspector"
                  onClick={() => setSelectedNodeId(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/12 bg-[#060a0f] text-[#aaaaaa] hover:border-[#81c5c9] hover:text-[#f1f5f9] shrink-0 cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p className="text-[14.5px] leading-[1.65] text-[#aaaaaa]">
                {selectedEntity.node.summary}
              </p>

              {/* Profile-Dynamic Details */}
              <dl className="divide-y divide-white/8 rounded-[10px] bg-[#060a0f] px-4 text-[13px] shadow-token-1">
                <div className="py-3">
                  <dt className="font-mono text-[11.5px] text-[#aaaaaa]">
                    Protocol ({activeProfileMeta.shortLabel})
                  </dt>
                  <dd className="mt-1 font-mono text-[#f1f5f9]">
                    {selectedEntity.node.profiles[deploymentProfile].protocol}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Enforced Boundary</dt>
                  <dd className="mt-1 font-mono text-[#81c5c9]">
                    {selectedEntity.node.profiles[deploymentProfile].boundary}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-mono text-[11.5px] text-[#aaaaaa]">Latency Budget</dt>
                  <dd className="mt-1 font-mono text-[#f1f5f9] tabular-nums">
                    {selectedEntity.node.profiles[deploymentProfile].latencyBudget}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="font-mono text-[11.5px] text-[#aaaaaa]">
                    Self-Hosting Engineering Trade-Off
                  </dt>
                  <dd className="mt-1 leading-[1.55] text-[#aaaaaa]">
                    {selectedEntity.node.profiles[deploymentProfile].tradeOff}
                  </dd>
                </div>
              </dl>

              {/* Connected Synergy Links for Leaf Nodes */}
              {selectedEntity.kind === 'leaf' && selectedEntity.node.synergyIds.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <p className="font-mono text-[12px] text-[#aaaaaa]">
                    Connected Pathway Dependencies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntity.node.synergyIds.map((targetId) => (
                      <button
                        key={targetId}
                        type="button"
                        onClick={() => jumpToNode(targetId)}
                        className="min-h-[36px] rounded-[6px] border border-white/14 bg-[#060a0f] px-3 py-1.5 font-mono text-[12px] text-[#81c5c9] hover:border-[#81c5c9] cursor-pointer"
                      >
                        Jump to {targetId.replace('node-', '')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
