import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UntypedFormBuilder, Validators, UntypedFormGroup, UntypedFormArray, AbstractControl } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { addApplication, deleteApplication, fetchApplicationData, updateApplication } from 'src/app/store/Jobs/jobs_action';
import { selectJobsData, selectJobsLoading } from 'src/app/store/Jobs/jobs_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  applications: any;
  masterSelected!: boolean;
  // Form
  applicationData!: UntypedFormGroup;
  submitted = false;
  allapplications: any;
  searchTerm: any;
  searchResults: any;
  date: any;
  status: any = '';
  type: any = '';

  constructor(public service: PaginationService,
    public formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    public modalService: NgbModal) {
  }

  ngOnInit(): void {
    /**
* BreadCrumb
*/
    this.breadCrumbItems = [
      { label: 'Jobs' },
      { label: 'Application', active: true }
    ];

    // Validation
    this.applicationData = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      type: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    // Fetch Data
    this.store.dispatch(fetchApplicationData());
    this.store.select(selectJobsLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectJobsData).subscribe((data) => {
      this.applications = data;
      this.allapplications = cloneDeep(data);
      this.applications = this.service.changePage(this.allapplications)
    });
  }

   // Pagination
   changePage() {
    this.applications = this.service.changePage(this.allapplications)
  }

  // Filter
  statusFilter() {
    if (this.status != '') {
      this.applications = this.allapplications.filter((app: any) => {
        return app.status === this.status;
      });
    } else {
      this.applications = this.service.changePage(this.allapplications)
    }
  }

  typeFilter() {
    if (this.type != '') {
      this.applications = this.allapplications.filter((app: any) => {
        return app.type === this.type;
      });
    } else {
      this.applications = this.service.changePage(this.allapplications)
    }
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allapplications.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.applications = this.service.changePage(this.searchResults)
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 1) {
      this.applications = this.service.changePage(this.allapplications)
    }
    if (changeEvent.nextId === 2) {
      this.applications = this.allapplications.filter((app:any) => app.status == 'New');
    }
    if (changeEvent.nextId === 3) {
      this.applications = this.allapplications.filter((app:any) => app.status == 'Pending');
    }
    if (changeEvent.nextId === 4) {
      this.applications = this.allapplications.filter((app:any) => app.status == 'Approved');
    }
    if (changeEvent.nextId === 5) {
      this.applications = this.allapplications.filter((app:any) => app.status == 'Rejected');
    }
  }

  // Check Box Checked Value Get
  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.applications.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.applications.length; i++) {
      if (this.applications[i].state == true) {
        result = this.applications[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";

  }
  isAllChecked() {
    return this.applications.every((_: { state: any; }) => _.state);
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.applications.length; i++) {
      if (this.applications[i].state == true) {
        result = this.applications[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  // Open add Model
  openModel(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll('#companylogo-img').forEach((element: any) => {
        element.src = this.imageURL;
      });
    }
    reader.readAsDataURL(file)
  }

  /**
  * Open modal
  * @param content modal content
  */
  singleData: any;
  editorder(content: any, id: any) {
    this.singleData = this.applications[id];
    this.submitted = false;
    this.modalService.open(content, { size: ' md', centered: true })
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Application';
    var updatebtn = document.getElementById('add-btn') as HTMLAreaElement
    updatebtn.innerHTML = "Update";
    document.querySelectorAll('#companylogo-img').forEach((element: any) => {
      element.src = this.singleData.img;
    });
    this.applicationData.controls['id'].setValue(this.singleData.id);
    this.applicationData.controls['name'].setValue(this.singleData.name);
    this.applicationData.controls['designation'].setValue(this.singleData.designation);
    this.applicationData.controls['date'].setValue(this.singleData.date);
    this.applicationData.controls['contacts'].setValue(this.singleData.contacts);
    this.applicationData.controls['type'].setValue(this.singleData.type);
    this.applicationData.controls['status'].setValue(this.singleData.status);
  }

  /**
* Returns form
*/
  get form() {
    return this.applicationData.controls;
  }

  createapplication() {
    if (this.applicationData.valid) {
      if (this.applicationData.get('id')?.value) {
        const updatedData = { img: this.singleData.img, ...this.applicationData.value };
        this.store.dispatch(updateApplication({ updatedData }));
        this.modalService.dismissAll();
      } else {
        const name = this.applicationData.get('name')?.value;
        const designation = this.applicationData.get('designation')?.value;
        const contacts = this.applicationData.get('contacts')?.value;
        const img = "/assets/images/brands/slack.png";
        const date = '26 Sep, 2022';
        const status = this.applicationData.get('status')?.value;
        const type = this.applicationData.get('type')?.value;
        const newData = {
          id: this.applications.length + 1,
          img,
          name,
          designation,
          date,
          contacts,
          type,
          status
        };
        this.store.dispatch(addApplication({ newData }));
        this.modalService.dismissAll()
      }
    }
    this.modalService.dismissAll();
    setTimeout(() => {
      this.applicationData.reset();
    }, 2000);
    this.submitted = true
  }

  /**
   * Delete Model Open
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.store.dispatch(deleteApplication({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteApplication({ id: this.checkedValGet.toString() }));
    }
    this.masterSelected = false;
    this.deleteId = '';
    this.modalService.dismissAll('close click')
    let timerInterval: any;
    Swal.fire({
      title: 'Deleted!',
      text: 'Your data has been deleted.',
      icon: 'success',
      confirmButtonColor: '#299cdb',
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  }

  // Sort Data
  onSort(column: any) {
    this.applications = this.service.onSort(column, this.allapplications)
  }
}
