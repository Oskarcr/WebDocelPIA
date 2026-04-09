import { Components, Theme } from "@/DocelCore";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

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
            height: "100px",
            fontSize: "1.5rem",
            color: "var(--primary-color)"
        }}>
            {name}
        </RouterLink>)
    }
}

export default function Header({ inverted = false }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const headerVars = (!inverted ? {} : {
        "--primary-color": Theme.BACKGROUND.MAIN,
        "--text-color-secondary": Theme.PRIMARY
    });
    return (<div className="header-wrapper" style={headerVars}>
        <div className="title-wrapper">
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
                {menuVisible && (
                    <div style={{
                        padding: "20px",
                        boxSizing: "border-box",
                        top: "100%",
                        right: "0",
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        width: "100vw",
                        backgroundColor: "var(--text-color-secondary)",
                        boxShadow: "var(--box-shadow)"
                    }}>
                        <ButtonLink path="/" name="INICIO"/>
                        <ButtonLink path="/orders" name="PEDIDOS"/>
                        <ButtonLink path="/shopping" name="MUEBLES"/>
                        <ButtonLink path="/profile" name="PERFIL"/>
                    </div>
                )}
            </div>
        </div>
    </div>);
}