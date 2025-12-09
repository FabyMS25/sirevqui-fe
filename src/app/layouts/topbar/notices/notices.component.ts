import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import { Subject, takeUntil, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { allNotification, messages } from '../data';
// import { Alert } from 'src/app/core/models/alert.models';
// import { AlertService } from 'src/app/core/services/alerts.service';


interface NotificationItem {
  avatar: string;
  name: string;
  message: string;
  cost: string;
  time_ago: Date | string;
  stateItem: string;
  read: boolean;
  checkboxId: string;
  // originalEvent: Alert;
  type: string;
  priority: 'low' | 'medium' | 'high';
}
@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<void>();
  
  avatar = "default-profile1.png";
  userData: any;
         
  
  selectedNotifications: Set<string> = new Set();
  isLoading = false;
  lastUpdateTime: Date | null = null;
  
  totalNotifications = 0;
  unreadCount = 0;
  alertsCount = 0;
  
  activeTab = 1;
  refreshInterval: any;


  
  messages: any
  allnotifications: any
  
    totalNotify: number = 0;
    newNotify: number = 0;
    readNotify: number = 0;
    isDropdownOpen = false;
    @ViewChild('removenotification') removenotification !: TemplateRef<any>;
    notifyId: any;

  constructor(
    private eventService: EventService,
    private modalService: NgbModal,
    private cookieService: CookieService, 
    public translate: TranslateService, 
    private authService: AuthenticationService,
  ) { }
  
  async ngOnInit() {
    this.userData = this.authService.currentUser();
    this.avatar = this.authService.getAvatar();
    await this.loadNotifications();
    this.refreshInterval = setInterval(() => {
      this.loadNotifications();
    }, 300000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
  
  async loadNotifications() {
    this.isLoading = true;
    
    // Fetch Data
    this.allnotifications = allNotification;
    
    this.messages = messages;
    // try {
    //   await this.getAlerts();
    //   this.processNotifications();
    //   this.filterNotifications();
    //   this.updateCounters();
    //   this.lastUpdateTime = new Date();
    // } catch (error) {
    //   console.error('Error loading notifications:', error);
    // } finally {
    //   this.isLoading = false;
    // }
  }  

  
  // Remove Notification
  checkedValGet: any[] = [];
  onCheckboxChange(event: any, id: any) {
    this.notifyId = id
    var result;
    if (id == '1') {
      var checkedVal: any[] = [];
      for (var i = 0; i < this.allnotifications.length; i++) {
        if (this.allnotifications[i].state == true) {
          result = this.allnotifications[i].id;
          checkedVal.push(result);
        }
      }
      this.checkedValGet = checkedVal;
    } else {
      var checkedVal: any[] = [];
      for (var i = 0; i < this.messages.length; i++) {
        if (this.messages[i].state == true) {
          result = this.messages[i].id;
          checkedVal.push(result);
        }
      }
      this.checkedValGet = checkedVal;
    }
    checkedVal.length > 0 ? (document.getElementById("notification-actions") as HTMLElement).style.display = 'block' : (document.getElementById("notification-actions") as HTMLElement).style.display = 'none';
  }

  notificationDelete() {
    if (this.notifyId == '1') {
      for (var i = 0; i < this.checkedValGet.length; i++) {
        for (var j = 0; j < this.allnotifications.length; j++) {
          if (this.allnotifications[j].id == this.checkedValGet[i]) {
            this.allnotifications.splice(j, 1)
          }
        }
      }
    } else {
      for (var i = 0; i < this.checkedValGet.length; i++) {
        for (var j = 0; j < this.messages.length; j++) {
          if (this.messages[j].id == this.checkedValGet[i]) {
            this.messages.splice(j, 1)
          }
        }
      }
    }
    this.calculatenotification()
    this.modalService.dismissAll();
  }

  calculatenotification() {
    this.totalNotify = 0;
    this.checkedValGet = []

    this.checkedValGet.length > 0 ? (document.getElementById("notification-actions") as HTMLElement).style.display = 'block' : (document.getElementById("notification-actions") as HTMLElement).style.display = 'none';
    if (this.totalNotify == 0) {
      document.querySelector('.empty-notification-elem')?.classList.remove('d-none')
    }
  }

  /**
* Open modal
* @param content modal content
*/
  openModal(content: any) {
    // this.submitted = false;
    this.modalService.open(content, { centered: true });
  }



  getIcon(tipo: string): string {
    const iconMap: Record<string, string> = {
      'NOTIFICACION': 'pi pi-bell',
      'INFRACCION': 'pi pi-times-circle',
      'ALERTA': 'pi pi-exclamation-triangle',
      'INFORME': 'pi pi-file',
      'URGENTE': 'pi pi-exclamation-circle'
    };
    return iconMap[tipo] || 'pi pi-question-circle';
  }

  getBadgeStatus(value: string): string {
    const statusMap: Record<string, string> = {
      'Activo': 'success',
      'Bloqueado': 'warning',
      'Pagado': 'success',
      'Pendiente': 'secondary',
      'Vencido': 'danger',
      'Anulado': 'warning',
      'Con Orden': 'success',
      'Sin Orden': 'secondary',
      'Leída': 'success',
      'No leída': 'warning',
      'Activa': 'success',
      'Inactiva': 'danger'
    };
    return statusMap[value] || 'info';
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }



  openDeleteModal() {
    if (this.selectedNotifications.size > 0) {
      this.modalService.open(this.removenotification, { centered: true });
    }
  }
  

  refreshNotifications() {
    this.loadNotifications();
  }

  trackByNotificationId(index: number, item: NotificationItem): string {
    return item.checkboxId;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onTabChange(tabId: number) {
    this.activeTab = tabId;
    this.selectedNotifications.clear();
  }


  getSelectedCount(): number {
    return this.selectedNotifications.size;
  }

  clearSelection() {
    this.selectedNotifications.clear();
  }


  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "block";
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "none";
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  closeBtn() {
    var searchOptions = document.getElementById("search-close-options") as HTMLAreaElement;
    var dropdown = document.getElementById("search-dropdown") as HTMLAreaElement;
    var searchInputReponsive = document.getElementById("search-options") as HTMLInputElement;
    dropdown?.classList.remove("show");
    searchOptions?.classList.add("d-none");
    if (searchInputReponsive) {
      searchInputReponsive.value = "";
    }
  }
}