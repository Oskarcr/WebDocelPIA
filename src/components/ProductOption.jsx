import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function ProductOption({src="", name="", id=0}) {
    return (<RouterLink to={"/product_manager/" + id} className="product-manager-option">
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