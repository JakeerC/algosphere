import { SCRIBBLES_ASSETS, ScribbleAsset } from 'scribblekit';
import rawAlgoData from './algorithmsScribbles.json';

export const ALGORITHM_SCRIBBLES: ScribbleAsset[] = (rawAlgoData as any[]).map((item) => ({
  id: item.id,
  name: item.name,
  category: 'algorithms-data-structures',
  tags: item.tags || [],
  viewBox: item.viewBox || '0 0 200 120',
  type: (item.type || 'stroke') as 'stroke' | 'fill' | 'mixed',
  defaultColor: item.defaultColor || '#EA552B',
  description: item.description || '',
  path: item.path,
  rawSvg: item.rawSvg,
}));

// Register into scribblekit's runtime asset registry if not already registered
const existingIds = new Set(SCRIBBLES_ASSETS.map((a) => a.id));
for (const asset of ALGORITHM_SCRIBBLES) {
  if (!existingIds.has(asset.id)) {
    SCRIBBLES_ASSETS.push(asset);
    existingIds.add(asset.id);
  }
}

/**
 * Mapping of AlgoSphere module IDs to hand-drawn algorithm scribble names from scribble-kit
 */
export const MODULE_SCRIBBLE_MAP: Record<string, { scribbleId: string; accentColor: string }> = {
  sorting: {
    scribbleId: 'algo-quicksort-partition',
    accentColor: '#EA552B',
  },
  'bst-avl': {
    scribbleId: 'algo-binary-tree',
    accentColor: '#55BBDA',
  },
  'graph-traversal': {
    scribbleId: 'algo-graph-network',
    accentColor: '#4CA96D',
  },
  'shortest-path': {
    scribbleId: 'algo-shortest-path-dijkstra',
    accentColor: '#55BBDA',
  },
  'linear-structures': {
    scribbleId: 'algo-linked-list',
    accentColor: '#F7D046',
  },
  'dynamic-programming': {
    scribbleId: 'algo-recursion-spiral',
    accentColor: '#EE8DB9',
  },
  'binary-heap': {
    scribbleId: 'algo-heap-tree',
    accentColor: '#F7D046',
  },
  'hash-table': {
    scribbleId: 'algo-hash-table',
    accentColor: '#0BDC85',
  },
  mst: {
    scribbleId: 'algo-min-spanning-tree',
    accentColor: '#F7D046',
  },
  'union-find': {
    scribbleId: 'algo-union-find-dsu',
    accentColor: '#EE8DB9',
  },
};

/**
 * Helper to get a scribble asset by id
 */
export function getAlgorithmScribble(id: string): ScribbleAsset | undefined {
  return ALGORITHM_SCRIBBLES.find((s) => s.id === id);
}
