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
  ],
  'Prim': [
    { num: 1, code: 'function Prim(graph, start):', indent: 0 },
    { num: 2, code: '  T = {start}; MST = []', indent: 1 },
    { num: 3, code: '  while |T| < |V|:', indent: 1 },
    { num: 4, code: '    find min-weight edge (u, v) with u ∈ T, v ∉ T', indent: 2 },
    { num: 5, code: '    MST.add((u, v)); T.add(v)', indent: 2 },
    { num: 6, code: '  return MST', indent: 1 }
  ],
  'Kruskal': [
    { num: 1, code: 'function Kruskal(graph):', indent: 0 },
    { num: 2, code: '  sort all edges E by non-decreasing weight', indent: 1 },
    { num: 3, code: '  initialize UFDS for each vertex', indent: 1 },
    { num: 4, code: '  for each edge (u, v) in sorted order:', indent: 1 },
    { num: 5, code: '    if find(u) != find(v):', indent: 2 },
    { num: 6, code: '      union(u, v); MST.add((u, v))', indent: 3 },
    { num: 7, code: '  return MST', indent: 1 }
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

// 3. DFS Generator
export function generateDfsSteps(startId: string = '0'): VisualStep<GraphVisualState>[] {
  const steps: VisualStep<GraphVisualState>[] = [];
  let graph = getSampleGraph();
  const visited = new Set<string>();
  const callStack: string[] = [];

  function dfsRecursive(currId: string) {
    visited.add(currId);
    callStack.push(currId);

    graph = cloneGraphState(graph);
    graph.currentNodeId = currId;
    graph.queueOrStack = [...callStack];
    const currV = graph.vertices.find(v => v.id === currId)!;
    currV.state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 2,
      description: `Visited vertex ${currId}. Pushed to active DFS call stack.`,
      actionType: 'visit',
      variables: { current: currId, callStack: [...callStack], visitedCount: visited.size },
      state: cloneGraphState(graph)
    });

    const incident = graph.edges.filter(e => e.source === currId || e.target === currId);
    for (const edge of incident) {
      const neighborId = edge.source === currId ? edge.target : edge.source;
      const neighborV = graph.vertices.find(v => v.id === neighborId)!;

      if (!visited.has(neighborId)) {
        graph = cloneGraphState(graph);
        edge.state = 'inspect';
        neighborV.state = 'active';

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 5,
          description: `Discovered unvisited neighbor ${neighborId} from ${currId}. Diving recursively down edge (${currId}, ${neighborId}).`,
          actionType: 'traverse',
          variables: { current: currId, divingTo: neighborId, edge: `(${currId}, ${neighborId})` },
          state: cloneGraphState(graph)
        });

        edge.state = 'visited';
        dfsRecursive(neighborId);

        graph = cloneGraphState(graph);
        graph.currentNodeId = currId;
        graph.queueOrStack = [...callStack];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 6,
          description: `Backtracked to vertex ${currId} after exploring subtree at ${neighborId}.`,
          actionType: 'traverse',
          variables: { backtrackedTo: currId, callStack: [...callStack] },
          state: cloneGraphState(graph)
        });
      }
    }

    callStack.pop();
    currV.state = 'sorted';
  }

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Initiate Depth-First Search (DFS) from start vertex ${startId}.`,
    actionType: 'traverse',
    variables: { start: startId },
    state: cloneGraphState(graph)
  });

  dfsRecursive(startId);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: 'Depth-First Search complete! All connected vertices traversed.',
    actionType: 'complete',
    variables: { status: 'DFS_DONE', visitedTotal: visited.size },
    state: cloneGraphState(graph)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 4. Kruskal's MST Generator
export function generateKruskalSteps(): VisualStep<GraphVisualState>[] {
  const steps: VisualStep<GraphVisualState>[] = [];
  let graph = getSampleGraph();

  // Sort edges by weight ascending
  const sortedEdges = [...graph.edges].sort((a, b) => (a.weight || 0) - (b.weight || 0));

  // Disjoint set for cycle detection
  const parent: Record<string, string> = {};
  graph.vertices.forEach(v => parent[v.id] = v.id);

  function find(u: string): string {
    if (parent[u] === u) return u;
    return parent[u] = find(parent[u]);
  }

  function union(u: string, v: string) {
    const rootU = find(u);
    const rootV = find(v);
    if (rootU !== rootV) parent[rootU] = rootV;
  }

  let mstWeight = 0;
  const mstEdgeIds = new Set<string>();

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Sorted all ${sortedEdges.length} edges by weight. Initialized empty Minimum Spanning Tree (MST).`,
    actionType: 'traverse',
    variables: { sortedEdgeWeights: sortedEdges.map(e => `${e.source}-${e.target} (${e.weight})`), mstWeight: 0 },
    state: cloneGraphState(graph)
  });

  for (const edge of sortedEdges) {
    const u = edge.source;
    const v = edge.target;
    const w = edge.weight || 1;

    graph = cloneGraphState(graph);
    const currEdge = graph.edges.find(e => e.id === edge.id)!;
    currEdge.state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Examining edge (${u}, ${v}) with weight ${w}. Checking if endpoints belong to different disjoint sets.`,
      actionType: 'compare',
      variables: { u, v, weight: w, 'find(u)': find(u), 'find(v)': find(v) },
      state: cloneGraphState(graph)
    });

    if (find(u) !== find(v)) {
      union(u, v);
      mstEdgeIds.add(edge.id);
      mstWeight += w;

      graph = cloneGraphState(graph);
      const chosenEdge = graph.edges.find(e => e.id === edge.id)!;
      chosenEdge.state = 'sorted';
      const uV = graph.vertices.find(vert => vert.id === u)!;
      const vV = graph.vertices.find(vert => vert.id === v)!;
      uV.state = 'sorted';
      vV.state = 'sorted';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 6,
        description: `Edge (${u}, ${v}) does not create a cycle! Added to MST. Total MST weight is now ${mstWeight}.`,
        actionType: 'swap',
        variables: { addedEdge: `(${u}, ${v})`, weight: w, currentMstWeight: mstWeight, edgesCount: mstEdgeIds.size },
        state: cloneGraphState(graph)
      });
    } else {
      graph = cloneGraphState(graph);
      const rejectedEdge = graph.edges.find(e => e.id === edge.id)!;
      rejectedEdge.state = 'pivot'; // cycle violation

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Edge (${u}, ${v}) rejected! Endpoints are already connected in the same component (would create a cycle).`,
        actionType: 'compare',
        variables: { rejectedEdge: `(${u}, ${v})`, reason: 'CYCLE_DETECTED' },
        state: cloneGraphState(graph)
      });
    }

    if (mstEdgeIds.size === graph.vertices.length - 1) break;
  }

  // Restore non-MST edges to default
  graph = cloneGraphState(graph);
  graph.edges.forEach(e => {
    if (!mstEdgeIds.has(e.id)) e.state = 'default';
  });

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 7,
    description: `Kruskal MST complete! Formed a connected tree with ${mstEdgeIds.size} edges and minimal total weight = ${mstWeight}.`,
    actionType: 'complete',
    variables: { status: 'MST_COMPLETE', totalWeight: mstWeight, totalEdges: mstEdgeIds.size },
    state: cloneGraphState(graph)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 5. Prim's MST Generator
