export interface Staff {
  uuid?: string;
  estado?: boolean;

  uuidUsuario: string; // uuid referencial to external user system
  avatar:string;
  activo: boolean;
  nombreCompleto: String;//max = 100,
  numeroDocumento: String;//max = 15,
  tipoDocumento: String;// length = 3
  expedido:number

  unidad: string; //max = 100,
  cargo: string; //max = 150,
}