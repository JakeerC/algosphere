import { GraphVisualState, GraphVertex, GraphEdge } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const GRAPH_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'BFS': [
    { num: 1, code: 'function BFS(graph, startVertex):', indent: 0 },
    { num: 2, code: '  create empty queue Q; mark start visited', indent: 1 },
    { num: 3, code: '  Q.enqueue(startVertex)', indent: 1 },
    { num: 4, code: '  while Q is not empty:', indent: 1 },
    { num: 5, code: '    curr = Q.dequeue()', indent: 2 },
    { num: 6, code: '    for each neighbor v of curr:', indent: 2 },
    { num: 7, code: '      if v is unvisited:', indent: 3 },
    { num: 8, code: '        mark v visited; Q.enqueue(v)', indent: 4 }
  ],
  'DFS': [
    { num: 1, code: 'function DFS(graph, curr):', indent: 0 },
    { num: 2, code: '  mark curr visited', indent: 1 },
    { num: 3, code: '  for each neighbor v of curr:', indent: 1 },
    { num: 4, code: '    if v is unvisited:', indent: 2 },
    { num: 5, code: '      DFS(graph, v) // recursive dive', indent: 3 },
    { num: 6, code: '  backtrack', indent: 1 }
  ],
  'Dijkstra': [
    { num: 1, code: 'function Dijkstra(graph, start):', indent: 0 },
    { num: 2, code: '  d[start] = 0; d[v] = ∞ for all other v', indent: 1 },
    { num: 3, code: '  PQ.insert(start, 0)', indent: 1 },
    { num: 4, code: '  while PQ is not empty:', indent: 1 },
    { num: 5, code: '    u = PQ.extractMin()', indent: 2 },
    { num: 6, code: '    for each neighbor (u, v) with weight w:', indent: 2 },
    { num: 7, code: '      if d[u] + w < d[v]:', indent: 3 },
    { num: 8, code: '        d[v] = d[u] + w; PQ.decreaseKey(v, d[v])', indent: 4 }
  ]
};

export function getSampleGraph(): GraphVisualState {
  const vertices: GraphVertex[] = [
    { id: '0', label: '0', x: 100, y: 150, state: 'default', distance: Infinity },
    { id: '1', label: '1', x: 250, y: 80, state: 'default', distance: Infinity },
    { id: '2', label: '2', x: 250, y: 220, state: 'default', distance: Infinity },
    { id: '3', label: '3', x: 420, y: 80, state: 'default', distance: Infinity },
    { id: '4', label: '4', x: 420, y: 220, state: 'default', distance: Infinity },
    { id: '5', label: '5', x: 570, y: 150, state: 'default', distance: Infinity }
  ];

  const edges: GraphEdge[] = [
    { id: 'e01', source: '0', target: '1', weight: 4, state: 'default' },
    { id: 'e02', source: '0', target: '2', weight: 2, state: 'default' },
    { id: 'e12', source: '1', target: '2', weight: 1, state: 'default' },
    { id: 'e13', source: '1', target: '3', weight: 5, state: 'default' },
    { id: 'e24', source: '2', target: '4', weight: 8, state: 'default' },
    { id: 'e34', source: '3', target: '4', weight: 2, state: 'default' },
    { id: 'e35', source: '3', target: '5', weight: 6, state: 'default' },
    { id: 'e45', source: '4', target: '5', weight: 3, state: 'default' }
  ];

  return { vertices, edges, queueOrStack: [] };
}

function cloneGraphState(state: GraphVisualState): GraphVisualState {
  return {
    vertices: state.vertices.map(v => ({ ...v })),
    edges: state.edges.map(e => ({ ...e })),
    queueOrStack: state.queueOrStack ? [...state.queueOrStack] : [],
    currentNodeId: state.currentNodeId
  };
}

