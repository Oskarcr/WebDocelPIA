import { Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function ShoppingItem({ path = "", name = "", price = "", src = "" }) {
    return (
        <RouterLink className="item-card" to={path} style={{
                backgroundColor: Theme.PRIMARY,
                borderRadius: "8px",
                color: Theme.TEXT.SECONDARY
            }}>
                <img className="item-image" src={src} style={{borderRadius: "8px",}}/>
                <h3 className="item-name">{name}</h3>
                <span className="item-price">${price}MXN</span>
        </RouterLink>
    );
}