import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'src/app/core/models/menu.model';

@Component({
  selector: 'app-two-column-sidebar',
  templateUrl: './two-column-sidebar.component.html',
  styleUrls: ['./two-column-sidebar.component.scss']
})
export class TwoColumnSidebarComponent implements OnInit {
  menu: any;
  toggle: any = true;
  menuItems: MenuItem[] = [];
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(private router: Router, public translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    // Menu Items
    const menu = localStorage.getItem('menu');
    this.menuItems =menu ? JSON.parse(menu) : null;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initActiveMenu();
      }
    });
  }

  /***
  * Activate drop down set
  */
  ngAfterViewInit() {
    setTimeout(() => {
      this.initActiveMenu();
    }, 0);
  }

  toggleSubItem(item: any) {
    this.menuItems.forEach((menuItem: any) => {
      if (menuItem.permisoHijoListDto) {
        menuItem.permisoHijoListDto.forEach((subItem: any) => {

          if (subItem == item) {
            menuItem.isCollapsed = !menuItem.isCollapsed
            subItem.isCollapsed = !subItem.isCollapsed
          } else {
            subItem.isCollapsed = true
          }
          if (subItem.permisoHijoListDto) {
            subItem.permisoHijoListDto.forEach((childitem: any) => {

              if (childitem == item) {
                childitem.isCollapsed = !childitem.isCollapsed
                subItem.isCollapsed = !subItem.isCollapsed
                menuItem.isCollapsed = !menuItem.isCollapsed
              } else {
                childitem.isCollapsed = true
              }
              if (childitem.permisoHijoListDto) {
                childitem.permisoHijoListDto.forEach((childrenitem: any) => {
                  if (childrenitem == item) {
                    childrenitem.isCollapsed = false
                    childitem.isCollapsed = false
                    subItem.isCollapsed = false
                    menuItem.isCollapsed = false
                  } else {
                    childrenitem.isCollapsed = true
                  }
                })
              }

            })
          }
        })
      }
    });
  };

  toggleExtraSubItem(event: any) {
    let isCurrentMenuId = event.target.closest('a.nav-link');
    let isMenu = isCurrentMenuId.nextElementSibling as any;
    if (isMenu.classList.contains("show")) {
      isMenu.classList.remove("show");
      isCurrentMenuId.setAttribute("aria-expanded", "false");
    } else {
      let dropDowns = Array.from(document.querySelectorAll('.extra-sub-menu'));
      dropDowns.forEach((node: any) => {
        node.classList.remove('show');
      });

      let subDropDowns = Array.from(document.querySelectorAll('.menu-dropdown .nav-link'));
      subDropDowns.forEach((submenu: any) => {
        submenu.setAttribute('aria-expanded', "false");
      });

      if (event.target && event.target.nextElementSibling) {
        isCurrentMenuId.setAttribute("aria-expanded", "true");
        event.target.nextElementSibling.classList.toggle("show");
      }
    }
  };

  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link.active"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }

  // Click wise Parent active class add
  toggleParentItem(event: any) {
    let isCurrentMenuId = event.target.getAttribute('permisoHijoListDto');
    let isMenu = document.getElementById(isCurrentMenuId) as any;
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    (isMenu) ? isMenu.classList.add('show') : null;

    const ul = document.getElementById("two-column-menu");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.classList.remove("active");
      });
    }
    event.target.classList.add("active");
    document.body.classList.add('twocolumn-panel')
  }

  toggleItem(event: any) { // show navbar-nav menu on click of icon sidebar menu    
    let isCurrentMenuId = event.target.getAttribute('permisoHijoListDto');
    let isMenu = document.getElementById(isCurrentMenuId) as any;
    let dropDowns = Array.from(document.querySelectorAll('#navbar-nav .show'));
    dropDowns.forEach((node: any) => {
      node.classList.remove('show');
    });
    (isMenu) ? isMenu.classList.add('show') : null;

    const ul = document.getElementById("two-column-menu");
    if (ul) {
      const iconItems = Array.from(ul.getElementsByTagName("a"));
      let activeIconItems = iconItems.filter((x: any) => x.classList.contains("active"));
      activeIconItems.forEach((item: any) => {
        item.classList.remove("active");
      });
    }
    event.target.classList.add("active");
    document.body.classList.remove('twocolumn-panel')
  }

  // remove active items of two-column-menu
  removeActivation(items: any) {
    items.forEach((item: any) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        item.nextElementSibling.classList.remove("show");
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        if (item.parentElement) {
          item.parentElement.closest(".isCollapsed")?.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  }

  activateIconSidebarActive(id: any) {
    var menu = document.querySelector("#two-column-menu .simplebar-content-wrapper a[permisoHijoListDto='" + id + "'].nav-icon");
    if (menu !== null) {
      menu.classList.add("active");
    }
  }

  activateParentDropdown(item: any) { // navbar-nav menu add active
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapsed.menu-dropdown");
    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
      if (parentCollapseDiv.parentElement.closest(".collapsed.menu-dropdown")) {
        parentCollapseDiv.parentElement.closest(".collapsed").classList.add("show");
        if (parentCollapseDiv.parentElement.closest(".collapsed").previousElementSibling)
          parentCollapseDiv.parentElement.closest(".collapsed").previousElementSibling.classList.add("active");
      }
      this.activateIconSidebarActive(parentCollapseDiv.getAttribute("id"));
      return false;
    }
    return false;
  }

  initActiveMenu() {
    const pathName = window.location.pathname;

    // Active Main Single Menu
    const mainItems = Array.from(document.querySelectorAll(".twocolumn-iconview li a"));
    let matchingMainMenuItem = mainItems.find((x: any) => {
      return x.pathname === pathName;
    });
    if (matchingMainMenuItem) {
      this.activateParentDropdown(matchingMainMenuItem);
    }

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
      } else {
        var id = pathName.replace("/", "");
        if (id) document.body.classList.add('twocolumn-panel');
        this.activateIconSidebarActive(id)
      }
    }
  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.permisoHijoListDto !== undefined ? item.permisoHijoListDto.length > 0 : false;
  }

  /**
    * SidebarHide modal
    * @param content modal content
    */
  SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }
  
  getSubMenu(menuItems:any[]):any[]{
    const commonItems = menuItems.filter(item1 => this.menuItems.some(item2 => item1.nombreMenu === item2.nombreMenu));
    const uniqueMenuItemsMap = commonItems.reduce((map, item) => {
      if (!map.has(item.nombreMenu)) {
        map.set(item.nombreMenu, item);
      }
      return map;
    }, new Map<string, any>());
  
    return Array.from(uniqueMenuItemsMap.values());
  }
  
}