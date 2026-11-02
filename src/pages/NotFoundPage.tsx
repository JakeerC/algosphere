import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Layers, Activity, Zap } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: 'var(--space-8) var(--space-4)'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--state-pivot-bg)',
        border: '2px solid var(--state-pivot)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--state-pivot)',
        marginBottom: 'var(--space-4)'
      }}>
        <HelpCircle size={36} />
      </div>

      <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
        404 — Route Not Found
      </h1>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '460px', marginBottom: 'var(--space-6)' }}>
        The algorithm module or page path you requested does not exist or may have been reorganized.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>
        <Link to="/visualizer/sorting" className="btn btn-secondary">
          <Activity size={16} />
          <span>Interactive Visualizer</span>
        </Link>
        <Link to="/compare" className="btn btn-secondary">
          <Zap size={16} />
          <span>Race Arena</span>
        </Link>
      </div>
    </div>
  );
};
