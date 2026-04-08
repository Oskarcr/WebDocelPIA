// Exportaciones de paginas.

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import Orders from "../pages/Orders.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Profile from "../pages/Profile.jsx";
import Sales from "../pages/Sales.jsx";
import Shopping from "../pages/Shopping.jsx";
import Signup from "../pages/Signup.jsx";

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
    Sales
};

Object.freeze(Pages);

export default Pages;