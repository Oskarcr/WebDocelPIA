import { Components, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function Header({ inverted = false }) {
    const headerVars = (!inverted ? {} : {
        "--primary-color": Theme.BACKGROUND.MAIN,
        "--text-color-secondary": Theme.PRIMARY
    });
    return (<div className="header-wrapper" style={headerVars}>
        <div className="title-wrapper">
            DoCeL
        </div>
        <div className="buttons-wrapper">
            <RouterLink to="/" className="link-button">
                <Components.ButtonHeader name={"INICIO"}/>
            </RouterLink>
            <RouterLink to="/not_found" className="link-button">
                <Components.ButtonHeader name={"PEDIDOS"}/>
            </RouterLink>
            <RouterLink to="/shopping" className="link-button">
                <Components.ButtonHeader name={"MUEBLES"}/>
            </RouterLink>
            <RouterLink to="/not_found" className="link-button">
                <Components.ButtonHeader name={"PERFIL"}/>
            </RouterLink>
        </div>
    </div>);
}