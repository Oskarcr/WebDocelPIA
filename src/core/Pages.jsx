// Exportaciones de paginas.

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import NotFound from "../pages/NotFound.jsx";
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
    Signup
};

Object.freeze(Pages);

export default Pages;