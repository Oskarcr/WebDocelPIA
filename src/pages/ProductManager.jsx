import { Components, FontSize, Theme } from "@/DocelCore";

export default function ProductManager() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
            <Components.DimmedImage src="/furniture/background_order.png" style={{
                flex: 1,
                justifyItems: "center"
            }} childStyle={{
                position: "relative",
                width: "100%",
                height: "100%"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginInline: "auto",
                    maxWidth: "800px",
                    width: "80%",
                    height: "100%"
                }}>
                    <Components.TextBox
                        content="GESTOR DE MUEBLE"
                        fontSize={FontSize.XL1}
                        color={Theme.TEXT.SECONDARY}
                        alignment="center-left"
                        style={{
                            height: "15%"
                        }} />
                    <Components.Flex column style={{
                        width: "100%",
                        flex: "unset",
                        gap: "20px",
                        boxSizing: "border-box",
                        padding: "20px",
                        borderRadius: "8px",
                        backgroundColor: Theme.BACKGROUND.MAIN
                    }}>
                        <input placeholder="Nombre del mueble" />
                        <input placeholder="Tipo de acabado" />
                        <input placeholder="Precio del mueble" />
                        <button>SUBIR IMAGEN</button>
                        <button>ACEPTAR</button>
                    </Components.Flex>
                </div>
            </Components.DimmedImage>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}