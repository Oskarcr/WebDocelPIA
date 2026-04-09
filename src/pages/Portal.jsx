import { Components, FontSize, Theme } from "@/DocelCore"

export default function Portal() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
            <Components.DimmedImage src="/furniture/background_home.png" style={{
                height: "100%",
                width: "35%",
            }} childStyle={{
                display: "flex",
                height: "100%",
                width: "100%"
            }}>
                <Components.TextBox
                    style={{
                        padding: "20px",
                        marginBlock: "auto"
                    }}
                    color={Theme.TEXT.SECONDARY}
                    fontSize={FontSize.XL3}
                    content="PORTAL\nDE\nAPLICACIÓN"
                    alignment="center-left"
                />
            </Components.DimmedImage>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "10%",
                alignItems: "center",
                marginTop: "5%",
                backgroundColor: Theme.BACKGROUND.MAIN
            }}>
                <Components.PortalCard path="/profile" title="Buscar usuario" hasInput>
                    <input placeholder="Nombre de usuario" style={{ width: "40%" }}></input>
                </Components.PortalCard>
                <Components.PortalCard path="/product_manager" title="Gestor de muebles"/>
                <Components.PortalCard path="/reports" title="Reporte de ventas"/>
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}