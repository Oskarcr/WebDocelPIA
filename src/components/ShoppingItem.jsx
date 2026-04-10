import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function ShoppingItem({ path = "", name = "", price = "", src = "" }) {
    return (<RouterLink className="item-card" to={path} style={{
            backgroundColor: Theme.BACKGROUND.MAIN,
            color: Theme.PRIMARY
        }}>
            <img className="item-image" src={src} style={{
                borderRadius: "8px"
            }}/>
            <Components.TextBox
                alignment="center"
                fontSize={FontSize.MD}
                color={Theme.PRIMARY}
                content={name + "\\n$" + price + "MXN"}
            />
    </RouterLink>);
}