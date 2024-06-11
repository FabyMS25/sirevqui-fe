import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CalendarOptions, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { restApiService } from 'src/app/core/services/rest-api.service';
import Swal from 'sweetalert2';


import { calendarEvents, category, createEventId } from 'src/app/core/data/calendar';
@Component({
    selector: 'app-contribuyente',
    templateUrl: './contribuyente.component.html',
    styleUrls: ['./contribuyente.component.scss']
})

export class ContribuyenteComponent implements OnInit {

    // bread crumb items
    breadCrumbItems!: Array<{}>;

  // calendar
  calendarEvents!: EventInput[];
  editEvent: any;
  newEventDate: any;
  formEditData!: UntypedFormGroup;
  submitted = false;
  formData!: UntypedFormGroup;
  isEditMode: boolean = false;
  upcomingEvents: any;
  direction: any = 'ltr';
  selectedLocale: any = 'en';
  masterSelected: any = true;
  category: any
  // events$: Observable<EventInput[]>;

  @ViewChild('editmodalShow') editmodalShow!: TemplateRef<any>;
  @ViewChild('modalShow') modalShow !: TemplateRef<any>;
  filterArray: any;
  filterEvents: any = [];
  allcalendarEvents: any;

  constructor(private formBuilder: UntypedFormBuilder, private datePipe: DatePipe, private modalService: NgbModal, private restApiService: restApiService) { }


    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: 'Dashboards' },
            { label: 'Contribuyente', active: true }
        ];
        

    // Validation
    this.formData = this.formBuilder.group({
        title: ['', [Validators.required]],
        category: ['', [Validators.required]],
        location: ['', [Validators.required]],
        description: ['', [Validators.required]],
        date: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required]
      });
  
      this._fetchData();
    }



  /**
   * Fetches the data
   */
  private _fetchData() {
    // Event category
    this.category = category;
    // Calender Event Data

    console.log('calendarEvents', calendarEvents)
    this.restApiService.getCalendarData().subscribe(
      data => {

        const users = JSON.parse(data);
        // console.log('users', users.data)
        // this.calendarEvents = users.data;
        this.calendarOptions.initialEvents = this.calendarEvents.map(
          (evt: any) => {
            return { date: evt.start, title: evt.title, className: evt.className, location: evt.location, description: evt.description }
          })
      });
    this.calendarEvents = calendarEvents;
  }


  /***
 * Calender Set
 */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin],
    headerToolbar: {
      right: 'multiMonthYear,dayGridMonth,dayGridWeek,dayGridDay,listWeek',
      center: 'title',
      left: 'prev,next today'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.calendarEvents || calendarEvents,
    themeSystem: "bootstrap",
    weekends: true,
    droppable: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    direction: 'ltr',
    locale: 'en',
    select: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };
  currentEvents: EventApi[] = [];

  // Calender direction functionality
  changeDirection() {
    this.calendarOptions.direction = this.direction
  }

  // Calender langulage functionality
  changeLocale() {
    this.calendarOptions.locale = this.selectedLocale
  }

  // Calender filter functionality
  checkUncheckAll(ev: any) {
    this.masterSelected = ev.target.checked;
    this.filterArray.forEach((data: any) => {
      data.checked = this.masterSelected;
    });
    if (this.masterSelected == true) {
      this.calendarEvents = this.allcalendarEvents
    } else {
      this.calendarEvents = []
    }

  }
  onCheckboxChange() {
    this.filterEvents = []
    this.filterEvents = this.allcalendarEvents.filter((event: any) => {
      return this.filterArray.some((filterItem: any) => filterItem.checked && filterItem.name === event.type);
    });
    this.calendarEvents = this.filterEvents
  }

  openModal(events?: any) {
    this.modalService.open(this.modalShow, { centered: true });
    // cons
    this.submitted = false;
    this.newEventDate = events;
  }
  /**
   * Event Data Get
   */
  get form() {
    return this.formData.controls;
  }
  // }


  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.isEditMode = true;
    this.editEvent = clickInfo.event;
    setTimeout(() => {
      document.getElementById('form-event')?.classList.add('view-event');
      var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modaltitle.innerHTML = this.editEvent.title;
      (document.getElementById('btn-save-event') as HTMLElement).setAttribute("hidden", "true");
    }, 100);

    this.formData = this.formBuilder.group({
      title: clickInfo.event.title,
      category: clickInfo.event.classNames[0],
      location: clickInfo.event.extendedProps['location'],
      description: clickInfo.event.extendedProps['description'],
      date: clickInfo.event.start,
      start: (clickInfo.event.start ? clickInfo.event.start : ''),
      end: (clickInfo.event.end ? clickInfo.event.end : '')
    });
    this.modalService.open(this.modalShow, { centered: true });
  }


  /**
  * Events bind in calander
  * @param events events
  */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  showeditEvent() {
    if (document.querySelector('#edit-event-btn')?.innerHTML == 'Cancel') {
      document.getElementById('form-event')?.classList.add('view-event');
      var editbtn = document.querySelector('#edit-event-btn') as HTMLAreaElement;
      editbtn.innerHTML = 'Edit';
      (document.getElementById('btn-save-event') as HTMLElement).setAttribute("hidden", "true");
    } else {
      document.getElementById('form-event')?.classList.remove('view-event');
      (document.getElementById('btn-save-event') as HTMLElement).removeAttribute("hidden");

      var modalbtn = document.querySelector('#btn-save-event') as HTMLAreaElement;
      modalbtn.innerHTML = "Update Event"
      var editbtn = document.querySelector('#edit-event-btn') as HTMLAreaElement;
      editbtn.innerHTML = 'Cancel'
    }
  }

  /**
     * Close event modal
     */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      className: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.modalService.dismissAll();
  }

  /***
  * Model Position Set
  */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /***
   * Model Edit Position Set
   */
  Editposition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been Updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  modalTitle: string = '';
  saveButtonText: string = '';
  editCancelButtonText: string = 'Edit';

  /**
  * Save the event
  */

  saveEvent() {
    if (document.querySelector('#btn-save-event')?.innerHTML == 'Add Event') {
      if (this.formData.valid) {
        const className = this.formData.get('category')!.value;
        const title = this.formData.get('title')!.value;
        const location = this.formData.get('location')!.value;
        const description = this.formData.get('description')!.value
        const date = this.formData.get('date')!.value
        const starttime = this.formData.get('start')!.value;
        const endtime = this.formData.get('end')!.value;
        const yy = new Date(date).getFullYear();
        const mm = new Date(date).getMonth() + 1;
        const dd = new Date(date).getDate();

        const start = new Date(mm + '-' + dd + '-' + yy);
        // start.setHours((starttime.split(' ')[0]).split(':')[0]);
        // start.setMinutes((starttime.split(' ')[0]).split(':')[1]);

        const end = new Date(endtime).toTimeString().split(' ')[0];
        // end.setHours((endtime.split(' ')[0]).split(':')[0]);
        // end.setMinutes((endtime.split(' ')[0]).split(':')[1]);
        const calendarApi = this.newEventDate.view.calendar;

        calendarApi.addEvent({
          id: createEventId(),
          title,
          date,
          start,
          end,
          location,
          description,
          className: className
        });
        this.position();
        this.formData = this.formBuilder.group({
          title: '',
          category: '',
          location: '',
          description: '',
          date: '',
          start: '',
          end: ''
        });
        this.modalService.dismissAll();
        this.submitted = true;
      }
    } else {
      this.editEventSave()
    }
  }



  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  /**
   * save edit event data
   */
  editEventSave() {

    const editTitle = this.formData.get('title')!.value;
    const editCategory = this.formData.get('category')!.value;
    const editdate = this.formData.get('date')!.value;
    const editstart = this.formData.get('date')!.value;
    const editend = this.formData.get('end')!.value;
    const editlocation = this.formData.get('location')!.value;
    const editdescription = this.formData.get('description')!.value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);
    this.editEvent.setProp('date', editdate);
    this.editEvent.setProp('start', editdate);
    this.editEvent.setProp('end', editend);
    this.editEvent.setProp('location', editlocation);
    this.editEvent.setProp('description', editdescription);

    this.calendarEvents[editId] = {
      // ...this.editEvent,
      allDay: false,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory,
      start: editstart,
    };
    this.Editposition();
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.modalService.dismissAll();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }
  fetchEvents() { }





}
