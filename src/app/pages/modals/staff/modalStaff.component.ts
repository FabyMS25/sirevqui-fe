import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, Input, LOCALE_ID, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FlatpickrModule } from 'angularx-flatpickr';
import Swal from 'sweetalert2';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserService } from 'src/app/core/services/api-users/users.service';
import { UserRol } from 'src/app/core/constants/UserData';
import { Staff } from 'src/app/core/models/staff';
import { StaffService } from 'src/app/core/services/api/staff.service';
import { PeriodService } from 'src/app/core/services/api/period.service';

@Component({
  selector: 'app-modalStaff',
  standalone:true,  
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbDatepickerModule,
      FlatpickrModule,
      SharedModule,
      TranslateModule    
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './modalStaff.component.html',
  styleUrl: './modalStaff.component.scss'
})
export class ModalStaffComponent {
  @Input() accion!: string;
  @Input() row!: Staff;
  @Output() itemsList = new EventEmitter();
// periodsList
  contentForm!: UntypedFormGroup;
  submitted = false;
  canchasList!: any[];
  usersList!: any[];
  user: any;

  avatarOptions = [
    {
      value: 'avatar-admin-m.png',
      label: 'Administrador Masculino',
      category: 'admin',
      gender: 'M'
    },
    {
      value: 'avatar-admin-w.png',
      label: 'Administradora Femenino',
      category: 'admin',
      gender: 'F'
    },
    {
      value: 'avatar-op-m.png',
      label: 'Operador Masculino',
      category: 'operator',
      gender: 'M'
    },
    {
      value: 'avatar-op-w.png',
      label: 'Operadora Femenino',
      category: 'operator',
      gender: 'F'
    },
    {
      value: 'avatar-super-m.png',
      label: 'Supervisor Masculino',
      category: 'supervisor',
      gender: 'M'
    },
    {
      value: 'avatar-super-w.png',
      label: 'Supervisora Femenino',
      category: 'supervisor',
      gender: 'F'
    },
    {
      value: 'default-profile1.png',
      label: 'Perfil Predeterminado 1',
      category: 'default',
      gender: 'U'
    },
    {
      value: 'multi-user.jpg',
      label: 'Usuario Múltiple',
      category: 'default',
      gender: 'U'
    },
    {
      value: 'user-dummy-img.jpg',
      label: 'Usuario Genérico',
      category: 'default',
      gender: 'U'
    }
  ];

  showAvatarSelection = false;
  selectedAvatar = 'multi-user.jpg';

  constructor(
    private modalService: NgbModal,
    private usuariosService: UserService,
    private staffService: StaffService,
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contentForm = this.formBuilder.group({
      uuid: [''],
      avatar: ['multi-user.jpg', [Validators.required]],
      uuidUsuario: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      telefono: ['', [Validators.pattern('^\\+?[0-9]{7,15}$'), Validators.minLength(7), Validators.maxLength(15)]],
      activo: [true],
      fechaAsignacion: [new Date(), [Validators.required]],
      fechaFinAsignacion: [''],
      horaEntrada: ['', [Validators.required]],
      horaSalida: ['', [Validators.required]],
      complejoDto: new FormControl(null, [Validators.required]),
    });
    this.contentForm.setValidators(this.timeRangeValidator);
    this.formDataSet();
  }
  private timeRangeValidator = (control: AbstractControl): { [key: string]: any } | null => {
    if (!(control instanceof UntypedFormGroup)) {
      return null;
    }
    
    const horaEntrada = control.get('horaEntrada')?.value;
    const horaSalida = control.get('horaSalida')?.value;
    
    if (horaEntrada && horaSalida && horaEntrada >= horaSalida) {
      return { invalidTimeRange: true };
    }
    return null;
  }

  /**
   * Form data get
   */
  get form() {
    return this.contentForm.controls;
  }

  private formDataSet() {
    if (this.accion !== '' && this.row) {
      // const fechaAsignacion = this.row.fechaAsignacion ? 
      //   this.formatDateForInput(this.row.fechaAsignacion) : '';
      // const fechaFinAsignacion = this.row.fechaFinAsignacion ? 
      //   this.formatDateForInput(this.row.fechaFinAsignacion) : '';
      this.selectedAvatar = this.row.avatar || 'multi-user.jpg';
      this.contentForm.patchValue({
        uuid: this.row.uuid,
        avatar: this.selectedAvatar,
        uuidUsuario: this.row.uuidUsuario,
        activo: this.row.activo !== undefined ? this.row.activo : true,
        // fechaAsignacion: fechaAsignacion,
        // fechaFinAsignacion: fechaFinAsignacion,
      });
    }
  }

  private formatDateForInput(date: Date | string): string {
    if (!date) return '';    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  }

  onUserSelectHandler(event: any) {
    const selectedUuid = event.target.value;
    const selectedUser = this.usersList.find(user => user.uuid === selectedUuid);
    if (selectedUser) {
      this.user = selectedUser;
      const suggestedAvatar = this.getSuggestedAvatar(selectedUser);
      const fullName = selectedUser.designacionFuncionarioDto?.personaDto?.fullName || 
                      selectedUser.username || '';
      this.selectedAvatar = suggestedAvatar;
      this.contentForm.patchValue({
        nombre: fullName,
        avatar: suggestedAvatar
      });
    }
  }

