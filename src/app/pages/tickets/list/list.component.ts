import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';
// Date Format
import { DatePipe } from '@angular/common';

// Rest Api Service
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { addTicket, deleteTicket, fetchTicketListData, updateTicket } from 'src/app/store/Ticket/ticket_action';
import { selectTicketData, selectTicketLoading } from 'src/app/store/Ticket/ticket_selector';
import { cloneDeep } from 'lodash';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TicketListModel } from 'src/app/store/Ticket/ticket_model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * List Component
 */
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  ordersForm!: UntypedFormGroup;
  CustomersData!: TicketListModel[];
  masterSelected!: boolean;
  checkedList: any;
  submitted = false;

  // Api Data
  content?: any;
  lists?: any;
  econtent?: any;
  alllists: any;
  searchResults: any;
  searchTerm: any;
  date: any;
  status: any = '';

  constructor(private modalService: NgbModal, public service: PaginationService, private formBuilder: UntypedFormBuilder,
    private store: Store<{ data: RootReducerState }>, private datePipe: DatePipe) {

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
     * Form Validation
     */
    this.ordersForm = this.formBuilder.group({
      id: [''],
      ids: [''],
      title: ['', [Validators.required]],
      client: ['', [Validators.required]],
      assigned: ['', [Validators.required]],
      create: ['', [Validators.required]],
      due: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
    this.store.dispatch(fetchTicketListData());
    this.store.select(selectTicketLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectTicketData).subscribe((data) => {
      this.lists = data;
      this.alllists = cloneDeep(data);
      this.lists = this.service.changePage(this.alllists)
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
      this.store.dispatch(deleteTicket({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteTicket({ id: this.checkedValGet.toString() }));
    }
    this.deleteId = ''
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
    this.lists.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].state == true) {
        result = this.lists[i];
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
    for (var i = 0; i < this.lists.length; i++) {
      if (this.lists[i].state == true) {
        result = this.lists[i];
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? (document.getElementById("remove-actions") as HTMLElement).style.display = "block" : (document.getElementById("remove-actions") as HTMLElement).style.display = "none";
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
    return this.ordersForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.ordersForm.valid) {
      if (this.ordersForm.get('id')?.value) {
        const updatedData = this.ordersForm.value;
        this.store.dispatch(updateTicket({ updatedData }));
      }
      else {
        const ticketId = (this.alllists.length + 1).toString();
        this.ordersForm.controls['id'].setValue(ticketId);
        const newData = this.ordersForm.value;
        this.store.dispatch(addTicket({ newData }));
        let timerInterval: any;
        Swal.fire({
          title: 'Order inserted successfully!',
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
    this.modalService.dismissAll();
    this.ordersForm.reset();
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
    modelTitle.innerHTML = 'Edit Ticket';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.econtent = this.alllists[id];
    this.ordersForm.controls['id'].setValue(this.econtent.id);
    this.ordersForm.controls['title'].setValue(this.econtent.title);
    this.ordersForm.controls['client'].setValue(this.econtent.client);
    this.ordersForm.controls['assigned'].setValue(this.econtent.assigned);
    this.ordersForm.controls['create'].setValue(this.econtent.create);
    this.ordersForm.controls['due'].setValue(this.econtent.due);
    this.ordersForm.controls['status'].setValue(this.econtent.status);
    this.ordersForm.controls['priority'].setValue(this.econtent.priority);
    this.ordersForm.controls['ids'].setValue(this.econtent._id);
  }

  // Filtering
  isstatus?: any
  SearchData() {
    var status = document.getElementById("idStatus") as HTMLInputElement;
    var date = document.getElementById("isDate") as HTMLInputElement;
    var dateVal = date.value ? this.datePipe.transform(new Date(date.value), "yyyy-MM-dd") : '';
    if (status.value != 'all' && status.value != '' || dateVal != '') {
      this.lists = this.content.filter((ticket: any) => {
        return this.datePipe.transform(new Date(ticket.create), "yyyy-MM-dd") == dateVal || ticket.status === status.value;
      });
    }
    else {
      this.lists = this.content;
    }
  }

  // Pagination
  changePage() {
    this.lists = this.service.changePage(this.alllists)
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.alllists.filter((item: any) => {
      return (
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.assigned.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.lists = this.service.changePage(this.searchResults)
  }

  // Filter
  statusFilter() {
    if (this.status != '') {
      this.lists = this.alllists.filter((ticket: any) => ticket.status == this.status);
    } else {
      this.lists = this.service.changePage(this.alllists)
    }
  }

  // Sort Data
  onSort(column: any) {
    this.lists = this.service.onSort(column, this.lists)
  }
  
}
