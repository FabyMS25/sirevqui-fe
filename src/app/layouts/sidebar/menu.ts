import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    orden: 1,
    nombreMenu: 'DASHBOARDS.ADMIN',
    icono: 'ri-dashboard-2-line',
    ruta: '/',
  },
  {
    orden: 1,
    nombreMenu: 'DASHBOARDS.EMPLOYEE',
    // nombreMenu: 'Empleado',
    icono: 'ri-dashboard-2-line',
    ruta: '/empleado',
  },
  {
    orden: 1,
    nombreMenu: 'DASHBOARDS.TAXPAYER',
    // nombreMenu: 'Contribuyente',
    icono: 'ri-dashboard-2-line',
    ruta: '/contribuyente',
  },

  {
    orden: 1,
    nombreMenu: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    orden: 1,
    nombreMenu: 'RESERVATIONS.TEXT',
    ruta: '/reservas/reservas',
    icono: 'ri-pages-line',
    isCollapsed: true,
    permisoHijoListDto: [
      {
        id: 16,
        nombreMenu: 'RESERVATIONS.ORDERS',
        ruta: '/ecommerce/orders',
        permisoPadreDto: 12
      },
      {
        id: 18,
        nombreMenu: 'RESERVATIONS.CUSTOMERS',
        ruta: '/ecommerce/customers',
        permisoPadreDto: 12
      },
    ]
  },
  {
    orden: 1,
    nombreMenu: 'ADMINISTRATION.TEXT',
    icono: 'ri-settings-3-line',
    // isCollapsed: true,
    permisoHijoListDto: [
      {
        id: 32,
        nombreMenu: 'ADMINISTRATION.EMPLOYEES',
        ruta: '/settings/employees',
        permisoPadreDto: 31
      },
      {
        id: 33,
        nombreMenu: 'ADMINISTRATION.COMPANIES',
        ruta: '/settings/companies',
        permisoPadreDto: 31
      },
      {
        id: 35,
        nombreMenu: 'MENUITEMS.APPS.LIST.LEADS',
        ruta: '/settings/leads',
        permisoPadreDto: 31
      }
    ]
  },
      

  {
    orden: 1,
    nombreMenu: 'MENUITEMS.APPS.TEXT',
    icono: 'ri-apps-2-line',
    isCollapsed: true,
    permisoHijoListDto: [
      {
        orden: 1,
        nombreMenu: 'MENUITEMS.APPS.LIST.ECOMMERCE',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            orden: 1,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/ecommerce/orders',
            permisoPadreDto: 12
          },
          {
            orden: 1,
            nombreMenu: 'MENUITEMS.APPS.LIST.CUSTOMERS',
            ruta: '/ecommerce/customers',
            permisoPadreDto: 12
          },
        ]
      },
      {
        orden: 1,
        nombreMenu: 'MENUITEMS.APPS.LIST.TASK',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            orden: 1,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tasks/list-view',
            permisoPadreDto: 27
          },
          {
            orden: 1,
            nombreMenu: 'MENUITEMS.APPS.LIST.TASKDETAILS',
            ruta: '/tasks/details',
            permisoPadreDto: 27
          }
        ]
      },
      {
        orden: 1,
        nombreMenu: 'MENUITEMS.APPS.LIST.CRYPTO',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            id: 39,
            nombreMenu: 'MENUITEMS.APPS.LIST.MYWALLET',
            link: '/crypto/orders',
            permisoPadreDto: 36
          },
        ]
      },
      {
        id: 42,
        nombreMenu: 'MENUITEMS.APPS.LIST.INVOICES',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            id: 43,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            link: '/invoices/list',
            permisoPadreDto: 42
          },
          {
            id: 44,
            nombreMenu: 'MENUITEMS.APPS.LIST.DETAILS',
            link: '/invoices/details',
            permisoPadreDto: 42
          },
          {
            id: 45,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
            link: '/invoices/create',
            permisoPadreDto: 42
          }
        ]
      },
      {
        id: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.SUPPORTTICKETS',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            id: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            link: '/tickets/list',
            permisoPadreDto: 46
          },
          {
            id: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.TICKETDETAILS',
            link: '/tickets/details',
            permisoPadreDto: 46
          }
        ]
      },
      {
        id: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.NFTMARKETPLACE',
        permisoPadreDto: 8,
        isCollapsed: true,
        permisoHijoListDto: [
          {
            id: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.ITEMDETAILS',
            link: '/marletplace/item-details',
            permisoPadreDto: 46
          },
        ]
      },
      {
        id: 64,
        nombreMenu: 'MENUITEMS.APPS.LIST.APIKEY',
        link: '/apikey',
        permisoPadreDto: 8,
      },
      {
        id: 90,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PRICING',
        link: '/pages/pricing',
        permisoPadreDto: 82
      },
    ]
  },
  {
    orden: 10,
    nombreMenu: 'MENUITEMS.CHARTS.TEXT',
    icono: 'ri-pie-chart-line',
    isCollapsed: true,
    permisoHijoListDto: [
      {
        id: 150,
        nombreMenu: 'MENUITEMS.CHARTS.LIST.APEXCHARTS',
        permisoPadreDto: 149,
        permisoHijoListDto: [
          {
            id: 151,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.LINE',
            link: '/charts/apex-line',
            permisoPadreDto: 150
          },
          {
            id: 152,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.AREA',
            link: '/charts/apex-area',
            permisoPadreDto: 150
          },
          {
            id: 153,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.COLUMN',
            link: '/charts/apex-column',
            permisoPadreDto: 150
          },
          {
            id: 154,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.BAR',
            link: '/charts/apex-bar',
            permisoPadreDto: 150
          },
          {
            id: 155,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.MIXED',
            link: '/charts/apex-mixed',
            permisoPadreDto: 150
          },
          {
            id: 156,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.TIMELINE',
            link: '/charts/apex-timeline',
            permisoPadreDto: 150
          },
          {
            id: 157,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.RANGEAREA',
            link: '/charts/range-area',
            badge: {
              variant: 'bg-success',
              text: 'MENUITEMS.DASHBOARD.BADGE',
            },
            permisoPadreDto: 150
          },
          {
            id: 15,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.FUNNEL',
            link: '/charts/funnel',
            badge: {
              variant: 'bg-success',
              text: 'MENUITEMS.DASHBOARD.BADGE',
            },
            permisoPadreDto: 150
          },
          {
            id: 158,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.CANDLSTICK',
            link: '/charts/apex-candlestick',
            permisoPadreDto: 150
          },
          {
            id: 159,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.BOXPLOT',
            link: '/charts/apex-boxplot',
            permisoPadreDto: 150
          },
          {
            id: 160,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.BUBBLE',
            link: '/charts/apex-bubble',
            permisoPadreDto: 150
          },
          {
            id: 161,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.SCATTER',
            link: '/charts/apex-scatter',
            permisoPadreDto: 150
          },
          {
            id: 162,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.HEATMAP',
            link: '/charts/apex-heatmap',
            permisoPadreDto: 150
          },
          {
            id: 163,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.TREEMAP',
            link: '/charts/apex-treemap',
            permisoPadreDto: 150
          },
          {
            id: 164,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.PIE',
            link: '/charts/apex-pie',
            permisoPadreDto: 150
          },
          {
            id: 165,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.RADIALBAR',
            link: '/charts/apex-radialbar',
            permisoPadreDto: 150
          },
          {
            id: 166,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.RADAR',
            link: '/charts/apex-radar',
            permisoPadreDto: 150
          },
          {
            id: 167,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.POLARAREA',
            link: '/charts/apex-polar',
            permisoPadreDto: 150
          },
        ]
      },
      {
        id: 168,
        nombreMenu: 'MENUITEMS.CHARTS.LIST.CHARTJS',
        link: '/charts/chartjs',
        permisoPadreDto: 149
      },
      {
        id: 169,
        nombreMenu: 'MENUITEMS.CHARTS.LIST.ECHARTS',
        link: '/charts/echarts',
        permisoPadreDto: 149
      }
    ]
  },

];
