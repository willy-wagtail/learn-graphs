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

    /**
     * An edge is a loop if both end vertices
     * are identical.
     * 
     * @param edge
     */
    loop(incidenceMap: IncidenceMap): boolean {
        const [end1, end2] = incidenceMap(this);
        return end1.equalTo(end2);
    }

    /**
     * Two edges are parallel if they have 
     * the same end vertices.
     * 
     * @param edge1
     * @param edge2 
     */
    parallel(
        edge: Edge,
        incidenceMap: IncidenceMap
    ): boolean {
        const [edge1End1, edge1End2] = incidenceMap(this);
        const [edge2End1, edge2End2] = incidenceMap(edge);

        return (edge1End1.equalTo(edge2End1) && edge1End2.equalTo(edge2End2))
            || (edge1End1.equalTo(edge2End2) && edge1End2.equalTo(edge2End1));
    }
}