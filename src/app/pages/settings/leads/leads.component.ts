import { Component, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Date Format
import { DatePipe } from '@angular/common';

import { restApiService } from "../../../core/services/rest-api.service";

// Sweet Alert
import Swal from 'sweetalert2';

import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { addLead, deleteLead, fetchCrmLeadData, updateLead } from 'src/app/store/CRM/crm_action';
import { selectCRMLoading, selectLeadData } from 'src/app/store/CRM/crm_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
/**
 * Leads Component
 */
export class LeadsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  leadsForm!: UntypedFormGroup;
  CustomersData!: any;
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  leads?: any;
  econtent?: any;

  closeResult: any;
  allleads: any;
  searchResults: any;
  searchTerm: any;

  constructor(private modalService: NgbModal,
    public service: PaginationService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>,
    private offcanvasService: NgbOffcanvas,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'CRM' },
      { label: 'Leads', active: true }
    ];

    /**
     * Form Validation
     */
    this.leadsForm = this.formBuilder.group({
      image_src: ['avatar-8.jpg'],
      _id: [''],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      score: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      location: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
    this.store.dispatch(fetchCrmLeadData());
    this.store.select(selectCRMLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectLeadData).subscribe((data) => {
      this.leads = data;
      this.allleads = cloneDeep(data);
      this.leads = this.service.changePage(this.allleads)
    });

  }



  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.leadsForm.controls;
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')
    this.leadsForm.patchValue({
      // image_src: file.name
      image_src: 'avatar-8.jpg'
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('lead-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.leadsForm.valid) {
      if (this.leadsForm.get('_id')?.value) {
        const updatedData = this.leadsForm.value;
        this.store.dispatch(updateLead({ updatedData }));
        this.modalService.dismissAll();
      }
      else {
        const contactId = (this.allleads.length + 1).toString();
        this.leadsForm.controls['_id'].setValue(contactId);
        const newData = this.leadsForm.value;
        this.store.dispatch(addLead({ newData }));
        let timerInterval: any;
        Swal.fire({
          title: 'Leads inserted successfully!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
      }
    }
    this.modalService.dismissAll();
    this.leadsForm.reset();
    this.submitted = true
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Lead';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.econtent = this.allleads[id];
    var img_data = document.getElementById('lead-img') as HTMLImageElement;
    img_data.src = 'assets/images/users/' + this.econtent.image_src
    this.leadsForm.controls['name'].setValue(this.econtent.name);
    this.leadsForm.controls['company'].setValue(this.econtent.company);
    this.leadsForm.controls['score'].setValue(this.econtent.score);
    this.leadsForm.controls['phone'].setValue(this.econtent.phone);
    this.leadsForm.controls['location'].setValue(this.econtent.location);
    this.leadsForm.controls['tags'].setValue(this.econtent.tags);
    this.leadsForm.controls['date'].setValue(this.econtent.date);
    this.leadsForm.controls['_id'].setValue(this.econtent._id);
    this.leadsForm.controls['image_src'].setValue(this.econtent.image_src);
  }
  /**
   * Delete model
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.store.dispatch(deleteLead({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteLead({ id: this.checkedValGet.toString() }));
    }
    this.deleteId = '';
    this.masterSelected = false;
  }

  /**
   * Multiple Delete
   */
  checkedValGet: any[] = [];
  deleteMultiple(content: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var result
    var checkedVal: any[] = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    if (checkedVal.length > 0) {
      this.modalService.open(content, { centered: true });
    }
    else {
      Swal.fire({ text: 'Please select at least one checkbox', confirmButtonColor: '#299cdb', });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.leads.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.leads.length; i++) {
      if (this.leads[i].state == true) {
        result = this.leads[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";

  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.leads.length; i++) {
      if (this.leads[i].state == true) {
        result = this.leads[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Lead', 'Partner', 'Exiting', 'Long-term'];

  //  Filter Offcanvas Set
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  // Filtering
  isstatus?: any
  SearchData() {
    var date = document.getElementById("isDate") as HTMLInputElement;
    var dateVal = date.value ? this.datePipe.transform(new Date(date.value), "yyyy-MM-dd") : '';

    if (dateVal != '') {
      this.leads = this.content.filter((order: any) => {
        return this.datePipe.transform(new Date(order.date), "yyyy-MM-dd") == dateVal;
      });
    }
    else {
      this.leads = this.content;
    }
  }

  changePage() {
    this.leads = this.service.changePage(this.allleads)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allleads.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.leads = this.service.changePage(this.searchResults)
  }

  onSort(column: any) {
    this.leads = this.service.onSort(column, this.leads)
  }


}
