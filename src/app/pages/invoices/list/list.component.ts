import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Date Format
import { DatePipe } from '@angular/common';

// Rest Api Service
import { restApiService } from "../../../core/services/rest-api.service";
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { deleteInvoice, fetchInvoiceListData } from 'src/app/store/Invoice/invoice_action';
import { selectInvoiceData, selectInvoiceLoading } from 'src/app/store/Invoice/invoice_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { InvoiceListModel } from 'src/app/store/Invoice/invoice_model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

/**
 * List Component
 */
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  CustomersData!: InvoiceListModel[];
  masterSelected!: boolean;
  checkedList: any;

  // Api Data
  content?: any;
  econtent?: any;
  invoices?: any;
  allinvoices: any;
  searchResults: any;
  searchTerm: any;
  date: any;
  status: any='';

  constructor(private modalService: NgbModal, public service: PaginationService, private store: Store<{ data: RootReducerState }>, private datePipe: DatePipe) {
  
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Invoices' },
      { label: 'Invoice List', active: true }
    ];

    /**
     * fetches data
     */
    this.store.dispatch(fetchInvoiceListData());
    this.store.select(selectInvoiceLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectInvoiceData).subscribe((data) => {
      this.invoices = data;
      this.allinvoices = cloneDeep(data);
      this.invoices = this.service.changePage(this.allinvoices)
    });
  }

  
  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };
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
      this.store.dispatch(deleteInvoice({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteInvoice({ id: this.checkedValGet.toString() }));
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
      Swal.fire({ text: 'Please select at least one checkbox', confirmButtonColor: '#29badb', });
    }
    this.checkedValGet = checkedVal;
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.invoices.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].state == true) {
        result = this.invoices[i];
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
    for (var i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].state == true) {
        result = this.invoices[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
  }

  // Filtering
  isstatus?: any
  SearchData() {
    var status = document.getElementById("idStatus") as HTMLInputElement;
    var date = document.getElementById("isDate") as HTMLInputElement;
    var dateVal = date.value ? this.datePipe.transform(new Date(date.value), "yyyy-MM-dd") : '';
    if (status.value != 'all' && status.value != '' || dateVal != '') {
      this.invoices = this.content.filter((list: any) => {
        return this.datePipe.transform(new Date(list.date), "yyyy-MM-dd") == dateVal || list.status === status.value;
      });
    }
    else {
      this.invoices = this.content;
    }
  }

  // Pagination
  changePage() {
    this.invoices = this.service.changePage(this.allinvoices)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.allinvoices.filter((item: any) => {
      return (
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.invoices = this.service.changePage(this.searchResults)
  }

  // Sort Data
  onSort(column: any) {
    this.invoices = this.service.onSort(column, this.invoices)
  }

  statusFilter() {
    if (this.status != '') {
      this.invoices = this.allinvoices.filter((invoice: any) => invoice.status == this.status);
    } else {
      this.invoices = this.allinvoices
    }
  }
  
}
