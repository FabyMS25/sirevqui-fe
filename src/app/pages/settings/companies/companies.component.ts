import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';

// Sweet Alert
import Swal from 'sweetalert2';

import { addCompany, deleteCompany, fetchCrmCompanyData, updateCompany } from 'src/app/store/CRM/crm_action';
import { selectCRMLoading, selectCompanyData } from 'src/app/store/CRM/crm_selector';
import { cloneDeep } from 'lodash';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { PaginationService } from 'src/app/core/services/pagination.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})

/**
 * Companies Component
 */
export class CompaniesComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  companiesForm!: UntypedFormGroup;
  CustomersData!: any;
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  company?: any;
  econtent?: any;
  allcompany: any;
  searchResults: any;
  searchTerm: any;

  constructor(private modalService: NgbModal, public service: PaginationService, private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'CRM' },
      { label: 'Companies', active: true }
    ];

    /**
     * Form Validation
     */
    this.companiesForm = this.formBuilder.group({
      _id: [''],
      image_src: ['brands/dribbble.png'],
      name: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      industry_type: ['', [Validators.required]],
      star_value: ['', [Validators.required]],
      location: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      website: ['', [Validators.required]],
      contact_email: ['', [Validators.required]],
      since: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
    this.store.dispatch(fetchCrmCompanyData());
    this.store.select(selectCRMLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectCompanyData).subscribe((data) => {
      this.company = data;
      this.allcompany = cloneDeep(data);
      this.company = this.service.changePage(this.allcompany)
    });
  }

  changePage() {
    this.company = this.service.changePage(this.allcompany)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allcompany.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.company = this.service.changePage(this.searchResults)
  }

  onSort(column: any) {
    this.company = this.service.onSort(column, this.company)
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.companiesForm.controls;
  }

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')
    this.companiesForm.patchValue({
      // image_src: file.name
      image_src: 'brands/dribbble.png'
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('companylogo-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.companiesForm.valid) {
      if (this.companiesForm.get('_id')?.value) {

        const updatedData = this.companiesForm.value;
        this.store.dispatch(updateCompany({ updatedData }));
        this.modalService.dismissAll();
      }
      else {
        const contactId = (this.allcompany.length + 1).toString();
        this.companiesForm.controls['_id'].setValue(contactId);
        const newData = this.companiesForm.value;
        this.store.dispatch(addCompany({ newData }));
        let timerInterval: any;
        Swal.fire({
          title: 'Company inserted successfully!',
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
    this.companiesForm.reset();
    this.submitted = true
  }

  /**
   * View Data Get
   * @param content modal content
   */
  viewDataGet(id: any) {
    this.econtent = this.allcompany[id];
    var img_data = document.querySelector('.company-details img') as HTMLImageElement;
    img_data.src = 'assets/images/' + this.econtent.image_src;
    (document.querySelector('.company-details h5') as HTMLImageElement).innerHTML = this.econtent.name;
    (document.querySelector('.company-details p') as HTMLImageElement).innerHTML = this.econtent.owner;
    (document.querySelector('.industry_type') as HTMLImageElement).innerHTML = this.econtent.industry_type;
    (document.querySelector('.location') as HTMLImageElement).innerHTML = this.econtent.location;
    (document.querySelector('.employee') as HTMLImageElement).innerHTML = this.econtent.employee;
    (document.querySelector('.rating') as HTMLImageElement).innerHTML = this.econtent.star_value;
    (document.querySelector('.website') as HTMLImageElement).innerHTML = this.econtent.website;
    (document.querySelector('.email') as HTMLImageElement).innerHTML = this.econtent.contact_email;
    (document.querySelector('.since') as HTMLImageElement).innerHTML = this.econtent.since;
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'lg', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    // modelTitle.innerHTML = 'Edit Company';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.econtent = this.allcompany[id];
    var img_data = document.getElementById('companylogo-img') as HTMLImageElement;
    img_data.src = 'assets/images/' + this.econtent.image_src

    this.companiesForm.controls['name'].setValue(this.econtent.name);
    this.companiesForm.controls['owner'].setValue(this.econtent.owner);
    this.companiesForm.controls['industry_type'].setValue(this.econtent.industry_type);
    this.companiesForm.controls['star_value'].setValue(this.econtent.star_value);
    this.companiesForm.controls['location'].setValue(this.econtent.location);
    this.companiesForm.controls['employee'].setValue(this.econtent.employee);
    this.companiesForm.controls['website'].setValue(this.econtent.website);
    this.companiesForm.controls['contact_email'].setValue(this.econtent.contact_email);
    this.companiesForm.controls['since'].setValue(this.econtent.since);
    this.companiesForm.controls['_id'].setValue(this.econtent._id);

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
      this.store.dispatch(deleteCompany({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteCompany({ id: this.checkedValGet.toString() }));
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
    this.company.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.company.length; i++) {
      if (this.company[i].state == true) {
        result = this.company[i];
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
    for (var i = 0; i < this.company.length; i++) {
      if (this.company[i].state == true) {
        result = this.company[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  // Csv File Export
  csvFileExport() {
    var orders = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Company Data',
      useBom: true,
      noDownload: false,
      headers: ["Id", "Name", "Owner", "Industry Type", "Star Value", "Location", "Employee", "Website", "Contact Email", "Since", "Image src"]
    };
    new ngxCsv(this.allcompany, "Company", orders);
  }


  // Sort filter
  sortField: any;
  sortBy: any
  SortFilter() {
    this.sortField = (document.getElementById("choices-single-default") as HTMLInputElement).value;
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


}
