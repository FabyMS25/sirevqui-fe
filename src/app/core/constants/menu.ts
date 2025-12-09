import { MenuItem } from '../models/menu.model';

export const MENU: MenuItem[] = [
  {
    orden: 1,
    nombreMenu: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
    permisoHijoListDto: [],
  },
  {
    orden: 2,
    nombreMenu: 'MENUITEMS.DASHBOARD.TEXT',
    icono: 'ri-dashboard-2-line',
    ruta: '/analytics',
    permisoHijoListDto: [],
  },
  {
    orden: 8,
    nombreMenu: 'MENUITEMS.APPS.TEXT',
    icono: 'ri-apps-2-line',
    isCollapsed: true,
    permisoHijoListDto: [
      {
        orden: 9,
        nombreMenu: 'MENUITEMS.APPS.LIST.CALENDAR',
        ruta: '/calendar',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 9,
            nombreMenu: 'MENUITEMS.APPS.LIST.MAINCALENDAR',
            ruta: '/calendar',
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 9,
            nombreMenu: 'MENUITEMS.APPS.LIST.MONTHGRID',
            ruta: '/month-grid',
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 10,
        nombreMenu: 'MENUITEMS.APPS.LIST.CHAT',
        ruta: '/chat',
        permisoPadreDto: 8,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 11,
        nombreMenu: 'MENUITEMS.APPS.LIST.EMAIL',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 13,
            nombreMenu: 'MENUITEMS.APPS.LIST.MAILBOX',
            ruta: '/mailbox',
            permisoPadreDto: 11,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 14,
            nombreMenu: 'MENUITEMS.APPS.LIST.MAILTEMPLATES',
            permisoPadreDto: 11,
            permisoHijoListDto: [
              {
                orden: 13,
                nombreMenu: 'MENUITEMS.APPS.LIST.BASICACTION',
                ruta: '/email-basic',
                permisoPadreDto: 14,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 13,
                nombreMenu: 'MENUITEMS.APPS.LIST.ECOMMERCEACTION',
                ruta: '/email-ecommerce',
                permisoPadreDto: 14,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
            ]
          }
        ]
      },
      {
        orden: 12,
        nombreMenu: 'MENUITEMS.APPS.LIST.ECOMMERCE',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 13,
            nombreMenu: 'MENUITEMS.APPS.LIST.PRODUCTS',
            ruta: '/ecommerce/products',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 14,
            nombreMenu: 'MENUITEMS.APPS.LIST.PRODUCTDETAILS',
            ruta: '/ecommerce/product-detail',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 15,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEPRODUCT',
            ruta: '/ecommerce/add-product',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 16,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/ecommerce/orders',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 17,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERDETAILS',
            ruta: '/ecommerce/order-details',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 18,
            nombreMenu: 'MENUITEMS.APPS.LIST.CUSTOMERS',
            ruta: '/ecommerce/customers',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 19,
            nombreMenu: 'MENUITEMS.APPS.LIST.SHOPPINGCART',
            ruta: '/ecommerce/cart',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 20,
            nombreMenu: 'MENUITEMS.APPS.LIST.CHECKOUT',
            ruta: '/ecommerce/checkout',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 21,
            nombreMenu: 'MENUITEMS.APPS.LIST.SELLERS',
            ruta: '/ecommerce/sellers',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 22,
            nombreMenu: 'MENUITEMS.APPS.LIST.SELLERDETAILS',
            ruta: '/ecommerce/seller-details',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 23,
        nombreMenu: 'MENUITEMS.APPS.LIST.PROJECTS',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 24,
            nombreMenu: 'MENUITEMS.APPS.LIST.LIST',
            ruta: '/projects/list',
            permisoPadreDto: 23,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 25,
            nombreMenu: 'MENUITEMS.APPS.LIST.OVERVIEW',
            ruta: '/projects/overview',
            permisoPadreDto: 23,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 26,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEPROJECT',
            ruta: '/projects/create',
            permisoPadreDto: 23,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 27,
        nombreMenu: 'MENUITEMS.APPS.LIST.TASK',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 28,
            nombreMenu: 'MENUITEMS.APPS.LIST.KANBANBOARD',
            ruta: '/tasks/kanban',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 29,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tasks/list-view',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 30,
            nombreMenu: 'MENUITEMS.APPS.LIST.TASKDETAILS',
            ruta: '/tasks/details',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 31,
        nombreMenu: 'MENUITEMS.APPS.LIST.CRM',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 32,
            nombreMenu: 'MENUITEMS.APPS.LIST.CONTACTS',
            ruta: '/crm/contacts',
            permisoPadreDto: 31,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 33,
            nombreMenu: 'MENUITEMS.APPS.LIST.COMPANIES',
            ruta: '/crm/companies',
            permisoPadreDto: 31,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 34,
            nombreMenu: 'MENUITEMS.APPS.LIST.DEALS',
            ruta: '/crm/deals',
            permisoPadreDto: 31,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 35,
            nombreMenu: 'MENUITEMS.APPS.LIST.LEADS',
            ruta: '/crm/leads',
            permisoPadreDto: 31,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 36,
        nombreMenu: 'MENUITEMS.APPS.LIST.CRYPTO',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 37,
            nombreMenu: 'MENUITEMS.APPS.LIST.TRANSACTIONS',
            ruta: '/crypto/transactions',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 38,
            nombreMenu: 'MENUITEMS.APPS.LIST.BUY&SELL',
            ruta: '/crypto/buy-sell',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 38,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/crypto/orders',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 39,
            nombreMenu: 'MENUITEMS.APPS.LIST.MYWALLET',
            ruta: '/crypto/wallet',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 40,
            nombreMenu: 'MENUITEMS.APPS.LIST.ICOLIST',
            ruta: '/crypto/ico',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 41,
            nombreMenu: 'MENUITEMS.APPS.LIST.KYCAPPLICATION',
            ruta: '/crypto/kyc',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 42,
        nombreMenu: 'MENUITEMS.APPS.LIST.INVOICES',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 43,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/invoices/list',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 44,
            nombreMenu: 'MENUITEMS.APPS.LIST.DETAILS',
            ruta: '/invoices/details',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 45,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
            ruta: '/invoices/create',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.SUPPORTTICKETS',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tickets/list',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.TICKETDETAILS',
            ruta: '/tickets/details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
      {
        orden: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.NFTMARKETPLACE',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.MARKETPLACE',
            ruta: '/marletplace/marketplace',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.EXPLORENOW',
            ruta: '/marletplace/explore',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.LIVEAUCTION',
            ruta: '/marletplace/auction',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.ITEMDETAILS',
            ruta: '/marletplace/item-details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.COLLECTIONS',
            ruta: '/marletplace/collections',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATORS',
            ruta: '/marletplace/creators',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.RANKING',
            ruta: '/marletplace/raking',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.WALLETCONNECT',
            ruta: '/marletplace/wallet',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATENFT',
            ruta: '/marletplace/create',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
        ]
      },
      {
        orden: 64,
        nombreMenu: 'MENUITEMS.APPS.LIST.APIKEY',
        ruta: '/crypto/apikey',
        permisoPadreDto: 8,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
    ]
  },
      {
        orden: 12,
        nombreMenu: 'MENUITEMS.APPS.LIST.ECOMMERCE',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 13,
            nombreMenu: 'MENUITEMS.APPS.LIST.PRODUCTS',
            ruta: '/ecommerce/products',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 14,
            nombreMenu: 'MENUITEMS.APPS.LIST.PRODUCTDETAILS',
            ruta: '/ecommerce/product-detail',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 15,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEPRODUCT',
            ruta: '/ecommerce/add-product',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 16,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/ecommerce/orders',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 17,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERDETAILS',
            ruta: '/ecommerce/order-details',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 18,
            nombreMenu: 'MENUITEMS.APPS.LIST.CUSTOMERS',
            ruta: '/ecommerce/customers',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 19,
            nombreMenu: 'MENUITEMS.APPS.LIST.SHOPPINGCART',
            ruta: '/ecommerce/cart',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 20,
            nombreMenu: 'MENUITEMS.APPS.LIST.CHECKOUT',
            ruta: '/ecommerce/checkout',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 21,
            nombreMenu: 'MENUITEMS.APPS.LIST.SELLERS',
            ruta: '/ecommerce/sellers',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 22,
            nombreMenu: 'MENUITEMS.APPS.LIST.SELLERDETAILS',
            ruta: '/ecommerce/seller-details',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 16,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/ecommerce/orders',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 18,
            nombreMenu: 'MENUITEMS.APPS.LIST.CUSTOMERS',
            ruta: '/ecommerce/customers',
            permisoPadreDto: 12,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },

      {
        orden: 27,
        nombreMenu: 'MENUITEMS.APPS.LIST.TASK',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 28,
            nombreMenu: 'MENUITEMS.APPS.LIST.KANBANBOARD',
            ruta: '/tasks/kanban',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 29,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tasks/list-view',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 30,
            nombreMenu: 'MENUITEMS.APPS.LIST.TASKDETAILS',
            ruta: '/tasks/details',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 29,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tasks/list-view',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 30,
            nombreMenu: 'MENUITEMS.APPS.LIST.TASKDETAILS',
            ruta: '/tasks/details',
            permisoPadreDto: 27,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },

      {
        orden: 64,
        nombreMenu: 'MENUITEMS.APPS.LIST.APIKEY',
        ruta: '/crypto/apikey',
        permisoPadreDto: 8,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 36,
        nombreMenu: 'MENUITEMS.APPS.LIST.CRYPTO',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 37,
            nombreMenu: 'MENUITEMS.APPS.LIST.TRANSACTIONS',
            ruta: '/crypto/transactions',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 38,
            nombreMenu: 'MENUITEMS.APPS.LIST.BUY&SELL',
            ruta: '/crypto/buy-sell',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 38,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/crypto/orders',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 39,
            nombreMenu: 'MENUITEMS.APPS.LIST.MYWALLET',
            ruta: '/crypto/wallet',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 40,
            nombreMenu: 'MENUITEMS.APPS.LIST.ICOLIST',
            ruta: '/crypto/ico',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 41,
            nombreMenu: 'MENUITEMS.APPS.LIST.KYCAPPLICATION',
            ruta: '/crypto/kyc',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 38,
            nombreMenu: 'MENUITEMS.APPS.LIST.ORDERS',
            ruta: '/crypto/orders',
            permisoPadreDto: 36,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
      {
        orden: 42,
        nombreMenu: 'MENUITEMS.APPS.LIST.INVOICES',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 43,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/invoices/list',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 44,
            nombreMenu: 'MENUITEMS.APPS.LIST.DETAILS',
            ruta: '/invoices/details',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 45,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
            ruta: '/invoices/create',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 43,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/invoices/list',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 44,
            nombreMenu: 'MENUITEMS.APPS.LIST.DETAILS',
            ruta: '/invoices/details',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 45,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
            ruta: '/invoices/create',
            permisoPadreDto: 42,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
      {
        orden: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.SUPPORTTICKETS',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tickets/list',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.TICKETDETAILS',
            ruta: '/tickets/details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.LISTVIEW',
            ruta: '/tickets/list',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.TICKETDETAILS',
            ruta: '/tickets/details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },

      {
        orden: 46,
        nombreMenu: 'MENUITEMS.APPS.LIST.NFTMARKETPLACE',
        permisoPadreDto: 8,
        permisoHijoListDto: [
          {
            orden: 47,
            nombreMenu: 'MENUITEMS.APPS.LIST.MARKETPLACE',
            ruta: '/marletplace/marketplace',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.EXPLORENOW',
            ruta: '/marletplace/explore',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.LIVEAUCTION',
            ruta: '/marletplace/auction',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.ITEMDETAILS',
            ruta: '/marletplace/item-details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.COLLECTIONS',
            ruta: '/marletplace/collections',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATORS',
            ruta: '/marletplace/creators',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.RANKING',
            ruta: '/marletplace/raking',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.WALLETCONNECT',
            ruta: '/marletplace/wallet',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.CREATENFT',
            ruta: '/marletplace/create',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
        ]
      },
          {
            orden: 48,
            nombreMenu: 'MENUITEMS.APPS.LIST.ITEMDETAILS',
            ruta: '/marletplace/item-details',
            permisoPadreDto: 46,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },

  {
    orden: 82,
    nombreMenu: 'MENUITEMS.PAGES.TEXT',
    icono: 'ri-pages-line',
    isCollapsed: true,
    permisoHijoListDto: [
      {
        orden: 83,
        nombreMenu: 'MENUITEMS.PAGES.LIST.STARTER',
        ruta: '/pages/starter',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 84,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PROFILE',
        permisoPadreDto: 82,
        permisoHijoListDto: [
          {
            orden: 85,
            nombreMenu: 'MENUITEMS.PAGES.LIST.SIMPLEPAGE',
            ruta: '/pages/profile',
            permisoPadreDto: 84,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 86,
            nombreMenu: 'MENUITEMS.PAGES.LIST.SETTINGS',
            ruta: '/pages/profile-setting',
            permisoPadreDto: 84,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
        ]
      },
      {
        orden: 87,
        nombreMenu: 'MENUITEMS.PAGES.LIST.TEAM',
        ruta: '/pages/team',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 88,
        nombreMenu: 'MENUITEMS.PAGES.LIST.TIMELINE',
        ruta: '/pages/timeline',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 89,
        nombreMenu: 'MENUITEMS.PAGES.LIST.FAQS',
        ruta: '/pages/faqs',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 90,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PRICING',
        ruta: '/pages/pricing',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 91,
        nombreMenu: 'MENUITEMS.PAGES.LIST.GALLERY',
        ruta: '/pages/gallery',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 92,
        nombreMenu: 'MENUITEMS.PAGES.LIST.MAINTENANCE',
        ruta: '/pages/maintenance',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 93,
        nombreMenu: 'MENUITEMS.PAGES.LIST.COMINGSOON',
        ruta: '/pages/coming-soon',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 94,
        nombreMenu: 'MENUITEMS.PAGES.LIST.SITEMAP',
        ruta: '/pages/sitemap',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 95,
        nombreMenu: 'MENUITEMS.PAGES.LIST.SEARCHRESULTS',
        ruta: '/pages/search-results',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 96,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PRIVACYPOLICY',
        ruta: '/pages/privacy-policy',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 97,
        nombreMenu: 'MENUITEMS.PAGES.LIST.TERMS&CONDITIONS',
        ruta: '/pages/terms-condition',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      }
    ]
  },
      {
        orden: 89,
        nombreMenu: 'MENUITEMS.PAGES.LIST.FAQS',
        ruta: '/pages/faqs',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 90,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PRICING',
        ruta: '/pages/pricing',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 91,
        nombreMenu: 'MENUITEMS.PAGES.LIST.GALLERY',
        ruta: '/pages/gallery',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 92,
        nombreMenu: 'MENUITEMS.PAGES.LIST.MAINTENANCE',
        ruta: '/pages/maintenance',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 93,
        nombreMenu: 'MENUITEMS.PAGES.LIST.COMINGSOON',
        ruta: '/pages/coming-soon',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 94,
        nombreMenu: 'MENUITEMS.PAGES.LIST.SITEMAP',
        ruta: '/pages/sitemap',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 95,
        nombreMenu: 'MENUITEMS.PAGES.LIST.SEARCHRESULTS',
        ruta: '/pages/search-results',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 96,
        nombreMenu: 'MENUITEMS.PAGES.LIST.PRIVACYPOLICY',
        ruta: '/pages/privacy-policy',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },
      {
        orden: 97,
        nombreMenu: 'MENUITEMS.PAGES.LIST.TERMS&CONDITIONS',
        ruta: '/pages/terms-condition',
        permisoPadreDto: 82,
        permisoHijoListDto: [],
        accion:'LISTAR'
      },

      {
        orden: 149,
        nombreMenu: 'MENUITEMS.CHARTS.TEXT',
        icono: 'ri-pie-chart-line',
        isCollapsed: false,
        permisoHijoListDto: [
          {
            orden: 150,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.APEXCHARTS',
            permisoPadreDto: 149,
            permisoHijoListDto: [
              {
                orden: 151,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.LINE',
                ruta: '/charts/apex-line',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 152,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.AREA',
                ruta: '/charts/apex-area',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 153,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.COLUMN',
                ruta: '/charts/apex-column',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 154,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BAR',
                ruta: '/charts/apex-bar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 155,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.MIXED',
                ruta: '/charts/apex-mixed',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 156,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TIMELINE',
                ruta: '/charts/apex-timeline',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 157,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RANGEAREA',
                ruta: '/charts/range-area',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 15,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.FUNNEL',
                ruta: '/charts/funnel',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 158,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.CANDLSTICK',
                ruta: '/charts/apex-candlestick',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 159,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BOXPLOT',
                ruta: '/charts/apex-boxplot',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 160,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BUBBLE',
                ruta: '/charts/apex-bubble',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 161,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.SCATTER',
                ruta: '/charts/apex-scatter',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 162,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.HEATMAP',
                ruta: '/charts/apex-heatmap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 163,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TREEMAP',
                ruta: '/charts/apex-treemap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 164,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.PIE',
                ruta: '/charts/apex-pie',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 165,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADIALBAR',
                ruta: '/charts/apex-radialbar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 166,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADAR',
                ruta: '/charts/apex-radar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 167,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.POLARAREA',
                ruta: '/charts/apex-polar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
            ]
          },
          {
            orden: 168,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.CHARTJS',
            ruta: '/charts/chartjs',
            permisoPadreDto: 149,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 169,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.ECHARTS',
            ruta: '/charts/echarts',
            permisoPadreDto: 149,
            permisoHijoListDto: [],
        accion:'LISTAR'
          }
        ]
      },
          {
            orden: 150,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.APEXCHARTS',
            permisoPadreDto: 149,
            isCollapsed: false,
            permisoHijoListDto: [
              {
                orden: 151,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.LINE',
                ruta: '/charts/apex-line',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 152,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.AREA',
                ruta: '/charts/apex-area',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 153,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.COLUMN',
                ruta: '/charts/apex-column',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 154,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BAR',
                ruta: '/charts/apex-bar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 155,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.MIXED',
                ruta: '/charts/apex-mixed',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 156,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TIMELINE',
                ruta: '/charts/apex-timeline',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 157,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RANGEAREA',
                ruta: '/charts/range-area',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 15,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.FUNNEL',
                ruta: '/charts/funnel',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 158,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.CANDLSTICK',
                ruta: '/charts/apex-candlestick',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 159,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BOXPLOT',
                ruta: '/charts/apex-boxplot',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 160,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BUBBLE',
                ruta: '/charts/apex-bubble',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 161,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.SCATTER',
                ruta: '/charts/apex-scatter',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 162,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.HEATMAP',
                ruta: '/charts/apex-heatmap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 163,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TREEMAP',
                ruta: '/charts/apex-treemap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 164,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.PIE',
                ruta: '/charts/apex-pie',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 165,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADIALBAR',
                ruta: '/charts/apex-radialbar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 166,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADAR',
                ruta: '/charts/apex-radar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 167,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.POLARAREA',
                ruta: '/charts/apex-polar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
            ]
          },
              {
                orden: 151,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.LINE',
                ruta: '/charts/apex-line',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 152,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.AREA',
                ruta: '/charts/apex-area',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 153,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.COLUMN',
                ruta: '/charts/apex-column',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 154,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BAR',
                ruta: '/charts/apex-bar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 155,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.MIXED',
                ruta: '/charts/apex-mixed',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 156,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TIMELINE',
                ruta: '/charts/apex-timeline',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 157,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RANGEAREA',
                ruta: '/charts/range-area',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 15,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.FUNNEL',
                ruta: '/charts/funnel',
                badge: {
                  variant: 'bg-success',
                  text: 'MENUITEMS.DASHBOARD.BADGE',
                },
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 158,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.CANDLSTICK',
                ruta: '/charts/apex-candlestick',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 159,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BOXPLOT',
                ruta: '/charts/apex-boxplot',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 160,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.BUBBLE',
                ruta: '/charts/apex-bubble',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 161,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.SCATTER',
                ruta: '/charts/apex-scatter',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 162,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.HEATMAP',
                ruta: '/charts/apex-heatmap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 163,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.TREEMAP',
                ruta: '/charts/apex-treemap',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 164,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.PIE',
                ruta: '/charts/apex-pie',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 165,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADIALBAR',
                ruta: '/charts/apex-radialbar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 166,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.RADAR',
                ruta: '/charts/apex-radar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
              {
                orden: 167,
                nombreMenu: 'MENUITEMS.CHARTS.LIST.POLARAREA',
                ruta: '/charts/apex-polar',
                permisoPadreDto: 150,
                permisoHijoListDto: [],
        accion:'LISTAR'
              },
          {
            orden: 168,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.CHARTJS',
            ruta: '/charts/chartjs',
            permisoPadreDto: 149,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
          {
            orden: 169,
            nombreMenu: 'MENUITEMS.CHARTS.LIST.ECHARTS',
            ruta: '/charts/echarts',
            permisoPadreDto: 149,
            permisoHijoListDto: [],
        accion:'LISTAR'
          },
]
