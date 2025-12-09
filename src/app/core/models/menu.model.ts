export interface MenuItem {
  uuid?: string;
  estado?: boolean;
  modulo?: string;
  codigo?:string;

  orden:number;
  nombreMenu:string;
  accion?:string;
  icono?: string;
  ruta?: string;
  permisoHijoListDto: MenuItem[];
  permisoPadreDto?: any;
  subNivel?:boolean;

  isTitle?: boolean;
  badge?: any;
  isLayout?: boolean;
  isCollapsed?: any;
}
