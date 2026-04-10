import { Components, FontSize, Spacing, Theme } from "@/DocelCore"

export default function Portal() {
    return (
        <Components.Main horizontal>
            <Components.DimmedImage orientation="portrait" src="/furniture/background_home.png" style={{
                width: "45%"
            }}childStyle={{
                display: "flex",
                height: "100%",
                width: "100%",
            }}>
                <Components.TextBox
                    style={{
                        padding: Spacing.SM,
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
                alignItems: "center",
                padding: Spacing.SM,
                backgroundColor: Theme.BACKGROUND.SURFACE
            }}>
                <div style={{
                    width: "85%",
                    marginTop: Spacing.LG,
                    marginBottom: "auto",
                    overflow: "hidden",
                    boxShadow: "var(--box-shadow)",
                    borderRadius: "8px",
                    backgroundColor: Theme.BACKGROUND.MAIN
                }}>
                    <Components.PortalCard path="/profile" title="Buscar usuario" hasInput>
                    <input placeholder="Usuario" style={{ width: "45%" }}></input>
                    </Components.PortalCard>
                    <Components.PortalCard path="/product_manager" title="Gestor de muebles"/>
                    <Components.PortalCard path="/reports" title="Reporte de ventas"/>
                </div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}