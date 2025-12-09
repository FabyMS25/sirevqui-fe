import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Memoize } from './memoize.decorator';
import * as userData from 'src/app/core/constants/UserData';
import * as statusData from 'src/app/core/constants/statusEmuns';
import { CityAcronym } from 'src/app/core/constants/Places';

interface ColumnDefinition {
  name: string;
  prop: string;
  visible: boolean;
  tag?: boolean;
  category?: any[];
  date?: boolean;
  cost?:boolean;
  color?: boolean,
  html?: boolean;
  image?: boolean;
  avatar?: boolean;
  primary?: boolean;
}

interface TableActions {
  show?: boolean;  
  edit?: boolean;  
  close?: string;
  check?: string;
  process?: string;
  telf?: boolean; 
  notify?: boolean;
  consult?:boolean;
  change?: boolean; 
  validate?:boolean;
  records?: boolean;
  toggle?: boolean | [string, string];
}

interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  @Input() itemsList!: ColumnDefinition[];
  @Input() actions!: TableActions;
  @Input() allcontent!: any[] | any; 
  @Input() loading: boolean = true;
  @Input() multiCheck: boolean = true;
  @Input() viewMode: 'table' | 'cards' = 'table';
  @Input() expandedItemId: string | null = null;
  @Input() showDetailComponent: boolean = false;
  @Input() itemsPerPage: number;
  @Input() paginationInfo: PaginationInfo | null = null;
  @Input() serverSidePagination: boolean = false;
  @Input() paginationEnabled: boolean = true;
  @Input() maxHeight: string = '400px';

  @Output() showItemEmitter = new EventEmitter<any>();
  @Output() editItemEmitter = new EventEmitter<any>();
  @Output() closeItemEmitter = new EventEmitter<any>();
  @Output() checkItemEmitter = new EventEmitter<any>();
  @Output() processItemEmitter = new EventEmitter<any>();
  @Output() recordsEmitter = new EventEmitter<any>();
  @Output() notifyItemEmitter = new EventEmitter<any>();
  @Output() consultItemEmitter = new EventEmitter<any[]>();
  @Output() changeItemEmitter = new EventEmitter(); 
  @Output() validateItemEmitter = new EventEmitter<any>();
  @Output() toggleItemEmitter = new EventEmitter();
  @Output() selectedItemEmitter = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>(); 

  content: any[] = [];
  totalElements: number = 0;
  
  masterSelected: boolean = false;
  searchTerm: string = '';
  checkedValGet: any[] = [];
  tableSizes:number[]= [5,10,15,20];
  private expandedItems: Set<string> = new Set();

  constructor(public service: PaginationService) {
    this.itemsPerPage = this.service.pageSize;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allcontent'] || changes['serverSidePagination'] || changes['paginationEnabled']) {
      if (this.paginationEnabled) {
        if (this.serverSidePagination) {
          this.handleServerSidePagination();
        } else {
          this.handleClientSidePagination();
        }
      } else {
        this.handleNoPagination();
      }
    }
  }
  private handleNoPagination(): void {
    if (Array.isArray(this.allcontent)) {
      this.content = this.allcontent;
      this.totalElements = this.allcontent.length;
    } else if (this.allcontent && this.allcontent.content && Array.isArray(this.allcontent.content)) {
      this.content = this.allcontent.content;
      this.totalElements = this.allcontent.totalElements || 0;
    } else {
      this.content = [];
      this.totalElements = 0;
    }
  }

  //#region Action Handle
  showItem(item: any): void { this.showItemEmitter.emit(item); }
  editItem(item: any): void { this.editItemEmitter.emit(item); }
  closeItem(item: any): void { this.closeItemEmitter.emit(item); }
  checkItem(item: any) {this.checkItemEmitter.emit(item);}
  processItem(item: any) {this.processItemEmitter.emit(item);}
  recordsItem(item: any): void { this.recordsEmitter.emit(item); }
  notifyItem(item: any): void { this.notifyItemEmitter.emit(item); }
  validateItem(item: any) {this.validateItemEmitter.emit(item);}
  consultItem(item: any) {this.consultItemEmitter.emit(item);}
  changeItem(item: any) { this.changeItemEmitter.emit(item); }
  toggleItem(item: any) { this.toggleItemEmitter.emit(item); }
  sentMessage(item: any) {
    // https://api.whatsapp.com/send?phone=+59172248669&text=MENSAJE DESDE SISTEMA DE SIREVQUI"
  }


  showActions(data: any): { tooltip: string; icon: string; handler: (data: any) => void; buttonClass: string ; text?: string; }[] {
    let toggleText: [string, string] | null = null;
    if (this.actions.toggle) {
      if (Array.isArray(this.actions.toggle)) {toggleText = this.actions.toggle;} 
    }
    return [
       ...(this.actions.toggle ? [{ 
        tooltip: this.expandedItemId === data.uuid ? (toggleText ? toggleText[1] : 'Colapsar') : (toggleText ? toggleText[0] : 'Ver Detalle'), 
        icon: this.expandedItemId === data.uuid ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line', 
        handler: () => this.toggleItem(data), 
        buttonClass: this.expandedItemId === data.uuid ? 'btn btn-danger btn-sm' : 'btn btn-primary btn-sm',
        text: toggleText ? (this.expandedItemId === data.uuid ? toggleText[1] : toggleText[0]) : ''
      }] : []),
      ...(this.actions.show ? [{ tooltip: 'Ver', icon: 'ri-eye-fill', handler: () => this.showItem(data), buttonClass: '' }] : []),
      ...(this.actions.records ? [{ tooltip: 'Ticket', icon: 'ri-file-list-3-line', handler: () => this.recordsItem(data), buttonClass: '' }] : []),
      ...((this.actions.check && this.canShow(this.actions.check,data,)) ? [{ tooltip: this.actions.check, icon: 'ri-checkbox-circle-line', handler: () => this.checkItem(data), buttonClass: 'text-success' }] : []),
      ...(this.actions.process ? [{ tooltip: this.actions.process, icon: ' ri-auction-line', handler: () => this.processItem(data), buttonClass: 'text-warning' }] : []),
      ...(this.actions.consult ? [{ tooltip: 'Consultar', icon: 'ri-restart-fill', handler: () => this.consultItem(data), buttonClass: 'text-primary d-inline-block edit-item-btn' }] : []),
      ...(this.actions.validate && this.canShow('validate',data)? [{ tooltip: 'Validar', icon: ' ri-toggle-fill', handler: () => this.validateItem(data), buttonClass: 'text-primary d-inline-block edit-item-btn' }] : []),
      ...(this.actions.edit && this.canShow('Editar',data)? [{ tooltip: 'Editar', icon: 'ri-pencil-fill', handler: () => this.editItem(data), buttonClass: 'text-primary edit-item-btn' }] : []),
        ...(this.actions.notify ? [{ tooltip: 'Notificar', icon: 'ri-mail-send-fill', handler: () => this.notifyItem(data), buttonClass: 'text-success' }] : []),
      ...(this.actions.telf ? [{ tooltip: 'Telefono', icon: 'ri-phone-line', handler: () => this.sentMessage(data), buttonClass: 'text-success' }] : []),
    ...((this.actions.close && this.canShow(this.actions.close,data,)) ? [{ tooltip: this.actions.close, icon: 'ri-close-circle-line', handler: () => this.closeItem(data), buttonClass: 'text-danger remove-item-btn' }] : []),
    ];  
  }

  canShow(action:string,data: any): boolean {
    switch(action){
      case 'Editar':
        return data.reservaDto ? data.reservaDto.estadoReserva ===statusData.EstadoReserva.PENDIENTE : true
      case 'validate':
        return data.reservaDto && data.reservaDto.estadoValidacion ===statusData.EstadoValidacion.PENDIENTE;
      case 'Anular':
        return data.reservaDto && (data.reservaDto.estadoReserva ===statusData.EstadoReserva.PENDIENTE || data.reservaDto.estadoReserva ===statusData.EstadoReserva.EN_CURSO);
      case 'Bloquear':
        return data.estadoUsuario === statusData.EstadoUsuario.ACTIVO;
      case 'Desbloquear':
        return data.estadoUsuario === statusData.EstadoUsuario.BLOQUEADO;
      default:
        return true;
    }
  }
  //#endregion

  //#region Value handle
  @Memoize()
  getPropertyValue(obj: any, prop: string): any {
    if (!prop) return '';
    if (prop.includes('[') && prop.includes(']')) {
      return this.resolveArrayProperty(obj, prop);
    }
    const value = prop.split('.').reduce((o, p) => o?.[p], obj);
    switch (prop) {
      case 'requiereAprobacion': case 'accesoLibre':case 'tieneIluminacion':
      case 'puedeReservarGratis': case 'esDeportistaElite': case 'perteneceEscuelaMunicipal': case 'estaSancionado':
        return this.formatBoolean(value, 'SI', 'NO');
      case 'esValido':
        return this.formatBoolean(value, 'VALIDO', 'INVALIDO');
      case 'activo':
        return this.formatBoolean(value, 'ACTIVO', 'INACTIVO');
      case 'obligatorio':
        return this.formatBoolean(value, 'OBLIGATORIO', 'OPCIONAL');
      case 'resultado':
        return this.formatBoolean(value, 'APROBADO', 'REPROBADO');
      case 'esDenuncia':
        return this.formatBoolean(value, 'DENUNCIA', 'OBSERVACIÓN');
      case 'expedido':
        return CityAcronym.find(c => c.id === value)?.value || value;
      case 'tipoDocumento':
        return userData.UserDocType.find(c => c.type === value)?.description || value;
      case 'genero':
        return userData.UserGender.find(c => c.id === value)?.description || value;
      case 'estadoCivil':
        return userData.UserCivilStatus.find(c => c.type === value)?.description || value;
      case 'x': {
        const dimensions = [obj.ancho, obj.largo, obj.profundidad, obj.alto, obj.nroFilas, obj.nroColumnas]
          .filter(v => v != null)
          .map(v => `${v}<strong>X</strong>`);
        return dimensions.length > 0
          ? dimensions.join(' ').replace(/<strong>X<\/strong>$/, '')
          : '';
      }
      default:
        return value === 0 ? '0' : value;
    }
  }
  private resolveArrayProperty(obj: any, prop: string): any {
    try {
      const match = prop.match(/([^\[]+)\[(\d+)\](\..+)?/);
      if (!match) return '';
      const [, arrayProp, indexStr, rest] = match;
      const array = arrayProp.split('.').reduce((o, p) => o?.[p], obj);
      const index = Number(indexStr);
      const value = array?.[index];
      return rest ? rest.slice(1).split('.').reduce((o, p) => o?.[p], value) : value;
    } catch (e) {
      console.warn(`Error resolving property ${prop}`, e);
      return '';
    }
  }
  private formatBoolean(val: any, trueText: string, falseText: string): string {
    return val === true ? trueText : val === false ? falseText : '';
  }

  getBadgeStatus(value: any): string {
    const statuses: Record<string, string> = {
      'ENVIADA': 'success', 'ENTREGADA': 'success',
      'PROGRAMADA': 'primary', 'NO_ENTREGADO': 'danger',
      'VALIDO': 'success','INVALIDO': 'danger', 
      'SI': 'success', 'NO': 'danger',
      // Estados de Reserva
      'BORRADOR': 'secondary', 'EXPIRADA': 'warning', 
      'PENDIENTE': 'warning', 'CONFIRMADA': 'primary',
      'PAGADA': 'success', 'COMPLETADA': 'success',
      'CANCELADA': 'danger', 'RECHAZADA': 'danger',
      'EN_CURSO': 'info', 'NO_SHOW': 'danger',
      // Estados de Validación
      'NO_REQUIERE': 'secondary',// 'PENDIENTE': 'warning',
      'APROBADA': 'success', // 'RECHAZADA': 'danger',
      'REVISION': 'info',
      // Estados de Pago
      'PAGADO': 'success', // 'PENDIENTE': 'warning',
      'PARCIAL': 'info', 'VERIFICANDO': 'primary',
      'REEMBOLSADO': 'secondary','VENCIDO': 'danger',
      // Estados de Usuario
      'ACTIVO': 'success', 'INACTIVO': 'secondary',
      'PENDIENTE_VERIFICACION': 'warning',
      'SANCIONADO': 'danger', 'BLOQUEADO': 'danger',
    };
    
    return statuses[value] || 'info';
  }
  getColumnCount(): number {
    let count = this.itemsList.filter(col => col.visible).length;
    if (this.multiCheck) count++;
    if (this.actions) count++;
    return count;
  }
  //#endregion

  //#region On selection
  checkUncheckAll(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.masterSelected = target.checked;    
    if (this.masterSelected) {
        this.content.forEach(item => {
            const exists = this.checkedValGet.some(selected => 
                (selected.uuid && item.uuid && selected.uuid === item.uuid) ||
                selected === item
            );
            if (!exists) {
                this.checkedValGet.push(item);
            }
        });
    } else {
        this.checkedValGet = this.checkedValGet.filter(selected => 
            !this.content.some(item => 
                (selected.uuid && item.uuid && selected.uuid === item.uuid) ||
                selected === item
            )
        );
    }  
    this.updateSelectionState();
  }
  
  private updateSelectionState(): void {
    this.updateMasterCheckbox();
    this.selectedItemEmitter.emit(this.checkedValGet);  
    const removeActions = document.getElementById("remove-actions");
    if (removeActions) {
        removeActions.style.display = this.checkedValGet.length > 0 ? "block" : "none";
    }
  }
  
  onCheckboxChange(e: Event, item: any): void {
    const target = e.target as HTMLInputElement;
    target.checked
      ? this.checkedValGet.push(item)
      : this.checkedValGet = this.checkedValGet.filter(i => i !== item);
    this.updateSelectionState();
  }
  //#endregion

   //#region Sort & Pagination
  currentSortColumn: string = '';
  isSortAscending: boolean = true;

  onSort(column: string): void {
    if (this.serverSidePagination && this.paginationEnabled) {
      console.warn('Sorting should be handled server-side when using server-side pagination');
      return;
    }
    if (this.currentSortColumn === column) {
      this.isSortAscending = !this.isSortAscending;
    } else {
      this.currentSortColumn = column;
      this.isSortAscending = true;
    }
    
    if (this.paginationEnabled && !this.serverSidePagination) {
      this.allcontent = this.service.onSort(column, [...this.allcontent], this.isSortAscending);
      this.service.page = 1;
      this.changePage();
    } else {
      // Sort directly when no pagination
      this.content = this.service.onSort(column, [...this.content], this.isSortAscending);
    }
  }
  
  getSortDirection(column: string): string {
    if (this.serverSidePagination && this.paginationEnabled) return 'none';
    if (this.currentSortColumn !== column) return 'none';
    return this.isSortAscending ? 'ascending' : 'descending';
  }
  
  private handleClientSidePagination(): void {
    if (Array.isArray(this.allcontent)) {
      this.content = this.service.changePage(this.allcontent, this.itemsPerPage);
      this.totalElements = this.allcontent.length;
    } else {
      this.content = [];
      this.totalElements = 0;
    }
  }
  
  private handleServerSidePagination(): void {
    if (this.allcontent && this.allcontent.content && Array.isArray(this.allcontent.content)) {
        this.content = this.allcontent.content;
        this.totalElements = this.allcontent.totalElements || 0;
        const pageNumber = this.allcontent.number ?? this.allcontent.pageable?.pageNumber ?? 0;
        const pageSize = this.allcontent.size ?? this.allcontent.pageable?.pageSize ?? this.itemsPerPage;
        this.service.page = pageNumber + 1;
        this.itemsPerPage = pageSize;
        this.service.pageSize = this.itemsPerPage;
    } else if (Array.isArray(this.allcontent)) {
        this.content = this.allcontent;
        this.totalElements = this.allcontent.length;
    } else {
        this.content = [];
        this.totalElements = 0;
    }
    this.updateMasterCheckbox();
  }
  
  private updateMasterCheckbox(): void {
    if (this.content.length === 0) {
        this.masterSelected = false;
        return;
    }
    const allCurrentPageSelected = this.content.every(item => 
        this.checkedValGet.some(selected => 
            (selected.uuid && item.uuid && selected.uuid === item.uuid) ||
            selected === item
        )
    );    
    this.masterSelected = allCurrentPageSelected && this.content.length > 0;
  }
  
  onTableSizeChange(event: Event): void {
    const size = +(event.target as HTMLSelectElement).value;
    this.itemsPerPage = size;
    this.service.pageSize = size;
    
    if (this.paginationEnabled && this.serverSidePagination) {
        this.pageSizeChange.emit(size);
    } else if (this.paginationEnabled) {
        this.service.page = 1;
        this.changePage();
    }
  }
  
  changePage(): void {
    if (this.paginationEnabled && this.serverSidePagination) {
        this.pageChange.emit(this.service.page);
    } else if (this.paginationEnabled) {
        this.content = this.service.changePage(this.allcontent, this.itemsPerPage);
        this.updateMasterCheckbox();
    }
  }
  
  onPageChange(page: number): void {
    if (this.paginationEnabled) {
      this.service.page = page;
      this.changePage();
    }
  }
  
  getTotalElements(): number {
    if (this.paginationEnabled && this.serverSidePagination) {
        return this.totalElements;
    }
    return Array.isArray(this.allcontent) ? this.allcontent.length : 0;
  }
  
  shouldShowPagination(): boolean {
    return this.paginationEnabled && this.getTotalElements() > 0;
  }
  
  getDisplayedItemsCount(): number {
    if (this.paginationEnabled) {
      return this.content.length;
    }
    return this.content ? this.content.length : 0;
  }
  //#endregion

  // UI helpers
  isMobileColumn(column: ColumnDefinition): boolean {
    return column.visible;
  }

  toggleExpand(data: any, prop: string): void {
    const key = `${data.uuid}_${prop}`;
    this.expandedItems.has(key) ? this.expandedItems.delete(key) : this.expandedItems.add(key);
  }

  isExpanded(data: any, prop: string): boolean {
    return this.expandedItems.has(`${data.uuid}_${prop}`);
  }

  toggleColumn(column: ColumnDefinition): void {
    column.visible = !column.visible;
  }
}