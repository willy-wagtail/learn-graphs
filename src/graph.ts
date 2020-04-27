import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A graph consists of vertices, edges, 
 * and an incidence function which maps
 * each edge to it's end vertices.
 */
export abstract class Graph {

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
    simple(): boolean {
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

    private checkIncidenceMap(): void {
        /**
         * TODO:
         *  Check that the incidenceMap maps every
         *  edge in this Graph.
         */
    }
}