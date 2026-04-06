import { Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function ShoppingItem({ index = "", name = "", price = "", src = "" }) {
    return (
        <RouterLink id={index}>
            <div className="item-card" style={{
                backgroundColor: Theme.PRIMARY,
                color: Theme.TEXT.SECONDARY
            }}>
                <img className="item-image" src={src} />
                <h3 className="item-name">{name}</h3>
                <span className="item-price">${price}MXN</span>
            </div>
        </RouterLink>
    );
}