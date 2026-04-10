import { Components, FontSize, Spacing, Theme } from "@/DocelCore";
import Padding from "../core/Spacing";

export default function ProductDetails() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.ACCENT} />
            <div style={{
                flex: 1,
                backgroundColor: Theme.BACKGROUND.SURFACE
            }}>
                <Components.DimmedImage
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "35%",
                    }}
                    src="/furniture/sideboard2.png"
                />
                <Components.Flex column className="product-details-card-container">
                    <Components.TextBox
                        style={{
                            marginTop: Spacing.MD,
                        }}
                        color={Theme.TEXT.SECONDARY}
                        content="DETALLES DEL PRODUCTO"
                        fontSize={FontSize.XL1}
                    />
                    <div className="product-details-card" style={{
                        backgroundColor: Theme.BACKGROUND.MAIN,
                    }}>
                        <img src="/furniture/sideboard2.png"/>
                        <Components.Flex column style={{
                            padding: Spacing.MD,
                            boxSizing: "border-box",
                            gap: Spacing.SM
                        }}>
                            <Components.TextBox 
                                fontSize={FontSize.LG} 
                                color={Theme.PRIMARY} 
                                content="Mueble de madera bonito\nPrecio: 4500MXN\nAcabado: laca"
                            />
                            <input style={{
                                marginTop: "auto"
                            }} type="text" placeholder="Color"/>
                            <button>Agregar</button>
                        </Components.Flex>
                    </div>
                </Components.Flex> 
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}