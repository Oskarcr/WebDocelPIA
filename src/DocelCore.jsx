import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Shopping from "./pages/Shopping.jsx";

const Pages = {
    Login,
    Shopping,
    Home,
    NotFound,
    ProductDetails
};

Object.freeze(Pages);

export { FinishType, OrderStatus, UserRole } from "./core/enums.js";
export { default as Theme } from "./core/theme.js";
export { Pages };