import React from 'react';
import { Info, ArrowLeftRight, CheckCircle2, Crosshair, RefreshCw, GitBranch, Terminal } from 'lucide-react';
import { Badge } from '../common/Badge';

interface StepNarratorProps {
  description: string;
  actionType: 'compare' | 'swap' | 'overwrite' | 'pivot' | 'visit' | 'complete' | 'traverse' | 'insert' | 'rotate';
  stepIndex: number;
}

export const StepNarrator: React.FC<StepNarratorProps> = ({
  description,
  actionType,
  stepIndex
}) => {
  const getActionBadge = () => {
    switch (actionType) {
      case 'compare':
        return <Badge variant="warning" icon={<ArrowLeftRight size={12} />}>Comparing</Badge>;
      case 'swap':
        return <Badge variant="primary" icon={<RefreshCw size={12} />}>Swapping</Badge>;
      case 'pivot':
        return <Badge variant="danger" icon={<Crosshair size={12} />}>Pivot / Key</Badge>;
      case 'complete':
        return <Badge variant="success" icon={<CheckCircle2 size={12} />}>Finalized</Badge>;
      case 'rotate':
        return <Badge variant="primary" icon={<RefreshCw size={12} />}>AVL Rotation</Badge>;
      case 'insert':
        return <Badge variant="success" icon={<GitBranch size={12} />}>Node Insert</Badge>;
      default:
        return <Badge variant="neutral" icon={<Terminal size={12} />}>Traversing</Badge>;
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--surface-subtle)',
      borderBottom: 'var(--border-1) solid var(--border-subtle)',
      padding: 'var(--space-3) var(--space-4)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }}>
      <div style={{ flexShrink: 0 }}>
        {getActionBadge()}
      </div>

      <div style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-primary)',
        lineHeight: 'var(--leading-normal)',
        flex: 1
      }}>
        {description}
      </div>

      <div style={{
        fontSize: 'var(--text-xs)',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-tertiary)',
        flexShrink: 0
      }}>
        Step #{stepIndex}
      </div>
    </div>
  );
};
