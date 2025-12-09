import { Person } from "./person.model";
import { GestionPosition } from "./gestion-position.model";

export interface Designation {
    uuid: string,
    estado: boolean,
    gestion: string,
    gestionCargoDto: GestionPosition,
    personaDto: Person,
    tipoContrato: string,
    nroItemContrato: string,
    fechaInicio: string,
    fechaFin: string,
}