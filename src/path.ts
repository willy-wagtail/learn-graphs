import { Graph } from "./graph";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A path is a simple graph whose vertices can
 * be arranged in a linear sequence such that
 * consecutive vertices are adjacent.
 */
export class Path extends Graph {

    constructor(
        public readonly vertices: Vertex[] = [],
        public readonly edges: Edge[] = [],
        public readonly incidenceMap: IncidenceMap
    ) {
        super(vertices, edges, incidenceMap);
        this.checkIsPath();
    }

    /**
     * The length of a path is its number of edges.
     * A path of length k is called a k-path.
     */
    length(): number | null {
        return this.edges.length
    }

    private checkIsPath(): void {
        // TODO
    }

}