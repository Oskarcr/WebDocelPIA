import { Components, FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

export default function ProductDetails() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.ACCENT} />
            <div style={{
                flex: 1,
                backgroundColor: Theme.BACKGROUND.SURFACE,
                position: "relative",
            }}>
                <Components.DimmedImage src="furniture/background_product.png" childStyle={{
                    width: "100%",
                    height: "100%"
                }}
                    style={{
                        width: "100%",
                        height: "35%",
                        top: 0,
                        left: 0,
                        position: "absolute",
                    }}>
                    <Components.TextBox
                        content="DETALLES DEL PRODUCTO"
                        color={Theme.TEXT.SECONDARY}
                        fontSize={FontSize.XL1}
                        alignment="center"
                        style={{
                            boxSizing: "border-box",
                            width: "65%",
                            height: "50%",
                            marginInline: "auto"
                        }}
                    />
                </Components.DimmedImage>
                <div id="product-wrapper">
                    <div id="product-card" style={{
                        backgroundColor: Theme.BACKGROUND.MAIN,
                        borderColor: Theme.PRIMARY
                    }}>
                        <div className="product-image">
                            <img src="furniture/bed_base.png" className="image"></img>
                        </div>
                        <div className="product-information">
                            <div className="product">
                                <Components.TextBox content="Mueble de madera bonito" color={Theme.PRIMARY} fontSize="28px" />
                                <Components.TextBox content="Precio: 800MXN" color={Theme.PRIMARY} fontSize="28px" />
                                <Components.TextBox content="Acabado: Laca" color={Theme.PRIMARY} fontSize="28px" />
                                <div className="product-color" style={{
                                    backgroundColor: Theme.BACKGROUND.MAIN,
                                    color: Theme.PRIMARY
                                }}>Color</div>
                            </div>
                            <RouterLink>
                                <button className="add-product">Agregar</button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}