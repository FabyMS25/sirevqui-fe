import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';
// Date Format
import { DatePipe } from '@angular/common';

// Sweet Alert
import Swal from 'sweetalert2';

// Csv File Export
import { ngxCsv } from 'ngx-csv/ngx-csv';


import { Store } from '@ngrx/store';
import { RootReducerState } from 'src/app/store';
import { addCustomer, deleteCustomer, fetchCustomerListData, updateCustomer } from 'src/app/store/Ecommerce/ecommerce_action';
import { selectCustomerData, selectDataLoading } from 'src/app/store/Ecommerce/ecommerce_selector';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

/**
 * Customers Component
 */
export class CustomersComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  customerForm!: UntypedFormGroup;
  masterSelected!: boolean;
  checkedList: any;
  content?: any;
  customers?: any;

  // Table data
  customerList: any;
  searchTerm: any;
  filterDate: any;
  status: any = '';
  searchResults: any;

  constructor(private modalService: NgbModal, public service: PaginationService, private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>) {
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Customers', active: true }
    ];

    /**
    * Form Validation
    */
    this.customerForm = this.formBuilder.group({
      ids: [''],
      customer: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    /**
    * fetches data
    */
    this.store.dispatch(fetchCustomerListData());
    this.store.select(selectDataLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectCustomerData).subscribe((data) => {
      this.customers = data;
      this.customerList = cloneDeep(data);
      this.customers = this.service.changePage(this.customerList)
    });
  }

  changePage() {
    this.customers = this.service.changePage(this.customerList)
  }

  onSort(column: any) {
    // resetting other headers
    this.customers = this.service.onSort(column, this.customers)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.customerList.filter((item: any) => {
      return (
        item.customer.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.customers = this.service.changePage(this.searchResults)
  }

  dateFilter() {
    this.customers = this.customerList.filter((customer: any) => new Date(customer.date) >= new Date(Object.values(this.dateFilter)[0]) && new Date(customer.date) <= new Date(Object.values(this.dateFilter)[1]));
  }

  statusFilter() {
    if (this.status != '') {
      this.customers = this.customerList.filter((customer: any) => customer.status == this.status);
    } else {
      this.customers = this.customerList
    }
  }

  /**
  * Confirmation mail model
  */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.store.dispatch(deleteCustomer({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteCustomer({ id: this.checkedValGet.toString() }));
    }
    this.deleteId = ''
    this.masterSelected = false
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
    return this.customerForm.controls;
  }

  /**
 * Save user
 */
  saveUser() {
    if (this.customerForm.valid) {
      if (this.customerForm.get('_id')?.value) {
        const updatedData = this.customerForm.value;
        this.store.dispatch(updateCustomer({ updatedData }));
        this.modalService.dismissAll();
      }
      else {
        const custId = (this.customerList.length + 1).toString();
        this.customerForm.controls['_id'].setValue(custId);
        const newData = this.customerForm.value;
        this.store.dispatch(addCustomer({ newData }));
        this.modalService.dismissAll();
        let timerInterval: any;
        Swal.fire({
          title: 'Customers inserted successfully!',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
      }
    }
    setTimeout(() => {
      this.customerForm.reset();
    }, 2000);
    this.submitted = true
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.customers.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].state == true) {
        result = this.customers[i];
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
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].state == true) {
        result = this.customers[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  /**
   * Open Edit modal
   * @param content modal content
   */
  econtent?: any;
  editDataGet(id: any, content: any) {
   this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });

    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Customer';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    this.econtent = this.customerList[id];
    this.customerForm.controls['customer'].setValue(this.econtent.customer);
    this.customerForm.controls['email'].setValue(this.econtent.email);
    this.customerForm.controls['phone'].setValue(this.econtent.phone);
    this.customerForm.controls['date'].setValue(this.econtent.date);
    this.customerForm.controls['status'].setValue(this.econtent.status);
    this.customerForm.controls['_id'].setValue(this.econtent._id);

  }

  // Csv File Export
  csvFileExport() {
    var customer = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Customer Data',
      useBom: true,
      noDownload: false,
      headers: ["id", "customer Id", "customer", "email", "phone", "date", "status"]
    };
    new ngxCsv(this.customers, "customers", customer);
  }

}
