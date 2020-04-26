import { Vertex } from "./vertex";
import { IncidenceMap } from "./incidence-map";

export abstract class Edge {

    /**
     * An edge joins two vertices if the
     * IncidenceMap maps it to those two 
     * vertices.
     * 
     * @param vertex1 
     * @param vertex2 
     * @param incidenceMap 
     */
    joins(
        vertex1: Vertex,
        vertex2: Vertex,
        incidenceMap: IncidenceMap
    ): boolean {
        const [end1, end2] = incidenceMap(this);
        
        return (vertex1.equalTo(end1) && vertex2.equalTo(end2))
            || (vertex1.equalTo(end2) && vertex2.equalTo(end1));
    }
}