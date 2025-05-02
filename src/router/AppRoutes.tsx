import { Route, Routes } from "react-router-dom"
import { Elements, Paths } from "./routes"
import AuthOutlet from "./outlets/AuthOutlet"
import BaseOutlet from "./outlets/BaseOutlet"
import MainMenuOutlet from "./outlets/MainMenuOutlet"
import SignUp from "../pages/auth/SignUp"
import Agenda from "../pages/agenda/Agenda"
import AgendaForm from "../pages/agenda/AgendaForm"
import AgendaCreate from "../pages/agenda/AgendaCreate"
import ForgottenPassword from "../pages/auth/ForgottenPassword"
import MagicLogin from "../pages/auth/MagicLogin"
import Website from "../pages/website/Website"
import ProductCreate from "../pages/warehouse/ProductCreate"
import ProductForm from "../pages/warehouse/ProductForm"
import WebsiteOutlet from "./outlets/WebsiteOutlet"
import WebsiteProduct from "../pages/website/WebsiteProduct"
import WebsiteService from "../pages/website/WebsiteService"
import WebsiteUs from "../pages/website/WebsiteUs"
import WebsiteProductDetail from "../pages/website/WebsiteProductDetail"
import WebsiteCart from "../pages/website/WebsiteCart"
import WebsitePayment from "../pages/website/WebsitePayment"
import WebsiteVoucher from "../pages/website/WebsiteVoucher"

const { Login, MainMenu, Products, Warehouse, WarehouseCreate, WarehouseForm, NotFound } = Elements

const AppRoutes = () => {
    return (
        <Routes>
            
            <Route element={ <WebsiteOutlet /> }>
                <Route path={Paths.Website} element={ <Website /> } />
                <Route path={Paths.WebsiteProduct} element={ <WebsiteProduct /> } />
                <Route path={Paths.WebsiteService} element={ <WebsiteService /> } />
                <Route path={Paths.WebsiteUs} element={ <WebsiteUs /> } />
                <Route path={Paths.WebsiteProductDetail} element={ <WebsiteProductDetail /> } />
                <Route path={Paths.WebsiteCart} element={ <WebsiteCart /> } />
                <Route path={Paths.WebsitePayment} element={ <WebsitePayment /> } />
                <Route path={Paths.WebsiteVoucher} element={ <WebsiteVoucher /> } />
            </Route>

            <Route element={ <MainMenuOutlet /> }>
                <Route path={Paths.MainMenu} element={ <MainMenu /> } />
            </Route>

            <Route element={ <BaseOutlet /> }>

                <Route path={Paths.Products} element={ <Products /> } />
                <Route path={Paths.ProductCreate} element={ <ProductCreate /> } />
                <Route path={Paths.ProductForm} element={ <ProductForm /> } />

                <Route path={Paths.Warehouse} element={ <Warehouse /> } />
                <Route path={Paths.WarehouseCreate} element={ <WarehouseCreate /> } />
                <Route path={Paths.WarehouseForm} element={ <WarehouseForm /> } />

                <Route path={Paths.Agenda} element={ <Agenda /> } />
                <Route path={Paths.AgendaForm} element={ <AgendaForm /> } />
                <Route path={Paths.AgendaCreate} element={ <AgendaCreate /> } />

            </Route>

            <Route element={ <AuthOutlet /> }>
                <Route path={Paths.Login} element={ <Login /> } />
                <Route path={Paths.SignUp} element={ <SignUp /> } />
                <Route path={Paths.ForgottenPassword} element={ <ForgottenPassword /> } />
                <Route path={Paths.MagicLogin} element={ <MagicLogin /> } />
            </Route>

            <Route path='*' element={ <NotFound /> } />
        </Routes>
    )
}

export default AppRoutes