export interface Period {
  uuid?: string;
  estado?: boolean;
  // fechaCreacion?: Date;

  year: number;
  estadoGestion:string;
  fechaInicio?: Date|string; 
  fechaFin?: Date|string; 

}