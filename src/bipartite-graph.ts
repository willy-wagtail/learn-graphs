import { Graph } from "./graph";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { IncidenceMap } from "./incidence-map";

/**
 * A graph is bipartite if its vertices can 
 * be partitioned into two such that every 
 * edge has an end in each. 
 * 
 * The two sets are called a bipartition of 
 * the graph.
 */
export class BipartiteGraph extends Graph {

    constructor(
        public readonly vertices: Vertex[] = [],
        public readonly edges: Edge[] = [],
        public readonly incidenceMap: IncidenceMap
    ) {
        super(vertices, edges, incidenceMap);
        this.checkIsBipartite();
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

    private checkIsBipartite(): void {
        // TODO
    }

}