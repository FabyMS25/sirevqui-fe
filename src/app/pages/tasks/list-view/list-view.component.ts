import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Date Format
import { DatePipe } from '@angular/common';


// store
import { GlobalComponent } from '../../../global-component';
import { RootReducerState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { addTask, deleteTask, fetchTaskListData, updateTask } from 'src/app/store/Task/task_action';
import { selectTaskData, selectTaskLoading } from 'src/app/store/Task/task_selector';
import { cloneDeep } from 'lodash';
import { AssignedData } from 'src/app/core/data';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})

/**
 * ListView Component
 */
export class ListViewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  tasksForm!: UntypedFormGroup;
  AssignedData!: any;
  checkedList: any;
  masterSelected!: boolean;
  searchTerm: any;
  status: any = '';
  date: any;

  url = GlobalComponent.API_URL;
  content?: any;
  tasks?: any;
  econtent?: any;

  // Table data
  alltasks: any;
  searchResults: any;
  subItem: any;

  constructor(private modalService: NgbModal, public service: PaginationService
    , private formBuilder: UntypedFormBuilder, private store: Store<{ data: RootReducerState }>, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Tasks' },
      { label: 'Tasks List', active: true }
    ];

    /**
     * Form Validation
     */
    this.tasksForm = this.formBuilder.group({
      taskId: [''],
      ids: [''],
      project: ['', [Validators.required]],
      task: ['', [Validators.required]],
      creater: ['', [Validators.required]],
      subItem: this.formBuilder.array([]),
      dueDate: ['', [Validators.required]],
      status: ['', [Validators.required]],
      priority: ['', [Validators.required]]
    });

    /**
     * fetches data
     */
    this.store.dispatch(fetchTaskListData());
    this.store.select(selectTaskLoading).subscribe((data) => {
      if (data == false) {
        document.getElementById('elmLoader')?.classList.add('d-none');
      }
    });

    this.store.select(selectTaskData).subscribe((data) => {
      this.tasks = data;
      this.alltasks = cloneDeep(data);
      this.tasks = this.service.changePage(this.alltasks)
    });

    this.AssignedData = AssignedData

  }
  
  num: number = 0;
  option = {
    startVal: this.num,
    useEasing: true,
    duration: 2,
    decimalPlaces: 2,
  };

  changePage() {
    this.tasks = this.service.changePage(this.alltasks)
  }

  onSort(column: any) {
    this.tasks = this.service.onSort(column, this.tasks)
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
    return this.tasksForm.controls;
  }

  /**
  * Save user
  */
  saveUser() {
    if (this.tasksForm.valid) {
      if (this.tasksForm.get('taskId')?.value) {
        const updatedData = { subItem: this.econtent.subItem, ...this.tasksForm.value };
        this.store.dispatch(updateTask({ updatedData }));
      }
      else {
        const taskId = (this.alltasks.length + 1).toString();
        this.tasksForm.controls['taskId'].setValue(taskId);
        this.tasksForm.controls['ids'].setValue(taskId);
        const newData = {subItem:this.subItem,...this.tasksForm.value};
        this.store.dispatch(addTask({ newData }));
        let timerInterval: any;
        Swal.fire({
          title: 'Task inserted successfully!',
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
      this.modalService.dismissAll();
    }
    this.tasksForm.reset();
    this.submitted = true
  }

  onCheckboxChange(e: any) {
    const checkArray: UntypedFormArray = this.tasksForm.get('subItem') as UntypedFormArray;
    checkArray.push(new UntypedFormControl(e.target.value));
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].state == true) {
        result = this.tasks[i];
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
  editDataGet(id: any, content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
    var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modelTitle.innerHTML = 'Edit Task';
    var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    updateBtn.innerHTML = "Update";

    this.econtent = this.alltasks[id];
    this.tasksForm.controls['project'].setValue(this.econtent.project);
    this.tasksForm.controls['task'].setValue(this.econtent.task);
    this.tasksForm.controls['creater'].setValue(this.econtent.creater);
    this.tasksForm.controls['dueDate'].setValue(this.econtent.dueDate);
    this.tasksForm.controls['status'].setValue(this.econtent.status);
    this.tasksForm.controls['priority'].setValue(this.econtent.priority);
    this.tasksForm.controls['ids'].setValue(this.econtent._id);
    this.tasksForm.controls['taskId'].setValue(this.econtent.taskId);
  }

  /**
   * Delete Swal data
   */
  deleteId: any;
  confirm(content: any, id: any) {
    this.deleteId = id;
    this.modalService.open(content, { centered: true });
  }

  // Delete Data
  deleteData(id: any) {
    if (id) {
      this.store.dispatch(deleteTask({ id: this.deleteId.toString() }));
    } else {
      this.store.dispatch(deleteTask({ id: this.checkedValGet.toString() }));
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


  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.tasks.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].state == true) {
        result = this.tasks[i];
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
    var payment = document.getElementById("idPayment") as HTMLInputElement;
    var date = document.getElementById("isDate") as HTMLInputElement;
    var dateVal = date.value ? this.datePipe.transform(new Date(date.value), "yyyy-MM-dd") : '';
    if (status.value != 'all' && status.value != '' || dateVal != '') {
      this.tasks = this.content.filter((task: any) => {
        return task.status === status.value || this.datePipe.transform(new Date(task.dueDate), "yyyy-MM-dd") == dateVal;
      });
    }
    else {
      this.tasks = this.content;
    }
  }

  performSearch() {
    this.searchResults = this.alltasks.filter((item: any) => {
      return (
        item.project.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.task.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.creater.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.priority.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
    this.tasks = this.service.changePage(this.searchResults)
  }

  statusFilter() {
    if (this.status != '') {
      this.tasks = this.alltasks.filter((task: any) => {
        return task.status === this.status;
      });
    } else {
      this.tasks = this.service.changePage(this.alltasks)
    }
  }

}
