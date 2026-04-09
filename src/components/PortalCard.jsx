import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function PortalCard({ title = "", path = "", style = {}, hasInput = false, children }) {
    return (
        <RouterLink to={path} style={{
            display: "flex",
            width: "80%",
            height: "15%",
            border: "3px solid " + Theme.PRIMARY,
            boxSizing: "border-box",
            alignItems: "center",
            backgroundColor: Theme.BACKGROUND.SURFACE,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
            ...style
        }}>
            <Components.TextBox fontSize={FontSize.MD} alignment="center-left" color={Theme.PRIMARY} content={title} style={{width: hasInput ? "30%" : "50%"}}/>
            {children}
            <Components.TextBox fontSize={FontSize.MD} alignment="center-right" color={Theme.PRIMARY} content=">" style={{
                width: hasInput ? "30%" : "50%",
                marginRight: "5%"
                }}/>
        </RouterLink>
    )
}