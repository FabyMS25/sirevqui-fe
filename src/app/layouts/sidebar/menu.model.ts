export interface MenuItem {
  uuid?: string;
  modulo?: string;
  codigo?:string;

  orden:number;
  nombreMenu:string;
  accion?:string;
  icono?: string;
  ruta?: string;
  permisoHijoListDto?: any;
  permisoPadreDto?: number;

  
  isTitle?: boolean;
  badge?: any;
  isLayout?: boolean;
  isCollapsed?: any;
}
