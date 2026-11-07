import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  ArrowRight,
  BookOpen,
  Activity,
  Zap,
  Trophy,
  BookHeart,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { Scribble } from "scribblekit";
import { ALGORITHM_MODULES, LEARNING_TRACKS } from "../data/modules";
import { AlgorithmCategory } from "../types/algorithm";
import { Badge } from "../components/common/Badge";
import { ScribbleBlob } from "../components/common/ScribbleAccents";
import {
  ALGORITHM_SCRIBBLES,
  MODULE_SCRIBBLE_MAP,
} from "../data/algorithmsScribbles";
import { getAlgorithmTheory } from "../data/algorithmTheories";
import { AlgorithmTheoryModal } from "../components/home/AlgorithmTheoryModal";

interface HomePageProps {
  onOpenCommandPalette: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");

  // Algorithms in Brief interactive showcase state
  const [algorithmCategoryFilter, setAlgorithmCategoryFilter] = useState<string>("all");
  const [algorithmSearch, setAlgorithmSearch] = useState("");
  const [hoveredAlgorithmId, setHoveredAlgorithmId] = useState<string | null>(null);
  const [selectedTheoryId, setSelectedTheoryId] = useState<string | null>(null);
  const [showAllAlgorithms, setShowAllAlgorithms] = useState<boolean>(false);

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
        v.toLowerCase().includes(searchFilter.toLowerCase())
      ) ||
      m.tags.some((t) =>
        t.toLowerCase().includes(searchFilter.toLowerCase())
      ) ||
      (m.courseCode &&
        m.courseCode.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filtered algorithms-in-brief items
  const algorithmCategories = [
    { id: "all", label: "All Algorithms", count: 30 },
    { id: "trees", label: "Trees & Heaps", count: 8 },
    { id: "graphs", label: "Graphs & Paths", count: 5 },
    { id: "linear", label: "Linear ADTs", count: 5 },
    { id: "sorting", label: "Sorting & Search", count: 5 },
    { id: "advanced", label: "Advanced & Caching", count: 7 },
  ];

  const filteredAlgorithms = ALGORITHM_SCRIBBLES.filter((item) => {
    const matchesCategory = (() => {
      if (algorithmCategoryFilter === "all") return true;
      if (algorithmCategoryFilter === "trees") {
        return [
          "algo-binary-tree",
          "algo-red-black-tree",
          "algo-heap-tree",
          "algo-trie-tree",
          "algo-segment-tree",
          "algo-fenwick-bit-tree",
          "algo-b-tree-node",
          "algo-huffman-encoding",
        ].includes(item.id);
      }
      if (algorithmCategoryFilter === "graphs") {
        return [
          "algo-graph-network",
          "algo-shortest-path-dijkstra",
          "algo-min-spanning-tree",
          "algo-dag-topological",
          "algo-union-find-dsu",
        ].includes(item.id);
      }
      if (algorithmCategoryFilter === "linear") {
        return [
          "algo-linked-list",
          "algo-doubly-linked-list",
          "algo-stack-lifo",
          "algo-queue-fifo",
          "algo-matrix-grid",
        ].includes(item.id);
      }
      if (algorithmCategoryFilter === "sorting") {
        return [
          "algo-quicksort-partition",
          "algo-array-buffer",
          "algo-binary-search",
          "algo-two-pointers",
          "algo-sliding-window",
        ].includes(item.id);
      }
      if (algorithmCategoryFilter === "advanced") {
        return [
          "algo-hash-table",
          "algo-lru-cache",
          "algo-bloom-filter",
          "algo-consistent-hash-ring",
          "algo-recursion-spiral",
          "algo-big-o-complexity",
          "algo-backtracking-nqueens",
        ].includes(item.id);
      }
      return true;
    })();

    const matchesSearch =
      !algorithmSearch ||
      item.name.toLowerCase().includes(algorithmSearch.toLowerCase()) ||
      item.id.toLowerCase().includes(algorithmSearch.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(algorithmSearch.toLowerCase())) ||
      item.description.toLowerCase().includes(algorithmSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const displayedAlgorithms = showAllAlgorithms
    ? filteredAlgorithms
    : filteredAlgorithms.slice(0, 12);

  const activeTheory = selectedTheoryId
    ? getAlgorithmTheory(selectedTheoryId) || null
    : null;
  const activeAsset = selectedTheoryId
    ? ALGORITHM_SCRIBBLES.find((a) => a.id === selectedTheoryId) || null
    : null;

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
        width={480}
        height={480}
        opacity={0.35}
        style={{ top: "-80px", right: "-120px" }}
      />
      <ScribbleBlob
        color="var(--state-swap-bg)"
        width={420}
        height={420}
        opacity={0.25}
        style={{ top: "350px", left: "-120px" }}
      />

      {/* Hero Section - Fullscreen Hero taking up entire viewport including navbar */}
      <section
        className="hero-fullscreen"
        style={{
          marginTop: "calc(-1 * var(--space-4))",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "var(--space-6)",
          paddingBottom: "var(--space-6)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Floating Algorithmic Cards (Desktop / Tablet) */}
        <div
          className="hero-floating-doodle hero-doodle-tl"
          onClick={() => setSelectedTheoryId("algo-binary-tree")}
          style={{ cursor: "pointer" }}
          title="Click to view Binary Search Tree theory"
        >
          <div className="doodle-card">
            <Scribble
              name="algo-binary-tree"
              size={90}
              color="#EA552B"
              animate="float"
            />
            <span className="doodle-badge">BST Rotations &bull; O(log N)</span>
          </div>
        </div>

        <div
          className="hero-floating-doodle hero-doodle-tr"
          onClick={() => setSelectedTheoryId("algo-graph-network")}
          style={{ cursor: "pointer" }}
          title="Click to view Graph Traversal theory"
        >
          <div className="doodle-card">
            <Scribble
              name="algo-graph-network"
              size={95}
              color="#55BBDA"
              animate="wobble"
            />
            <span className="doodle-badge">Graph Topology &bull; BFS/DFS</span>
          </div>
        </div>

        <div
          className="hero-floating-doodle hero-doodle-bl"
          onClick={() => setSelectedTheoryId("algo-quicksort-partition")}
          style={{ cursor: "pointer" }}
          title="Click to view Quicksort Partition theory"
        >
          <div className="doodle-card">
            <Scribble
              name="algo-quicksort-partition"
              size={95}
              color="#0BDC85"
              animate="bounce"
            />
            <span className="doodle-badge">Partition Pivot &bull; O(N log N)</span>
          </div>
        </div>

        <div
          className="hero-floating-doodle hero-doodle-br"
          onClick={() => setSelectedTheoryId("algo-heap-tree")}
          style={{ cursor: "pointer" }}
          title="Click to view Priority Heap theory"
        >
          <div className="doodle-card">
            <Scribble
              name="algo-heap-tree"
              size={90}
              color="#F7D046"
              animate="float"
            />
            <span className="doodle-badge">Min/Max Heap &bull; Priority</span>
          </div>
        </div>

        <div
          className="container-narrow"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Studio Banner Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              backgroundColor: "var(--surface-card)",
              border: "var(--border-1) solid var(--border-default)",
              borderRadius: "var(--radius-full)",
              fontSize: "var(--text-xs)",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-4)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <Scribble
              name="star-4-point-sparkle"
              size={15}
              color="#EA552B"
              animate="sparkle"
            />
            <span style={{ fontWeight: 600 }}>
              Interactive Algorithm Visualizer &amp; Computer Science Lab
            </span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono)",
                backgroundColor: "var(--surface-subtle)",
                padding: "2px 6px",
                borderRadius: "var(--radius-full)",
                color: "var(--primary-400)",
              }}
            >
              NUS CS2040 Aligned
            </span>
          </div>

          {/* Punchy Headline with Wave Underline */}
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
            <span
              style={{
                position: "relative",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              master every step
              <Scribble
                name="underline-wave-single"
                size="100%"
                color="var(--primary-500)"
                animate="draw"
                style={{
                  position: "absolute",
                  bottom: "-12px",
                  left: 0,
                  height: "18px",
                }}
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
              maxWidth: "58ch",
            }}
          >
            Reimagining NUS VisuAlgo with silky 60fps animations, synchronized
            line-by-line pseudocode tracers, live duel arenas, and comprehensive
            interactive visualizers.
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
              to="/mastery"
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

            {/* Playful Floating Arrow */}
            <div
              style={{
                display: "none",
                position: "absolute",
                right: "-150px",
                top: "0px",
                alignItems: "center",
                gap: "4px",
              }}
              className="desktop-arrow"
            >
              <Scribble
                name="arrow-curved-down-right"
                size={40}
                color="var(--state-swap)"
                animate="wobble"
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "13px",
                  color: "var(--text-tertiary)",
                  transform: "rotate(-4deg)",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                }}
              >
                Try side-by-side!
              </span>
            </div>
          </div>

          {/* Feature Badges using Algorithm Icons */}
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
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Scribble
                name="algo-array-buffer"
                size={18}
                color="#4CA96D"
                animate="bounce"
              />
              <span>12+ Full Visualizers</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Scribble
                name="algo-recursion-spiral"
                size={18}
                color="#EA552B"
                animate="float"
              />
              <span>60 FPS Scrubbable Director</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Scribble
                name="algo-two-pointers"
                size={18}
                color="#55BBDA"
                animate="wobble"
              />
              <span>Synchronized Variable Watch</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                backgroundColor: "var(--surface-card)",
                border: "var(--border-1) solid var(--border-subtle)",
                borderRadius: "var(--radius-full)",
                fontSize: "var(--text-xs)",
                color: "var(--text-secondary)",
              }}
            >
              <Scribble
                name="algo-backtracking-nqueens"
                size={18}
                color="#EE8DB9"
                animate="sparkle"
              />
              <span>Procedural Quizzes</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Algorithms in Brief (Theoretical details on click) */}
      <section className="container">
        <div
          style={{
            backgroundColor: "var(--surface-card)",
            borderRadius: "var(--radius-2xl)",
            padding: "var(--space-7) var(--space-6)",
            border: "1px solid var(--border-default)",
            boxShadow: "var(--shadow-md)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle top background decorative sketch */}
          <div
            style={{
              position: "absolute",
              right: "-20px",
              top: "-20px",
              opacity: 0.12,
              pointerEvents: "none",
            }}
          >
            <Scribble name="algo-dag-topological" size={160} color="#EA552B" />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "var(--space-4)",
              marginBottom: "var(--space-6)",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "var(--text-xs)",
                  color: "#EA552B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "var(--space-2)",
                }}
              >
                <Sparkles size={14} color="#EA552B" />
                <span>Foundations &bull; Quick Concept Cards</span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                Algorithms in Brief
              </h2>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  marginTop: "var(--space-2)",
                  maxWidth: "64ch",
                  lineHeight: 1.6,
                }}
              >
                Essential theoretical models, mathematical invariants, and time/space complexity guarantees across core data structures and algorithmic patterns. <strong>Click any card to inspect full theoretical mechanics.</strong>
              </p>
            </div>

            {/* Quick search input for the 30 algorithm cards */}
            <div style={{ minWidth: "250px" }}>
              <input
                type="text"
                placeholder="Search 30 algorithms in brief..."
                value={algorithmSearch}
                onChange={(e) => setAlgorithmSearch(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--surface-subtle)",
                }}
              />
            </div>
          </div>

          {/* Category Tabs for Algorithms in Brief */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "var(--space-5)",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "var(--space-3)",
            }}
          >
            {algorithmCategories.map((cat) => {
              const isSelected = algorithmCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setAlgorithmCategoryFilter(cat.id)}
                  className={`btn btn-sm ${
                    isSelected ? "btn-primary" : "btn-secondary"
                  }`}
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

          {/* Interactive Algorithm Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {displayedAlgorithms.map((item) => {
              const isHovered = hoveredAlgorithmId === item.id;
              const theory = getAlgorithmTheory(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTheoryId(item.id)}
                  onMouseEnter={() => setHoveredAlgorithmId(item.id)}
                  onMouseLeave={() => setHoveredAlgorithmId(null)}
                  style={{
                    backgroundColor: "var(--surface-subtle)",
                    border: `1px solid ${
                      isHovered ? item.defaultColor : "var(--border-default)"
                    }`,
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "var(--space-3)",
                    transition: "all var(--transition-fast)",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  className="card-interactive"
                  title="Click to inspect theoretical details and invariants"
                >
                  {/* The Vector Icon */}
                  <div
                    style={{
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      transform: isHovered ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    <Scribble
                      name={item.id}
                      size={70}
                      color={item.defaultColor}
                      animate={isHovered ? "wobble" : false}
                    />
                  </div>

                  {/* Name & Short Theoretical Summary */}
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-tertiary)",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "31px",
                      }}
                    >
                      {theory?.summary || item.description}
                    </div>
                  </div>

                  {/* Complexity & Click-to-inspect banner */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingTop: "6px",
                      borderTop: "1px solid var(--border-subtle)",
                      fontSize: "10px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "var(--surface-card)",
                        padding: "2px 6px",
                        borderRadius: "var(--radius-full)",
                        color: item.defaultColor,
                        fontWeight: 700,
                      }}
                    >
                      {theory?.timeComplexity.average || "O(log N)"}
                    </span>
                    <span
                      style={{
                        color: isHovered ? item.defaultColor : "var(--text-tertiary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                        fontWeight: 600,
                      }}
                    >
                      <span>Theory</span>
                      <Info size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Toggle Expand / Collapse Button */}
          {filteredAlgorithms.length > 12 && (
            <div
              style={{
                marginTop: "var(--space-5)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setShowAllAlgorithms(!showAllAlgorithms)}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: "var(--radius-full)", gap: "6px", padding: "8px 20px" }}
              >
                <span>
                  {showAllAlgorithms
                    ? "Show fewer algorithms"
                    : `Show all ${filteredAlgorithms.length} algorithms in brief`}
                </span>
                {showAllAlgorithms ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION: University & Interview Tracks Highlight */}
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
              {
                border: "var(--cat-sorting)",
                badge: "primary" as const,
                scribble: "algo-array-buffer",
                color: "#EA552B",
              },
              {
                border: "var(--cat-dp)",
                badge: "purple" as const,
                scribble: "algo-binary-tree",
                color: "#55BBDA",
              },
              {
                border: "var(--cat-trees)",
                badge: "success" as const,
                scribble: "algo-graph-network",
                color: "#4CA96D",
              },
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
                  position: "relative",
                  overflow: "hidden",
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

                  {/* Track Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-3)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-lg)",
                        backgroundColor: "var(--surface-subtle)",
                        border: "1px solid var(--border-default)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Scribble
                        name={theme.scribble}
                        size={36}
                        color={theme.color}
                        animate="wobble"
                      />
                    </div>
                    <h3
                      style={{
                        fontSize: "var(--text-lg)",
                        color: "var(--text-primary)",
                        margin: 0,
                      }}
                    >
                      {track.title}
                    </h3>
                  </div>

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

      {/* SECTION: Main Algorithm Catalog Grid */}
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
                  className={`btn btn-sm ${
                    isSelected ? "btn-primary" : "btn-secondary"
                  }`}
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
            const scribbleInfo = MODULE_SCRIBBLE_MAP[module.id] || {
              scribbleId: "algo-array-buffer",
              accentColor: theme.color,
            };

            return (
              <div
                key={module.id}
                className="card card-interactive"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "var(--space-4)",
                  borderRadius: "var(--radius-xl)",
                  borderTop: `4px solid ${theme.color}`,
                  padding: "var(--space-6)",
                  position: "relative",
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
                        width: "52px",
                        height: "52px",
                        borderRadius: "var(--radius-lg)",
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        padding: "4px",
                      }}
                    >
                      <Scribble
                        name={scribbleInfo.scribbleId}
                        size={42}
                        color={scribbleInfo.accentColor}
                        animate="wobble"
                      />
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

      {/* SECTION: Engine Architecture Feature Grid */}
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
              AlgoSphere Engine
            </Badge>
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                marginTop: "var(--space-2)",
                marginBottom: "var(--space-2)",
              }}
            >
              Engineered for Fluidity &amp; Conceptual Joy
            </h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Built from first principles to turn abstract mathematical
              invariants into tactile, scrubbable visualizations with high-frame-rate
              expressiveness.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-5)",
            }}
          >
            <div className="card" style={{ borderRadius: "var(--radius-xl)" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--primary-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Scribble
                  name="algo-recursion-spiral"
                  size={46}
                  color="#EA552B"
                  animate="float"
                />
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
                  width: "60px",
                  height: "60px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--state-swap-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Scribble
                  name="algo-two-pointers"
                  size={46}
                  color="#55BBDA"
                  animate="wobble"
                />
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
                  width: "60px",
                  height: "60px",
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--state-sorted-bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Scribble
                  name="algo-backtracking-nqueens"
                  size={46}
                  color="#0BDC85"
                  animate="bounce"
                />
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

      {/* Theoretical Details Modal */}
      <AlgorithmTheoryModal
        theory={activeTheory}
        asset={activeAsset}
        onClose={() => setSelectedTheoryId(null)}
      />

      {/* Responsive Styles & Floating Card Positioning */}
      <style>{`
        .hero-fullscreen {
          min-height: calc(100vh - 64px);
          min-height: calc(100dvh - 64px);
        }

        .hero-floating-doodle {
          display: none;
          position: absolute;
          z-index: 1;
          pointer-events: auto;
          transition: transform 0.3s ease;
        }

        .hero-floating-doodle:hover {
          transform: scale(1.08) translateY(-4px);
        }

        .doodle-card {
          background-color: var(--surface-card);
          border: 1px solid var(--border-default);
          border-radius: var(--radius-xl);
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(8px);
        }

        .doodle-badge {
          font-size: 11px;
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        @media (min-width: 1024px) {
          .hero-floating-doodle {
            display: block;
          }
          .hero-doodle-tl {
            top: 12%;
            left: 4%;
            transform: rotate(-6deg);
          }
          .hero-doodle-tr {
            top: 14%;
            right: 4%;
            transform: rotate(5deg);
          }
          .hero-doodle-bl {
            bottom: 12%;
            left: 6%;
            transform: rotate(4deg);
          }
          .hero-doodle-br {
            bottom: 14%;
            right: 6%;
            transform: rotate(-5deg);
          }
        }

        @media (min-width: 900px) {
          .desktop-arrow {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};
