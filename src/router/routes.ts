import { lazy } from 'react'

export const Elements = {
    Login: lazy(() => import('../pages/auth/Login')),
    SignUp: lazy(() => import('../pages/auth/SignUp')),
    ForgottenPassword: lazy(() => import('../pages/auth/ForgottenPassword')),
    MagicLogin: lazy(() => import('../pages/auth/MagicLogin')),
    
    MainMenu: lazy(() => import('../pages/mainmenu/MainMenu')),
    
    Products: lazy(() => import('../pages/warehouse/Products')),
    ProductCreate: lazy(() => import('../pages/warehouse/ProductCreate')),
    productForm: lazy(() => import('../pages/warehouse/ProductForm')),

    Warehouse: lazy(() => import('../pages/warehouse/Warehouse')),
    WarehouseCreate: lazy(() => import('../pages/warehouse/WarehouseCreate')),
    WarehouseForm: lazy(() => import('../pages/warehouse/WarehouseForm')),
    
    Agenda: lazy(() => import('../pages/agenda/Agenda')),
    AgendaForm: lazy(() => import('../pages/agenda/AgendaForm')),
    AgendaCreate: lazy(() => import('../pages/agenda/AgendaCreate')),

    Website: lazy(() => import('../pages/website/Website')),
    WebsiteProduct: lazy(() => import('../pages/website/WebsiteProduct')),
    WebsiteProductDetail: lazy(() => import('../pages/website/WebsiteProductDetail')),
    WebsiteService: lazy(() => import('../pages/website/WebsiteService')),
    WebsiteUs: lazy(() => import('../pages/website/WebsiteUs')),
    WebsiteCart: lazy(() => import('../pages/website/WebsiteCart')),

    NotFound: lazy(() => import('../pages/NotFound')),
}

export const Paths = {    
    Login: '/login',
    SignUp: '/signup',
    ForgottenPassword: '/forgottenpassword',
    MagicLogin: '/magiclogin',

    MainMenu: '/mainmenu',
    
    Products: '/products',
    ProductCreate: '/productcreate',
    ProductForm: '/products/:id',

    Warehouse: '/warehouse',
    WarehouseCreate: '/warehousecreate',
    WarehouseForm: '/warehouse/:id',

    Agenda: '/agenda',
    AgendaForm: '/agenda/:id',
    AgendaCreate: '/agendacreate',

    Website: '/',
    WebsiteProduct: '/websiteproduct',
    WebsiteProductDetail: '/websiteproduct/:id',
    WebsiteService: '/websiteservice',
    WebsiteUs: '/websiteseus',
    WebsiteCart: '/websitecart',
}