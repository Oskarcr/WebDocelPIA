import { Pages } from "@/DocelCore";
import App from "../App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Pages.Home/>}/>
                <Route path="/not_found" element= {<Pages.NotFound/>}/>
                <Route path="/shopping" element={<Pages.Shopping/>}/>
                <Route path="/product_details" element={<Pages.ProductDetails/>}/>
                <Route path="/order_details" element={<Pages.OrderDetails/>}/>
                <Route path="/login" element={<Pages.Login/>}/>
                <Route path="/signup" element={<Pages.Signup/>}/>
                <Route path="/orders" element={<Pages.Orders/>}/>
                <Route path="/profile" element={<Pages.Profile/>}/>
                <Route path="/sales" element={<Pages.Sales/>}/>
            </Routes>
        </BrowserRouter>
    )
}