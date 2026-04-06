import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Shopping from "./pages/Shopping.jsx";

const Pages = {
    Login,
    Shopping,
    Home,
    NotFound
};

Object.freeze(Pages);

export { FinishType, OrderStatus, UserRole } from "./core/enums.js";
export { default as Theme } from "./core/theme.js";
export { Pages };