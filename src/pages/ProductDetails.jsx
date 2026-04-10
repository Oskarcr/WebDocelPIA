import { Components, FontSize, Spacing, Theme } from "@/DocelCore";
import Padding from "../core/Spacing";

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
                    minWidth: "600px",
                    width: "55%",
                    margin: "auto",
                    backgroundColor: Theme.BACKGROUND.MAIN,
                    boxSizing: "border-box",
                    border: "var(--border-medium) solid" + Theme.PRIMARY,
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <img src="/furniture/sideboard2.png"/>
                    <div className="product-information" style={{
                        flex: 1,
                        display: "flex",
                        gap: Spacing.SM
                    }}>
                        <Components.TextBox fontSize={FontSize.MD} color={Theme.PRIMARY} content="Mueble de madera bonito"/>
                        <Components.TextBox fontSize={FontSize.MD} color={Theme.PRIMARY} content="Precio: 4500MXN"/>
                        <Components.TextBox fontSize={FontSize.MD} color={Theme.PRIMARY} content="Acabado: laca"/>
                        <div style={{
                            marginInline: Spacing.MD,
                            marginTop: "auto",
                            marginBottom: Spacing.MD,
                            border: "2px solid " + Theme.PRIMARY,
                            borderRadius: "8px"
                        }}>
                            <Components.TextBox fontSize={FontSize.MD} color={Theme.PRIMARY} content="Color"/>
                        </div>
                        <button style={{
                            marginInline: Spacing.MD,
                            marginBottom: Spacing.MD
                            }}>Agregar</button>
                    </div>
                </div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}