// 1. BFS Generator
export function generateBfsSteps(startId: string = '0'): VisualStep<GraphVisualState>[] {
  const steps: VisualStep<GraphVisualState>[] = [];
  let graph = getSampleGraph();

  const startVertex = graph.vertices.find(v => v.id === startId)!;
  startVertex.state = 'active';
  graph.queueOrStack = [startId];
  const visited = new Set<string>([startId]);

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 3,
    description: `Initialize BFS from start vertex ${startId}. Added to FIFO queue.`,
    actionType: 'traverse',
    variables: { start: startId, queue: [startId] },
    state: cloneGraphState(graph)
  });

  while (graph.queueOrStack!.length > 0) {
    const currId = graph.queueOrStack!.shift()!;
    graph = cloneGraphState(graph);
    graph.currentNodeId = currId;
    const currV = graph.vertices.find(v => v.id === currId)!;
    currV.state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 5,
      description: `Dequeued vertex ${currId}. Expanding all unvisited neighbors.`,
      actionType: 'visit',
      variables: { current: currId, queue: [...graph.queueOrStack!] },
      state: cloneGraphState(graph)
    });

    // Find outgoing edges
    const outgoing = graph.edges.filter(e => e.source === currId || e.target === currId);
    for (const edge of outgoing) {
      const neighborId = edge.source === currId ? edge.target : edge.source;
      const neighborV = graph.vertices.find(v => v.id === neighborId)!;

      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        graph = cloneGraphState(graph);
        edge.state = 'inspect';
        neighborV.state = 'active';
        graph.queueOrStack!.push(neighborId);

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 8,
          description: `Discovered unvisited neighbor ${neighborId} via edge (${currId}, ${neighborId}). Enqueued!`,
          actionType: 'traverse',
          variables: { current: currId, neighbor: neighborId, queue: [...graph.queueOrStack!] },
          state: cloneGraphState(graph)
        });

        edge.state = 'visited';
      }
    }

    currV.state = 'sorted'; // finalized
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 8,
    description: 'Breadth-First Search complete! All connected vertices visited.',
    actionType: 'complete',
    variables: { status: 'BFS_DONE', visitedCount: visited.size },
    state: cloneGraphState(graph)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 2. Dijkstra Steps
export function generateDijkstraSteps(startId: string = '0'): VisualStep<GraphVisualState>[] {
  const steps: VisualStep<GraphVisualState>[] = [];
  let graph = getSampleGraph();

  // Distances
  const dist: Record<string, number> = {};
  graph.vertices.forEach(v => {
    dist[v.id] = v.id === startId ? 0 : Infinity;
    v.distance = dist[v.id];
  });

  const pq: { id: string; d: number }[] = [{ id: startId, d: 0 }];
  const finalized = new Set<string>();

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Initialized Dijkstra from source ${startId}. d[${startId}] = 0, all other d[v] = ∞.`,
    actionType: 'traverse',
    variables: { source: startId, 'd[start]': 0 },
    state: cloneGraphState(graph)
  });

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { id: u, d } = pq.shift()!;

    if (finalized.has(u)) continue;
    finalized.add(u);

    graph = cloneGraphState(graph);
    graph.currentNodeId = u;
    const uVertex = graph.vertices.find(v => v.id === u)!;
    uVertex.state = 'sorted';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 5,
      description: `Extracted vertex ${u} with minimum known distance ${d}. Shortest path locked!`,
      actionType: 'pivot',
      variables: { u, minDistance: d, finalizedCount: finalized.size },
      state: cloneGraphState(graph)
    });

    const incidentEdges = graph.edges.filter(e => e.source === u || e.target === u);
    for (const edge of incidentEdges) {
      const v = edge.source === u ? edge.target : edge.source;
      const weight = edge.weight || 1;

      if (!finalized.has(v)) {
        const alt = dist[u] + weight;
        if (alt < dist[v]) {
          dist[v] = alt;
          pq.push({ id: v, d: alt });

          graph = cloneGraphState(graph);
          edge.state = 'inspect';
          const vVertex = graph.vertices.find(vert => vert.id === v)!;
          vVertex.distance = alt;
          vVertex.state = 'active';

          steps.push({
            stepIndex: steps.length,
            totalSteps: 0,
            line: 8,
            description: `Relaxed edge (${u}, ${v}) with weight ${weight}: shorter path found! New d[${v}] = ${alt}.`,
            actionType: 'swap',
            variables: { u, v, weight, newDistance: alt },
            state: cloneGraphState(graph)
          });

          edge.state = 'visited';
        }
      }
    }
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 8,
    description: 'Dijkstra shortest path algorithm finalized! Optimal distances computed for all vertices.',
    actionType: 'complete',
    variables: { status: 'OPTIMAL_DISTANCES_FOUND' },
    state: cloneGraphState(graph)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