export function generatePrimSteps(startId: string = '0'): VisualStep<GraphVisualState>[] {
  const steps: VisualStep<GraphVisualState>[] = [];
  let graph = getSampleGraph();
  const inMst = new Set<string>([startId]);
  const mstEdgeIds = new Set<string>();
  let mstWeight = 0;

  graph = cloneGraphState(graph);
  const startV = graph.vertices.find(v => v.id === startId)!;
  startV.state = 'sorted';

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Initiate Prim's Algorithm from seed vertex ${startId}. Invariant: tree T grows by 1 vertex each round.`,
    actionType: 'traverse',
    variables: { root: startId, mstVertices: [startId], mstWeight: 0 },
    state: cloneGraphState(graph)
  });

  while (inMst.size < graph.vertices.length) {
    // Find crossing edge with min weight
    let bestEdge: GraphEdge | null = null;
    let bestWeight = Infinity;
    let nextVertexId = '';

    for (const edge of graph.edges) {
      const uIn = inMst.has(edge.source);
      const vIn = inMst.has(edge.target);
      if ((uIn && !vIn) || (!uIn && vIn)) {
        const w = edge.weight || 1;
        if (w < bestWeight) {
          bestWeight = w;
          bestEdge = edge;
          nextVertexId = uIn ? edge.target : edge.source;
        }
      }
    }

    if (!bestEdge) break;

    graph = cloneGraphState(graph);
    const crossingEdge = graph.edges.find(e => e.id === bestEdge!.id)!;
    crossingEdge.state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Evaluating crossing cut edges. Minimum weight cut edge found: (${bestEdge.source}, ${bestEdge.target}) with weight ${bestWeight}.`,
      actionType: 'compare',
      variables: { minCrossingEdge: `(${bestEdge.source}, ${bestEdge.target})`, weight: bestWeight, connectsTo: nextVertexId },
      state: cloneGraphState(graph)
    });

    inMst.add(nextVertexId);
    mstEdgeIds.add(bestEdge.id);
    mstWeight += bestWeight;

    graph = cloneGraphState(graph);
    const addedEdge = graph.edges.find(e => e.id === bestEdge!.id)!;
    addedEdge.state = 'sorted';
    const newVertex = graph.vertices.find(v => v.id === nextVertexId)!;
    newVertex.state = 'sorted';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 5,
      description: `Added vertex ${nextVertexId} and edge (${bestEdge.source}, ${bestEdge.target}) to Prim MST. Total weight: ${mstWeight}.`,
      actionType: 'swap',
      variables: { newMstVertex: nextVertexId, totalMstWeight: mstWeight, inMstCount: inMst.size },
      state: cloneGraphState(graph)
    });
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: `Prim's MST algorithm finished! Minimum Spanning Tree spanning all ${graph.vertices.length} vertices with weight ${mstWeight}.`,
    actionType: 'complete',
    variables: { status: 'MST_LOCKED', totalWeight: mstWeight, totalEdges: mstEdgeIds.size },
    state: cloneGraphState(graph)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

