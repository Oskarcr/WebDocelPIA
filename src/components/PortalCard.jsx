import { Components, FontSize, Spacing, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function PortalCard({ title = "", path = "", style = {}, hasInput = false, children }) {
    return (
        <RouterLink className="portal-item" to={path} style={{
            borderColor: Theme.PRIMARY,
            backgroundColor: Theme.BACKGROUND.SURFACE,
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
            ...style
        }}>
            <Components.TextBox fontSize={FontSize.MD} alignment="center-left" color={Theme.PRIMARY} content={title} style={{width: hasInput ? "45%" : "90%"}}/>
            {children}
            <Components.TextBox fontSize={FontSize.MD} alignment="center-right" color={Theme.PRIMARY} content=">" style={{
                width: "10%",
                padding: Spacing.MD
                }}/>
        </RouterLink>
    )
}