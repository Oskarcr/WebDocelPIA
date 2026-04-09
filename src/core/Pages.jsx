// Exportaciones de paginas.

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Orders from "../pages/Orders.jsx";
import OrderDetails from "../pages/OrderDetails.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Profile from "../pages/Profile.jsx";
import Sales from "../pages/Sales.jsx";
import Shopping from "../pages/Shopping.jsx";
import Signup from "../pages/Signup.jsx";
import Employees from "../pages/Employees.jsx";
import Portal from "../pages/Portal.jsx";

/**
 * Es un objeto que tiene todas los componentes
 * que representan paginas.
 */
const Pages = {
    Home,
    Login,
    NotFound,
    Shopping,
    Signup,
    ProductDetails,
    Orders,
    Profile,
    Sales,
    OrderDetails,
    Employees,
    Portal
};

Object.freeze(Pages);

export default Pages;