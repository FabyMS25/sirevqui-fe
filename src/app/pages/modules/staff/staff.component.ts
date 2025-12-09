import { Component, QueryList, ViewChildren, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';

// Date Format
import { DatePipe } from '@angular/common';
// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Sweet Alert
import Swal from 'sweetalert2';

import { AuthenticationService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/api-users/users.service';
import { UserRol } from 'src/app/core/constants/UserData';
import { StaffService } from 'src/app/core/services/api/staff.service';
import { Staff } from 'src/app/core/models/staff';
import { PeriodService } from 'src/app/core/services/api/period.service';
import { ModalStaffComponent } from '../../modals/staff/modalStaff.component';
import { ModalImportComponent } from 'src/app/shared/modal-import/modal-import.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})

export class StaffComponent implements OnInit {
  title = 'Funcionarios'
  breadCrumbItems!: Array<{}>;
  
  canActivate: string[];
  itemsList: any[] = [];
  temp: any[] = [];
  viewMode: 'table' | 'cards' = 'table';

  submitted = false;

  userRol = UserRol;
  userList: any;
  staffList: Staff[] = [];
  funcionarioSelected!: any;

  @ViewChild('viewModel') viewModel!: ElementRef;

  constructor(
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private usersService: UserService,
    private staffService: StaffService,
    private datePipe: DatePipe
    
  ) {
    this.canActivate = this.authService.hasPermission(this.title);
  }

  ngOnInit(): void {
    const savedViewMode = localStorage.getItem('dataTableViewMode');
    if (savedViewMode === 'table' || savedViewMode === 'cards') {
      this.viewMode = savedViewMode;
    }
    this.breadCrumbItems = [
      { label: 'Administración' },
      { label: this.title, active: true }
    ];
    this.itemsList = [
      { name: 'Nombre', prop: 'nombre', avatar: true, visible: true },
      { name: 'Complejo', prop: 'complejoDto.nombre', visible: true },
      { name: 'Telefono', prop: 'telefono', visible: true },
      { name: 'Activo', prop: 'activo', visible: true },
      { name: 'Fecha Asignación', prop: 'fechaAsignacion', visible: false },
      { name: 'Fecha Fin', prop: 'fechaFinAsignacion', visible: false },
      { name: 'Hora Entrada', prop: 'horaEntrada', visible: false },
      { name: 'Hora Salida', prop: 'horaSalida', visible: false },
    ];

    this.loadData();
  }
  
  loading: boolean = true;
  private async loadData() {
    await this.getUsers();
    await this.getEmployees();
  }

  selectedItems: any[] = [];
  getSelectedItems(items: any[]) {
    this.selectedItems = items;
  }
  
  // Search Data
  searchTerm: any;
  performSearch(): void {
    this.staffList = this.temp.filter((item: any) => {
      const searchTermLower = this.searchTerm.toLowerCase();
      return (
        item.nombre?.toLowerCase().includes(searchTermLower) ||
        item.telefono?.toLowerCase().includes(searchTermLower) ||
        (item.complejoDto?.nombre?.toLowerCase().includes(searchTermLower)) ||
        (item.activo !== undefined && (item.activo ? 'activo' : 'inactivo').includes(searchTermLower))
      );
    });
  }

  /**
   * View Data Get
   */
  viewDataGet(data: any) {
    this.funcionarioSelected = data;    
    const element = this.viewModel.nativeElement;
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const middleOffset = elementTop - (window.innerHeight / 2) + (element.offsetHeight / 2);    
    window.scrollTo({ top: middleOffset, behavior: 'smooth' });
  }  

  /**
   * Open modal
   */
  public openModal(row: any, accion: string, size: string) {
    const modalRef = this.modalService.open(ModalStaffComponent, {
      backdrop: 'static',
      size: size
    });
    modalRef.componentInstance.row = row;
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.usersList = this.userList;
    modalRef.componentInstance.itemsList.subscribe(() => {
      this.loadData();
    });
  }

  /**
   * Delete model
   */
  deleteId!: string;
  deleteModal(content: any, data: any) {
    this.deleteId = data.uuid;
    this.modalService.open(content, { centered: true });
  }

  headersImport = ['Nombre', 'Telefono', 'Complejo', 'Activo', 'Fecha Asignación', 'Fecha Fin', 'Hora Entrada', 'Hora Salida'];
  public openModalImport() {
    const camposImport = [
        {prop: 'uuidUsuario', name: 'uuidUsuario'},
        {prop: 'Nombre', name: 'Nombre'},
        {prop: 'Telefono', name: 'Telefono'},
        {prop: 'Hora Entrada', name: 'Hora Entrada'},
        {prop: 'Hora Salida', name: 'Hora Salida'},
        {prop: 'Complejo', name: 'Complejo'},
    ];
    const modalRef = this.modalService.open(ModalImportComponent, {
        size: 'lg',
        backdrop: 'static'
    });
    modalRef.componentInstance.titles = camposImport;
    modalRef.componentInstance.itemsList = this.staffList;
    modalRef.componentInstance.itemsList.subscribe(() => {
        this.getEmployees();
    });
  }
  // public openModalImport() {
  //   const modalRef = this.modalService.open(ModalImportComponent, {
  //     size: 'lg',
  //     backdrop: 'static'
  //   });
  //   modalRef.componentInstance.titles = this.headersImport.map(header => 
  //     ({ prop: header, name: header, visible: true }));
  //   modalRef.componentInstance.itemsList = this.temp;
  //   modalRef.componentInstance.lookupData = {
  //     complejosList: this.complejosList
  //   };
  //   modalRef.componentInstance.checkExistsFn = (registro: EncargadoComplejo) =>
  //     this.temp.some(item =>
  //       item.nombre === registro.nombre && 
  //       item.complejoDto?.uuid === registro.complejoDto?.uuid
  //     );
  //   modalRef.componentInstance.mapRowFn = (row: any, lookupData: any): EncargadoComplejo => {
  //     const complejoNombre = (row['Complejo'] || '').trim();
  //     const complejo = lookupData.complejosList.find(
  //       (c: any) => c.nombre?.trim() === complejoNombre
  //     );

  //     const missingFields = [];
  //     if (!complejo) missingFields.push('Complejo');
  //     if (missingFields.length > 0) {
  //       throw { missingFields };
  //     }

  //     return {
  //       nombre: '' + row['Nombre'],
  //       avatar:'multi-user.jpg',
  //       telefono: '' + row['Telefono'],
  //       activo: this.parseBoolean(row['Activo']),
  //       fechaAsignacion: row['Fecha Asignación'] ? new Date(row['Fecha Asignación']).toISOString() : new Date().toISOString(),
  //       fechaFinAsignacion: row['Fecha Fin'] ? new Date(row['Fecha Fin']).toISOString() : undefined,
  //       horaEntrada: row['Hora Entrada'] || '08:00:00',
  //       horaSalida: row['Hora Salida'] || '17:00:00',
  //       complejoDto: complejo
  //     };
  //   };
  //   modalRef.componentInstance.createRecordFn = (record: EncargadoComplejo) =>
  //     this.staffService.save(record).toPromise();
  //   modalRef.componentInstance.actionCompleted.subscribe(() => {
  //     this.getEmployees();
  //   });
  // }

  private parseBoolean(value: any): boolean {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' || value.toLowerCase() === 'si' || 
             value.toLowerCase() === 'sí' || value === '1' || value.toLowerCase() === 'activo';
    }
    return true; // Default to active
  }

  // Csv File Export
  csvFileExport() {
    const lista = this.selectedItems.flatMap((item: Staff) => {
      const data = {
        nombreCompleto: item.nombreCompleto,
        activo: item.activo ? 'Activo' : 'Inactivo',
        // fechaAsignacion: this.formatDate(item.fechaAsignacion),
        // fechaFinAsignacion: this.formatDate(item.fechaFinAsignacion),
        unidad: item.unidad,
        uuidUsuario: item.uuidUsuario
      };    
      return [{ ...data }];      
    });
    
    var xlsxData = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Lista de ' + this.title,
      useBom: true,
      noDownload: false,
      headers: ["Nombre", "Telefono", "Activo", "Fecha Asignación", "Fecha Fin", 
                "Hora Entrada", "Hora Salida", "Complejo", "User UUID"]
    };
    new ngxCsv(lista, "Lista de " + this.title, xlsxData);
  }

  formatDate(date: any): string {
    if (!date) return '';
    const dateObj = new Date(date);
    return this.datePipe.transform(dateObj, 'yyyy-MM-dd') || '';
  }

  /* API Services */
  private getUsers() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.userList = data;
    });
  }


  private getEmployees(): void {
    this.loading = true;
    this.staffService.getAll().subscribe({
      next: (data: any) => {
        this.loading = false;
        if (data.status === 'OK') {
          this.staffList = data.payload
          this.temp = this.staffList;
          if (this.staffList.length > 0) {
            this.funcionarioSelected = this.staffList[0];
          }
        } 
      },
      error: () => {
        this.loading = false;
        this.notify('No se pudo recuperar los registros', 'error');
      }
    });
  }

  // Delete Data
  deleteData() {
    let uuid = this.deleteId;
    this.staffService.delete(uuid).subscribe({
      next: (data: any) => {
        this.submitted = false;
        if (data.status == 'OK') {
          this.loadData();
          this.notify(data.payload, 'success');
          this.modalService.dismissAll();
        }
      },
      error: err => {
        this.submitted = false;
        this.notify('No se pudo eliminar el registro!', 'error');
      }
    });
  }
   
  private notify(message: string, type: any): void {
    Swal.fire({
      title: message,
      icon: type,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}