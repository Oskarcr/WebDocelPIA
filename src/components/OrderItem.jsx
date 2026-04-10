import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function OrderItem({ path = "", src = "", name = "", color = "", price = "" }) {
    return (
        <RouterLink className="order-item-card" to={path} style={{
            borderColor: Theme.PRIMARY,
            backgroundColor: Theme.BACKGROUND.MAIN,
            color: Theme.TEXT.SECONDARY,
        }}>
            <div style={{
                flex: 1,
                aspectRatio: 1/1
            }}>
                <img className="order-item-image" src={src} style={{
                    width: "100%",
                    height: "100%",
                }} />
            </div>
            <div style={{
                width: "40%"
            }}>
                <Components.TextBox className="order-item-name" fontSize={FontSize.MD} content={name} color={Theme.PRIMARY} />
                <Components.TextBox className="order-item-color" fontSize={FontSize.MD} content={color} color={Theme.PRIMARY} />
            </div>
            <Components.TextBox className="order-item-price" fontSize={FontSize.MD} content={"$" + price + " MXN"} alignment="top-right" color={Theme.PRIMARY} style={{ width: "40%" }} />
        </RouterLink>
    );
}