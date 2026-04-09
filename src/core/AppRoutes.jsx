import Pages from "./Pages.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function AppRoutes() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element= {<Pages.Home/>}/>
            <Route path="/shopping" element={<Pages.Shopping/>}/>
            <Route path="/product_details" element={<Pages.ProductDetails/>}/>
            <Route path="/order_details" element={<Pages.OrderDetails/>}/>
            <Route path="/login" element={<Pages.Login/>}/>
            <Route path="/signup" element={<Pages.Signup/>}/>
            <Route path="/orders" element={<Pages.Orders/>}/>
            <Route path="/profile" element={<Pages.Profile/>}/>
            <Route path="/employees" element={<Pages.Employees/>}/>
            <Route path="/sales" element={<Pages.Sales/>}/>
            <Route path="/portal" element={<Pages.Portal/>}/>
            <Route path="/reports" element={<Pages.Reports/>}/>
            
            <Route path="/product_manager/" element={<Pages.ProductManager/>}/>
            <Route path="/product_manager/:id" element={<Pages.ProductManager/>}/>
            {/* Cualquier pagina que no sea las de arriba */}
            <Route path="*" element= {<Pages.NotFound/>}/>
        </Routes>
    </BrowserRouter>);
}