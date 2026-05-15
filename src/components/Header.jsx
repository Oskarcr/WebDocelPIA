import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function ButtonLink({desktop = false, path = "/", name="ANY"}) {
    if(desktop) {
        return (<RouterLink to={path} className="link-button" data-device="desktop">
            <Components.ButtonHeader name={name}/>
        </RouterLink>);
    }
    else {
        return (<RouterLink to={path} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "100%",
            height: "70px",
            fontSize: FontSize.MD,
            color: "var(--primary-color)"
        }}>
            {name}
        </RouterLink>)
    }
}

export default function Header({ inverted = false }) {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const headerVars = (!inverted ? {} : {
        "--primary-color": Theme.BACKGROUND.MAIN,
        "--text-color-secondary": Theme.PRIMARY
    });

    const onPortal = () => {
        navigate("/portal");
    }

    return (<div className="header-wrapper" style={headerVars}>
        <div className="title-wrapper" style={{
            cursor: "pointer"
        }} onClick={onPortal}>
            DoCeL
        </div>
        <div className="buttons-wrapper">
            <ButtonLink path="/" name="INICIO" desktop/>
            <ButtonLink path="/orders" name="PEDIDOS" desktop/>
            <ButtonLink path="/shopping" name="MUEBLES" desktop/>
            <ButtonLink path="/profile" name="PERFIL" desktop/>

            <div data-device="mobile" style={{
                display: "flex",
                flexDirection: "row"
            }} onClick={() => setMenuVisible(!menuVisible)}>
                <Components.ButtonHeader name="MENU" />
                <div id="header-menu-container" style={{
                    width: menuVisible ? "100vw" : 0,
                    paddingInline: menuVisible ? Spacing.MD : 0
                }}>
                    <ButtonLink path="/" name="INICIO"/>
                    <ButtonLink path="/orders" name="PEDIDOS"/>
                    <ButtonLink path="/shopping" name="MUEBLES"/>
                    <ButtonLink path="/profile" name="PERFIL"/>
                </div>
            </div>
        </div>
    </div>);
}