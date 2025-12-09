import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from 'src/app/core/constants/menu';
import { MenuItem } from 'src/app/core/models/menu.model';
import { LoginResponse } from 'src/app/core/models/user/login-response.model';

import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: any;
  toggle: any = true;
  menuItems: MenuItem[] = [];
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  userData!: LoginResponse;
  funcionario!:any;
  avatar="default-profile1.png";

  constructor(private router: Router, public translate: TranslateService,
    private authService:AuthenticationService
  ) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    const userString =  window.sessionStorage.getItem('currentUser');
    this.userData =userString ? JSON.parse(userString) : null;
    this.avatar=this.authService.getAvatar();
    const menu = localStorage.getItem('menu');
    this.menuItems =menu ? JSON.parse(menu) : null;
    // this.menuItems = MENU;    
    this.router.events.subscribe((event) => {
      if (document.documentElement.getAttribute('data-layout') != "twocolumn") {
        if (event instanceof NavigationEnd) {
          this.initActiveMenu();
        }
      }
    });
  }

  getSubMenu(menuItems:any[]):any[]{
    const commonItems = menuItems.filter(item1 => this.menuItems.some(item2 => item1.nombreMenu === item2.nombreMenu));
    const uniqueMenuItemsMap = commonItems.reduce((map, item) => {
      if (!map.has(item.nombreMenu) && item.accion !=='CREAR') {
        map.set(item.nombreMenu, item);
      }
      return map;
    }, new Map<string, any>());
  
    return Array.from(uniqueMenuItemsMap.values());
  }
  
  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.initActiveMenu();
    }, 0);
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      item.classList.remove("active");
    });
  }

  toggleItem(item: any) {
    this.menuItems.forEach((menuItem: any) => {
      if (menuItem === item) {
        menuItem.isCollapsed = !menuItem.isCollapsed
      } else {
        menuItem.isCollapsed = true
      }
      if (menuItem.permisoHijoListDto.length>0) {
        menuItem.permisoHijoListDto.forEach((subItem: any) => {
          if (subItem === item) {
            menuItem.isCollapsed = !menuItem.isCollapsed
            subItem.isCollapsed = !subItem.isCollapsed
          } else {
            subItem.isCollapsed = true
          }
          if (subItem.permisoHijoListDto) {
            subItem.permisoHijoListDto.forEach((childitem: any) => {

              if (childitem === item) {
                childitem.isCollapsed = !childitem.isCollapsed
                subItem.isCollapsed = !subItem.isCollapsed
                menuItem.isCollapsed = !menuItem.isCollapsed
              } else {
                childitem.isCollapsed = true
              }
              if (childitem.permisoHijoListDto) {
                childitem.permisoHijoListDto.forEach((childrenitem: any) => {

                  if (childrenitem == item) {
                    childrenitem.isCollapsed = true
                    childitem.isCollapsed = true
                    subItem.isCollapsed = true
                    menuItem.isCollapsed = true
                  } else {
                    childrenitem.isCollapsed = false
                  }
                })
              }
            })
          }
        })
      }
    });
  }

  activateParentDropdown(item: any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  initActiveMenu() {
    let pathName = window.location.pathname;

    const active = this.findMenuItem(pathName, this.menuItems)
    this.toggleItem(active)
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      let activeItems = items.filter((x: any) => x.classList.contains("active"));
      this.removeActivation(activeItems);

      let matchingMenuItem = items.find((x: any) => {
          return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  private findMenuItem(pathname: string, menuItems: any[]): any {
    for (const menuItem of menuItems) {
      if (menuItem.ruta && menuItem.ruta === pathname) {
        return menuItem;
      }
      if (menuItem.permisoHijoListDto) {
        const foundItem = this.findMenuItem(pathname, menuItem.permisoHijoListDto);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  }
  
  /**
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.permisoHijoListDto !== undefined ? item.permisoHijoListDto.length > 0 : false;
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
    if (sidebarsize == 'sm-hover-active') {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover');

    } else {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }
}
