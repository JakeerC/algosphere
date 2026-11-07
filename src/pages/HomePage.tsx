import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  ArrowRight,
  BookOpen,
  Activity,
  Zap,
  Layers,
  ArrowUpDown,
  GitFork,
  Network,
  Navigation,
  Grid3X3,
  Boxes,
  Hash,
  Workflow,
  Share2,
  Trophy,
  CheckCircle2,
  Cpu,
  BookHeart,
} from "lucide-react";
import { ALGORITHM_MODULES, LEARNING_TRACKS } from "../data/modules";
import { AlgorithmModule, AlgorithmCategory } from "../types/algorithm";
import { Badge } from "../components/common/Badge";
import {
  ScribbleUnderline,
  ScribbleArrow,
  ScribbleBlob,
} from "../components/common/ScribbleAccents";

interface HomePageProps {
  onOpenCommandPalette: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");

  const categories = [
    {
      id: "all",
      label: "All Modules",
      count: ALGORITHM_MODULES.length,
      color: "var(--primary-500)",
    },
    {
      id: "sorting",
      label: "Sorting",
      count: ALGORITHM_MODULES.filter((m) => m.category === "sorting").length,
      color: "var(--cat-sorting)",
    },
    {
      id: "trees",
      label: "Trees & Heaps",
      count: ALGORITHM_MODULES.filter((m) => m.category === "trees").length,
      color: "var(--cat-trees)",
    },
    {
      id: "graphs",
      label: "Graphs & Paths",
      count: ALGORITHM_MODULES.filter((m) => m.category === "graphs").length,
      color: "var(--cat-graphs)",
    },
    {
      id: "linear",
      label: "Linear ADTs",
      count: ALGORITHM_MODULES.filter((m) => m.category === "linear").length,
      color: "var(--cat-linear)",
    },
    {
      id: "dp",
      label: "Dynamic Programming",
      count: ALGORITHM_MODULES.filter((m) => m.category === "dp").length,
      color: "var(--cat-dp)",
    },
    {
      id: "hashing",
      label: "Hashing & Sets",
      count: ALGORITHM_MODULES.filter((m) => m.category === "hashing").length,
      color: "var(--cat-hashing)",
    },
  ];

  const getCategoryTheme = (cat: AlgorithmCategory) => {
    switch (cat) {
      case "sorting":
        return {
          color: "var(--cat-sorting)",
          bg: "var(--cat-sorting-surface)",
          border: "var(--cat-sorting-border)",
        };
      case "trees":
        return {
          color: "var(--cat-trees)",
          bg: "var(--cat-trees-surface)",
          border: "var(--cat-trees-border)",
        };
      case "graphs":
        return {
          color: "var(--cat-graphs)",
          bg: "var(--cat-graphs-surface)",
          border: "var(--cat-graphs-border)",
        };
      case "linear":
        return {
          color: "var(--cat-linear)",
          bg: "var(--cat-linear-surface)",
          border: "var(--cat-linear-border)",
        };
      case "dp":
        return {
          color: "var(--cat-dp)",
          bg: "var(--cat-dp-surface)",
          border: "var(--cat-dp-border)",
        };
      case "hashing":
        return {
          color: "var(--cat-hashing)",
          bg: "var(--cat-hashing-surface)",
          border: "var(--cat-hashing-border)",
        };
      default:
        return {
          color: "var(--primary-500)",
          bg: "var(--primary-surface)",
          border: "var(--primary-border)",
        };
    }
  };

  const filteredModules = ALGORITHM_MODULES.filter((m) => {
    const matchesCategory =
      selectedCategory === "all" || m.category === selectedCategory;
    const matchesSearch =
      !searchFilter ||
      m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.variants.some((v) =>
        v.toLowerCase().includes(searchFilter.toLowerCase()),
      ) ||
      m.tags.some((t) =>
        t.toLowerCase().includes(searchFilter.toLowerCase()),
      ) ||
      (m.courseCode &&
        m.courseCode.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "ArrowUpDown":
        return <ArrowUpDown size={20} />;
      case "GitFork":
        return <GitFork size={20} />;
      case "Network":
        return <Network size={20} />;
      case "Navigation":
        return <Navigation size={20} />;
      case "Layers":
        return <Layers size={20} />;
      case "Grid3X3":
        return <Grid3X3 size={20} />;
      case "Boxes":
        return <Boxes size={20} />;
      case "Hash":
        return <Hash size={20} />;
      case "Workflow":
        return <Workflow size={20} />;
      case "Share2":
        return <Share2 size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-10)",
        position: "relative",
      }}
    >
      {/* Soft Ambient Background Blobs */}
      <ScribbleBlob
        color="var(--primary-surface)"
        width={450}
        height={450}
        opacity={0.4}
        style={{ top: "-80px", right: "-120px" }}
      />
      <ScribbleBlob
        color="var(--state-swap-bg)"
        width={380}
        height={380}
        opacity={0.3}
        style={{ top: "250px", left: "-100px" }}
      />

