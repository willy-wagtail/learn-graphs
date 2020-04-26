import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A graph consists of vertices, edges, 
 * and an incidence function which maps
 * each edge to it's end vertices.
 */
export class Graph {

    constructor(
        public readonly vertices: Vertex[] = [],
        public readonly edges: Edge[] = [],
        public readonly incidenceMap: IncidenceMap
    ) {
        this.checkIncidenceMap();
    }

    /**
     * Two vertices are adjacent if 
     * there is an edge connecting them.
     * 
     * @param first
     * @param second 
     */
    adjacent(
        first: Vertex,
        second: Vertex
    ): boolean {
        if (this.edges === []) {
            return false;
        }

        for (const edge of this.edges) {
            const [end1, end2] = this.incidenceMap(edge);

            const isConnectingEdge: boolean =
                (first.equalTo(end1) && second.equalTo(end2))
                || (first.equalTo(end2) && second.equalTo(end1));

            if (isConnectingEdge) {
                return true;
            }
        }

        return false;
    }

    /**
     * Two vertices are neighbours
     * if they are adjacent and distinct.
     * 
     * @param first 
     * @param second 
     */
    neighbours(
        first: Vertex,
        second: Vertex
    ): boolean {
        if (first.equalTo(second)) {
            return false;
        }

        return this.adjacent(first, second);
    }

    allNeighbours(check: Vertex): Set<Vertex> {
        const neighbours: Set<Vertex> = new Set();

        for (const vertex of this.vertices) {
            if (this.neighbours(check, vertex)) {
                neighbours.add(vertex);
            }
        }

        return neighbours;
    }

    /**
     * A graph is a null graph if it has 
     * no vertices (and hence no edges).
     */
    null(): boolean {
        return this.vertices.length === 0;
    }

    /**
     * A graph with only one vertex is 
     * called a trivial graph.
     */
    trivial(): boolean {
        return this.vertices.length === 1;
    }

    nonTrivial(): boolean {
        return !this.trivial();
    }

    /**
     * A graph is a simple graph if it has
     * no loops or parallel edges.
     */
    isSimple(): boolean {
        return !this.hasLoops()
            && !this.hasParallelEdges();
    }

    hasLoops(): boolean {
        for (const edge of this.edges) {
            if (edge.loop(this.incidenceMap)) {
                return true;
            }
        }

        return false;
    }

    hasParallelEdges(): boolean {
        // TODO: Can we make this more efficient?
        const edgesToCheck = this.edges.splice(0);

        for (const edge1 of this.edges) {
            edgesToCheck.shift();

            for (const edge2 of edgesToCheck) {
                if (edge1.parallel(edge2, this.incidenceMap)) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * A graph is a complete graph if it is 
     * a simple graph and where any pair of 
     * vertices are adjacent.
     */
    complete(): boolean {
        // TODO
        return true;
    }

    /**
     * A graph is an empty graph if no two 
     * vertices are adjacent (i.e. there 
     * are no edges).
     */
    empty(): boolean {
        return this.edges.length === 0;
    }

    /**
     * A graph is bipartite if its vertices can 
     * be partitioned into two such that every 
     * edge has an end in each. The two sets are
     * called a bipartition of the graph.
     */
    bipartite(): boolean {
        // TODO
        return false;
    }

    completeBipartite(): boolean {
        return this.complete()
            && this.bipartite();
    }

    /**
     * A star graph is a complete bipartite graph
     * where the size of one of the bipartitions
     * is equal to 1.
     */
    star(): boolean {
        /**
         * TODO
         *  Find bipartition
         *  Check one of them has size = 1
         */
        return false;
    }

    /**
     * A path is a simple graph whose vertices can
     * be arranged in a linear sequence such that
     * consecutive vertices are adjacent.
     */
    path(): boolean {
        // TODO
        return false;
    }

    /**
     * The length of a path is its number of edges.
     * A path of length k is called a k-path.
     * 
     * Returns null if graph is not a path.
     */
    pathLength(): number | null {
        return this.path()
            ? this.vertices.length
            : null;
    }

    /**
     * A cycle is a graph with 3 or more verrtices
     * arranged in a cyclic sequence such that 
     * consecutive vertices are adjacent.
     */
    cycle(): boolean {
        // TODO
        return false;
    }

    /**
     * The length of a cycle is its number of edges.
     * A cycle of length k is called a k-cycle.
     * 
     * Returns null if graph is not a cycle.
     */
    cycleLength(): number | null {
        return this.cycle()
            ? this.vertices.length
            : null;
    }

    triangle(): boolean {
        return this.cycleLength() === 3;
    }

    quadilateral(): boolean {
        return this.cycleLength() === 4;
    }

    pentagon(): boolean {
        return this.cycleLength() === 5;
    }

    hexagon(): boolean {
        return this.cycleLength() === 6;
    }

    private checkIncidenceMap(): void {
        /**
         * TODO:
         *  Check that the incidenceMap maps every
         *  edge in this Graph.
         */
    }
}