import { Graph } from "./graph";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A cycle is a graph with 3 or more verrtices
 * arranged in a cyclic sequence such that 
 * consecutive vertices are adjacent.
 */
export class Cycle extends Graph {

    constructor(
        public readonly vertices: Vertex[] = [],
        public readonly edges: Edge[] = [],
        public readonly incidenceMap: IncidenceMap
    ) {
        super(vertices, edges, incidenceMap);
        this.checkIsCycle();
    }

    /**
     * The length of a cycle is its number of edges.
     * A cycle of length k is called a k-cycle.
     */
    length(): number {
        return this.edges.length;
    }

    triangle(): boolean {
        return this.length() === 3;
    }

    quadilateral(): boolean {
        return this.length() === 4;
    }

    pentagon(): boolean {
        return this.length() === 5;
    }

    hexagon(): boolean {
        return this.length() === 6;
    }

    private checkIsCycle(): void {
        // TODO
    }

}