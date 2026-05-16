import { Components, FontSize, Theme } from "@/DocelClient";
import { Link as RouterLink } from "react-router-dom";

export default function ProductOption({
    src = "", 
    name = "", 
    onClick,
}) {
    return (<RouterLink onClick={onClick} className="product-manager-option">
        <img src={src} style={{
            width: "25%"
        }}/>
        <Components.TextBox
            style={{
                height: "100%"
            }}
            alignment="center-left"
            fontSize={FontSize.MD}
            color={Theme.PRIMARY} 
            content={name}
        />
    </RouterLink>);
}