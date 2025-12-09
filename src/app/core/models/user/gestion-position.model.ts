import { Gestion } from "./gestion.model";
import { Position } from "./Position.model";
export interface GestionPosition
 {
    //uuid: string,
    //gestion: number,
    //fechaInicio: string,
   // fechaFin: string,
   // estado: boolean,
    uuid: string,
    gestionDto: Gestion,
    cargoDto: Position,
    estado: boolean,
    designacionFuncionarioDtos: string[],
}