      {/* Hero Section */}
      <section
        style={{
          paddingTop: "var(--space-8)",
          paddingBottom: "var(--space-4)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="container-narrow"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Punchy Headline with Scribble Wave */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.8vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              marginBottom: "var(--space-4)",
              color: "var(--text-primary)",
              maxWidth: "22ch",
            }}
          >
            Visualize, understand &{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              master every step
              <ScribbleUnderline
                color="var(--primary-500)"
                style={{ position: "absolute", bottom: "-10px", left: 0 }}
              />
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-6)",
              textAlign: "center",
              lineHeight: 1.65,
              maxWidth: "56ch",
            }}
          >
            Reimagining NUS VisuAlgo with silky 60fps animations, synchronized
            line-by-line pseudocode tracers, live duel arenas, and procedural
            mastery quizzes.
          </p>

          {/* Action Row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--space-3)",
              marginBottom: "var(--space-6)",
              position: "relative",
            }}
          >
            <button
              onClick={onOpenCommandPalette}
              className="btn btn-primary btn-lg"
              style={{ gap: "var(--space-3)" }}
            >
              <Search size={18} />
              <span>Explore All Algorithms</span>
              <kbd
                style={{
                  backgroundColor: "hsla(0, 0%, 0%, 0.15)",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  color: "currentColor",
                }}
              >
                ⌘K
              </kbd>
            </button>
            <Link
              to="/blind75"
              className="btn btn-secondary btn-lg"
              style={{
                gap: "var(--space-2)",
                backgroundColor: "var(--surface-raised)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <BookHeart size={18} color="var(--state-pivot)" />
              <span>Blind 75 </span>
            </Link>
            <Link
              to="/compare"
              className="btn btn-secondary btn-lg"
              style={{ gap: "var(--space-2)" }}
            >
              <Zap size={18} color="var(--state-swap)" />
              <span>Duel Arena</span>
            </Link>

            {/* Playful Floating Arrow Doodle on Desktop */}
            <div
              style={{
                display: "none",
                position: "absolute",
                right: "-140px",
                top: "5px",
                alignItems: "center",
                gap: "6px",
              }}
              className="desktop-arrow"
            >
              <ScribbleArrow color="var(--state-swap)" width={40} height={28} />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12px",
                  color: "var(--text-tertiary)",
                  transform: "rotate(-4deg)",
                  whiteSpace: "nowrap",
                }}
              >
                Try side-by-side!
              </span>
            </div>
          </div>

          {/* Scribble Feature Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <CheckCircle2 size={13} color="var(--state-sorted)" />
              <span>12+ Full Visualizers</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Activity size={13} color="var(--primary-500)" />
              <span>60 FPS Scrubbable Director</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Cpu size={13} color="var(--state-swap)" />
              <span>Synchronized Variable Watch</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Trophy size={13} color="var(--state-inspect)" />
              <span>Procedural Quizzes</span>
            </div>
          </div>
        </div>
      </section>

      {/* University & Interview Tracks Highlight */}
      <section className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-4)",
          }}
        >
          <div>
            <h2 style={{ fontSize: "var(--text-xl)" }}>
              Curated Learning Pathways
            </h2>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--text-tertiary)",
              }}
            >
              Structured tracks aligned with world-class university curricula
              (NUS CS2040) and technical interview loops.
            </p>
          </div>
          <Link
            to="/tracks"
            className="btn btn-ghost btn-sm"
            style={{ color: "var(--primary-500)" }}
          >
            <span>View All Tracks</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {LEARNING_TRACKS.map((track, idx) => {
            const trackColors = [
              { border: "var(--cat-sorting)", badge: "primary" as const },
              { border: "var(--cat-dp)", badge: "purple" as const },
              { border: "var(--cat-trees)", badge: "success" as const },
            ];
            const theme = trackColors[idx % trackColors.length];

            return (
              <Link
                key={track.id}
                to="/tracks"
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  borderTop: `4px solid ${theme.border}`,
                  textDecoration: "none",
                  borderRadius: "var(--radius-xl)",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    <Badge variant={theme.badge}>{track.badge}</Badge>
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        color: "var(--text-tertiary)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {track.estimatedHours}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "var(--text-lg)",
                      marginBottom: "var(--space-2)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {track.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {track.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "var(--space-3)",
                    borderTop: "var(--border-1) solid var(--border-subtle)",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  <span>{track.moduleIds.length} Core Modules Included</span>
                  <span
                    style={{
                      color: "var(--primary-500)",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Start Track <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Algorithm Catalog Grid */}
      <section className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            marginBottom: "var(--space-6)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-3)",
            }}
          >
            <div>
              <h2 style={{ fontSize: "var(--text-2xl)" }}>
                Algorithmic Modules
              </h2>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-tertiary)",
                }}
              >
                Comprehensive interactive visualizations across{" "}
                {ALGORITHM_MODULES.length} algorithmic families.
              </p>
            </div>

            {/* In-page filter search */}
            <div style={{ minWidth: "260px" }}>
              <input
                type="text"
                placeholder="Filter algorithms or tags..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ width: "100%", borderRadius: "var(--radius-full)" }}
              />
            </div>
          </div>

          {/* Category Tabs with Pill styling */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              borderBottom: "var(--border-1) solid var(--border-subtle)",
              paddingBottom: "var(--space-3)",
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                  style={{
                    borderRadius: "var(--radius-full)",
                    gap: "6px",
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      fontSize: "10px",
                      opacity: 0.8,
                      backgroundColor: isSelected
                        ? "hsla(0, 0%, 0%, 0.15)"
                        : "var(--surface-subtle)",
                      padding: "1px 6px",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "var(--space-5)",
            marginBottom: "var(--space-10)",
          }}
        >
          {filteredModules.map((module) => {
            const theme = getCategoryTheme(module.category);

            return (
              <div
                key={module.id}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  borderRadius: "var(--radius-xl)",
                  borderTop: `4px solid ${theme.color}`,
                  padding: "var(--space-6)",
                }}
              >
                <div>
                  {/* Header row: Icon, Title, Course badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "var(--space-3)",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "var(--radius-lg)",
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme.color,
                        flexShrink: 0,
                      }}
                    >
                      {getModuleIcon(module.icon)}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "var(--space-1)",
                        flexWrap: "wrap",
                      }}
                    >
                      {module.courseCode && (
                        <span className="badge badge-neutral">
                          {module.courseCode}
                        </span>
                      )}
                      <span className="badge badge-primary">
                        {module.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: "var(--text-lg)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {module.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      marginBottom: "var(--space-4)",
                      lineHeight: 1.6,
                    }}
                  >
                    {module.shortDescription}
                  </p>

                  {/* Variants pills */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    {module.variants.slice(0, 3).map((v, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          backgroundColor: "var(--surface-subtle)",
                          border: "var(--border-1) solid var(--border-subtle)",
                          borderRadius: "var(--radius-full)",
                          padding: "3px 8px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {v}
                      </span>
                    ))}
                    {module.variants.length > 3 && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "var(--text-tertiary)",
                          padding: "2px 4px",
                        }}
                      >
                        +{module.variants.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Big-O Complexity HUD */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "var(--space-2)",
                      backgroundColor: "var(--surface-subtle)",
                      padding: "var(--space-3) var(--space-4)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "var(--text-xs)",
                      fontFamily: "var(--font-mono)",
                      border: "var(--border-1) solid var(--border-subtle)",
                    }}
                  >
                    <div>
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Time:{" "}
                      </span>
                      <strong style={{ color: "var(--state-inspect)" }}>
                        {module.complexity.timeAvg}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Space:{" "}
                      </span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        {module.complexity.spaceWorst}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Action buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    paddingTop: "var(--space-3)",
                    borderTop: "var(--border-1) solid var(--border-subtle)",
                  }}
                >
                  <Link
                    to={`/visualizer/${module.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Activity size={14} />
                    <span>Visualize</span>
                  </Link>

                  <Link
                    to={`/lecture/${module.id}`}
                    className="btn btn-secondary btn-sm"
                    title="Open e-Lecture slides"
                  >
                    <BookOpen size={14} />
                    <span>Lecture</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scribble Studio Architecture Feature Grid */}
      <section
        className="container"
        style={{ marginBottom: "var(--space-10)" }}
      >
        <div
          style={{
            backgroundColor: "var(--surface-subtle)",
            borderRadius: "var(--radius-2xl)",
            padding: "var(--space-8) var(--space-6)",
            border: "var(--border-1) solid var(--border-default)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "640px",
              margin: "0 auto var(--space-8)",
            }}
          >
            <Badge variant="purple" icon={<Sparkles size={13} />}>
              Scribble Studio Engine
            </Badge>
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                marginTop: "var(--space-2)",
                marginBottom: "var(--space-2)",
              }}
            >
              Engineered for Fluidity & Conceptual Joy
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Built from first principles to turn abstract mathematical
              invariants into tactile, scrubbable visualizations.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            <div className="card" style={{ borderRadius: "var(--radius-xl)" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--primary-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-500)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Activity size={20} />
              </div>
              <h3
                style={{
                  fontSize: "var(--text-lg)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Tri-Engine Director
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Synchronized 60fps canvas stage, live variable state inspector,
                and exact line-by-line pseudocode highlighting.
              </p>
            </div>

            <div className="card" style={{ borderRadius: "var(--radius-xl)" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--state-swap-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--state-swap)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Zap size={20} />
              </div>
              <h3
                style={{
                  fontSize: "var(--text-lg)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Side-by-Side Arena
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Pit algorithms against each other on identical inputs. Watch
                operation counters, comparisons, and swaps unfold in real-time.
              </p>
            </div>

            <div className="card" style={{ borderRadius: "var(--radius-xl)" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--state-sorted-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--state-sorted)",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Trophy size={20} />
              </div>
              <h3
                style={{
                  fontSize: "var(--text-lg)",
                  marginBottom: "var(--space-2)",
                }}
              >
                Procedural Training
              </h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                Unlimited dynamic quiz problems that test state invariants,
                recursion depth, and tree balance with instant step replay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .desktop-arrow {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
