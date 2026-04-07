import { Components } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
    return (<div className="header-wrapper">
        <div className="title-wrapper">
            DoCeL
        </div>
        <div className="buttons-wrapper">
            <RouterLink to="/" className="link-button">
                <Components.ButtonHeader className="header-button" name={"INICIO"}/>
            </RouterLink>
            <RouterLink to="/not_found" className="link-button">
                <Components.ButtonHeader className="header-button" name={"PEDIDOS"}/>
            </RouterLink>
            <RouterLink to="/shopping" className="link-button">
                <Components.ButtonHeader className="header-button" name={"MUEBLES"}/>
            </RouterLink>
            <RouterLink to="/not_found" className="link-button">
                <Components.ButtonHeader className="header-button" name={"PERFIL"}/>
            </RouterLink>
        </div>
    </div>);
}