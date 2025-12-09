export const GlobalComponent = {
    /* STORAGE KEYs */
    USER_KEY: 'currentUser',
    TOKEN_KEY: 'auth-token',
    headerToken : {'Authorization': `Bearer ${sessionStorage.getItem('token')}`},

    /* APP DETAILS */
    CODE_APP : "SIS-019",
    NAME_APP : "SIREVQUI",
    ADMIN_MENU:'Configuraciones',

    // Api Calling
    API_URL : 'https://api-node.themesbrand.website/',
    
    // Auth Api
    AUTH_API:"https://api-node.themesbrand.website/auth/",
    // AUTH_API:"http://127.0.0.1:3000/auth/",

    
    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',

    
    super_admin:{
        username:'faby25',
        password:'password',
        whatsApp:'+59172248669',
        email:'moralessfaby.dev@gmail.com'
    },
    contact_info:{
        phone: '(591) 4 4362771-72-73',
        email: 'gamqtdi@gmail.com',
        address: 'Mercado Martín Cárdenas, Planta Baja, Quillacollo'
    }
}