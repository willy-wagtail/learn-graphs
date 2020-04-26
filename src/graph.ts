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
        public vertices: Vertex[] = [],
        public edges: Edge[] = [],
        public incidenceMap: IncidenceMap
    ) {
        // TODO: check that incidenceFn maps every edge
    }

    /**
     * Two vertices are adjacent if 
     * there is an edge connecting them.
     * 
     * @param first
     * @param second 
     */
    adjacentVertices(
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

        return this.adjacentVertices(first, second);
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
        return false; // todo
    }

}