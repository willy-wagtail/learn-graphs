import { Edge } from "./edge";
import { Vertex } from "./vertex";

export type IncidenceMap
 = (edge: Edge) => [Vertex, Vertex];