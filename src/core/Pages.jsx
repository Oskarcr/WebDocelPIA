// Exportaciones de paginas.

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Shopping from "../pages/Shopping.jsx";

/**
 * Es un objeto que tiene todas los componentes
 * que representan paginas.
 */
const Pages = {
    Home,
    Login,
    NotFound,
    Shopping,
    ProductDetails
};

Object.freeze(Pages);

export default Pages;