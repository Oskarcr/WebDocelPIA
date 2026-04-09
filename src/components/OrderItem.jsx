import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function OrderItem({ path = "", src = "", name = "", color = "", price = "" }) {
    return (
        <RouterLink className="order-item-card" to={path} style={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            height: "180px",
            border: "3px solid" + Theme.PRIMARY,
            backgroundColor: Theme.BACKGROUND.MAIN,
            color: Theme.TEXT.SECONDARY,
        }}>
            <div style={{
                width: "300px",
                aspectRatio: 4 / 3
            }}>
                <img className="order-item-image" src={src} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }} />
            </div>
            <div style={{
                flex: "33%"
            }}>
                <Components.TextBox className="order-item-name" fontSize={FontSize.LG} content={name} color={Theme.PRIMARY} />
                <Components.TextBox className="order-item-color" fontSize={FontSize.LG} content={color} color={Theme.PRIMARY} />
            </div>
            <Components.TextBox className="order-item-price" fontSize={FontSize.LG} content={"$" + price + " MXN"} alignment="top-right" color={Theme.PRIMARY} style={{ width: "33%" }} />
        </RouterLink>
    );
}