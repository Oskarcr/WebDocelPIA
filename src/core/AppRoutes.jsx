import Pages from "./Pages.jsx";
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ minRole }) {
    const role = Number(localStorage.getItem("role"));

    if (!role) {
        return <Navigate to={"/login"} replace />
    }

    if (minRole && role < minRole) {
        return <Navigate to={"/shopping"} replace />
    }

    return <Outlet />
}

export default function AppRoutes() {
    return (<BrowserRouter>
        <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/signup" element={<Pages.Signup />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/shopping" element={<Pages.Shopping />} />

            <Route element={<ProtectedRoute minRole={1} />}>
                <Route path="/orders" element={<Pages.Orders />} />
                <Route path="/profile" element={<Pages.Profile />} />
                <Route path="/profile/:email" element={<Pages.Profile />} />
                <Route path="/product_details" element={<Pages.ProductDetails />} />
                <Route path="/product_details/:id" element={<Pages.ProductDetails />} />
                <Route path="/orders" element={<Pages.Orders />} />
                <Route path="/orders/pending" element={<Pages.Orders />} />
                <Route path="/orders/:id" element={<Pages.OrderDetails />} />
            </Route>

            <Route element={<ProtectedRoute minRole={1} />}>
                <Route path="/portal" element={<Pages.Portal />} />
                <Route path="/product_manager/" element={<Pages.ProductManager />} />
                <Route path="/product_manager/:id" element={<Pages.ProductManager />} />
                <Route path="/color_swatches" element={<Pages.ColorSwatches />} />
            </Route>

            <Route element={<ProtectedRoute minRole={1} />}>
                <Route path="/employees" element={<Pages.Employees />} />
                <Route path="/sales" element={<Pages.Sales />} />
                <Route path="/sales/:id" element={<Pages.Sales />} />
                <Route path="/reports" element={<Pages.Reports />} />
            </Route>

            {/* Cualquier pagina que no sea las de arriba */}
            <Route path="*" element={<Pages.NotFound />} />
        </Routes>
    </BrowserRouter>);
}