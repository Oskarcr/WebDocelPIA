import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";
import Flex from "../components/Flex";

export default function ProductDetails() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.ACCENT} />
            <div className="product-wrapper" style={{
                display: "flex",
                flex: 1,
                background: "red"
            }}>
                <div className="product-card" style={{
                    display: "flex",
                    aspectRatio: "16/9",
                    minHeight: "200px",
                    width: "60%",
                    margin: "auto",
                    backgroundColor: "var(--primary-color)",
                    boxSizing: "border-box",
                    border: "var(--border-medium) solid"
                }}></div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}