import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ExternalLink,
  Activity,
  ShieldCheck,
  Zap,
  Layers,
  AlertTriangle,
  Clock,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { Scribble } from "scribblekit";
import { AlgorithmTheory } from "../../data/algorithmTheories";
import { ScribbleAsset } from "scribblekit";

interface AlgorithmTheoryModalProps {
  theory: AlgorithmTheory | null;
  asset: ScribbleAsset | null;
  onClose: () => void;
}

export const AlgorithmTheoryModal: React.FC<AlgorithmTheoryModalProps> = ({
  theory,
  asset,
  onClose,
}) => {
  useEffect(() => {
    if (!theory) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [theory, onClose]);

  if (!theory || !asset) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "hsla(228, 20%, 4%, 0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
        overflowY: "auto",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "760px",
          backgroundColor: "var(--surface-card)",
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          animation: "scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "var(--space-4)",
            padding: "var(--space-5) var(--space-6)",
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "var(--surface-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "var(--radius-xl)",
                backgroundColor: "var(--surface-card)",
                border: `2px solid ${asset.defaultColor || "var(--primary-500)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Scribble
                name={asset.id}
                size={46}
                color={asset.defaultColor}
                animate="wobble"
              />
            </div>

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: asset.defaultColor || "var(--primary-400)",
                  marginBottom: "4px",
                }}
              >
                <span>{theory.categoryLabel}</span>
              </div>
              <h2
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: 800,
                  margin: 0,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {theory.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{
              borderRadius: "var(--radius-full)",
              width: "36px",
              height: "36px",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-secondary)",
              flexShrink: 0,
            }}
            title="Close modal (Esc)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div
          style={{
            padding: "var(--space-6)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
          }}
        >
          {/* Executive Summary */}
          <div
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              backgroundColor: "var(--surface-subtle)",
              padding: "var(--space-4) var(--space-5)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <strong style={{ color: "var(--text-primary)" }}>Core Concept: </strong>
            {theory.summary}
          </div>

          {/* Theoretical Complexity HUD */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-3) var(--space-4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: "var(--text-tertiary)",
                  marginBottom: "4px",
                }}
              >
                <Clock size={12} />
                <span>Time (Average)</span>
              </div>
              <div
                style={{
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: "var(--state-inspect)",
                }}
              >
                {theory.timeComplexity.average}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-3) var(--space-4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: "var(--text-tertiary)",
                  marginBottom: "4px",
                }}
              >
                <Clock size={12} />
                <span>Time (Worst)</span>
              </div>
              <div
                style={{
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  color: "var(--danger-500)",
                }}
              >
                {theory.timeComplexity.worst}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--surface-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-3) var(--space-4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: "var(--text-tertiary)",
                  marginBottom: "4px",
                }}
              >
                <HardDrive size={12} />
                <span>Space Complexity</span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--primary-400)",
                  lineHeight: 1.3,
                }}
              >
                {theory.spaceComplexity}
              </div>
            </div>
          </div>

          {/* Mathematical / Core Invariant Callout */}
          <div
            style={{
              backgroundColor: "var(--surface-card)",
              border: `1px solid ${asset.defaultColor || "var(--primary-500)"}`,
              borderLeftWidth: "4px",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-4) var(--space-5)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                color: asset.defaultColor || "var(--primary-400)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <ShieldCheck size={15} />
              <span>Mathematical Invariant &amp; Correctness Guarantee</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: "var(--text-primary)",
                lineHeight: 1.5,
                backgroundColor: "var(--surface-subtle)",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {theory.coreInvariant}
            </div>
          </div>

          {/* Two-Column Grid: Operations & Applications */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {/* Key Operations */}
            <div
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <Zap size={14} color="var(--primary-400)" />
                <span>Key Mechanics &amp; Operations</span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {theory.keyOperations.map((op, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "var(--text-xs)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--primary-500)",
                        fontWeight: 700,
                        marginTop: "1px",
                      }}
                    >
                      &bull;
                    </span>
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div
              style={{
                backgroundColor: "var(--surface-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--space-4)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "var(--space-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                <Layers size={14} color="var(--state-sorted)" />
                <span>Systems &amp; Real-World Use Cases</span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {theory.applications.map((app, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "var(--text-xs)",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2
                      size={12}
                      color="var(--state-sorted)"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Pitfalls & Edge Cases */}
          <div
            style={{
              backgroundColor: "var(--surface-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--space-4)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "var(--text-xs)",
                fontWeight: 700,
                color: "var(--state-swap)",
                marginBottom: "var(--space-2)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <AlertTriangle size={14} />
              <span>Common Pitfalls &amp; Edge Cases</span>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {theory.edgeCases.map((edge, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "var(--text-xs)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: "var(--state-swap)",
                      fontWeight: 700,
                      marginTop: "1px",
                    }}
                  >
                    !
                  </span>
                  <span>{edge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-4) var(--space-6)",
            borderTop: "1px solid var(--border-subtle)",
            backgroundColor: "var(--surface-subtle)",
          }}
        >
          <div style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>
            Tip: Press <kbd style={{ padding: "1px 5px" }}>Esc</kbd> to close
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <button
              onClick={onClose}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: "var(--radius-full)", padding: "6px 16px" }}
            >
              Close
            </button>

            {theory.visualizerLink && (
              <Link
                to={theory.visualizerLink}
                onClick={onClose}
                className="btn btn-primary btn-sm"
                style={{
                  borderRadius: "var(--radius-full)",
                  padding: "6px 18px",
                  gap: "6px",
                }}
              >
                <Activity size={14} />
                <span>Launch Interactive Visualizer</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