  private getSuggestedAvatar(user: any): string {
    const type = user.permisoDtos?.find((menu: any) => 
      menu.modulo === 'DEPORTESAPP' && menu.nombreMenu === 'Administracion') ? 0 : 1;    
    const foundItem = UserRol.find(item => item.tipo === type);
    if (foundItem) {
      const gender = user.designacionFuncionarioDto?.personaDto?.sexo;
      return gender === 'F' ? foundItem.avatarF : foundItem.avatarM;
    }
    
    return 'multi-user.jpg';
  }

  toggleAvatarSelection() {
    this.showAvatarSelection = !this.showAvatarSelection;
  }
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
    this.contentForm.patchValue({ avatar: avatar });
    this.showAvatarSelection = false;
  }
  getAvatarsByCategory(category: string) {
    return this.avatarOptions.filter(option => option.category === category);
  }

  getCurrentAvatarInfo() {
    return this.avatarOptions.find(option => option.value === this.selectedAvatar) || 
           { value: this.selectedAvatar, label: 'Avatar personalizado', category: 'custom' };
  }

  /* API Service functions */
  private getUsers() {
    this.usuariosService.getAllUsers().subscribe({
      next: (data: any) => {
        this.usersList = data.sort((a: any, b: any) => {
          const nameA = a.designacionFuncionarioDto?.personaDto?.fullName || a.username || '';
          const nameB = b.designacionFuncionarioDto?.personaDto?.fullName || b.username || '';
          return nameA.localeCompare(nameB);
        });
      },
      error: (error) => {
        this.notify('Error al cargar los usuarios', 'error');
      }
    });
  }

  /**
   * Save user with enhanced validation
   */
  saveData() {
    this.submitted = true;
    
    if (this.contentForm.valid) {
      this.contentForm.enable();
      if (this.contentForm.errors?.['invalidTimeRange']) {
        this.notify('La hora de entrada debe ser menor que la hora de salida', 'error');
        return;
      }
      const fechaAsignacion = this.contentForm.value.fechaAsignacion ?
        new Date(this.contentForm.value.fechaAsignacion).toISOString() : undefined;
      
      const fechaFinAsignacion = this.contentForm.value.fechaFinAsignacion ?
        new Date(this.contentForm.value.fechaFinAsignacion).toISOString() : undefined;

      let datos: Staff = {
        uuidUsuario: this.contentForm.value.uuidUsuario,
        avatar: this.selectedAvatar,
        nombreCompleto: this.contentForm.value.nombreCompleto.trim(),
        numeroDocumento: this.contentForm.value.numeroDocumento,
        tipoDocumento: this.contentForm.value.tipoDocumento,
        expedido: this.contentForm.value.expedido,
        unidad: this.contentForm.value.unidad,
        cargo: this.contentForm.value.cargo,
        activo: this.contentForm.value.activo,
        // fechaAsignacion: fechaAsignacion,
        // fechaFinAsignacion: fechaFinAsignacion,
      };

      if (this.contentForm.get('uuid')?.value) {
        datos.uuid = this.contentForm.value.uuid;
        this.updateData(datos);
      } else {
        this.addData(datos);
      }
    } else {
      this.notify('Por favor, complete todos los campos requeridos correctamente', 'error');
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contentForm.controls).forEach(key => {
      this.contentForm.get(key)?.markAsTouched();
    });
  }

  /* API Requests*/
  private addData(datos: Staff) {
    this.staffService.save(datos).subscribe({
      next: (data: Staff) => {
        this.submitted = false;
        this.notify('Encargado registrado exitosamente', 'success');
        this.closeModal();
        this.itemsList.emit();
      },
      error: (error) => {
        this.submitted = false;
        const errorMessage = error?.error?.message || error.message || 'Error desconocido';
        this.notify(`Error al registrar el encargado: ${errorMessage}`, 'error');
      }
    });
  }

  private updateData(datos: Staff) {
    this.staffService.update(datos).subscribe({
      next: (data: Staff) => {
        this.submitted = false;
        this.notify('Encargado actualizado exitosamente', 'success');
        this.closeModal();
        this.itemsList.emit();
      },
      error: (error) => {
        this.submitted = false;
        const errorMessage = error?.error?.message || error.message || 'Error desconocido';
        this.notify(`Error al actualizar el encargado: ${errorMessage}`, 'error');
      }
    });
  }
  deleteData(uuid:string) {
    this.staffService.delete(uuid).subscribe({
      next: (data: any) => {
        this.submitted = false;
        if (data.status == 'OK') {
          this.getUsers();
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

  public closeModal() {
    this.accion = '';
    this.submitted = false;
    this.showAvatarSelection = false;
    this.contentForm.enable();
    this.contentForm.reset();
    this.selectedAvatar = 'multi-user.jpg';
    this.modalService.dismissAll();
  }

  private notify(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    const config = {
      success: { icon: 'success' as const, timer: 3000 },
      error: { icon: 'error' as const, timer: 5000 },
      warning: { icon: 'warning' as const, timer: 4000 },
      info: { icon: 'info' as const, timer: 3000 }
    };
    Swal.fire({
      title: message,
      icon: config[type].icon,
      timer: config[type].timer,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  }
  compareComplejo(c1: any, c2: any): boolean {
    if (!c1 || !c2) {
      return c1 === c2;
    }
    if (c1.uuid && c2.uuid) {
      return c1.uuid === c2.uuid;
    }
    return c1.nombre === c2.nombre;
  }
  
  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    return phoneRegex.test(phone);
  }

  formatPhoneNumber(phone: string): string {
    if (!phone) return '';
    const cleaned = phone.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+591')) {
      const number = cleaned.substring(4);
      if (number.length === 8) {
        return `+591 ${number.substring(0, 4)} ${number.substring(4)}`;
      }
    }
    
    return cleaned;
  }
}