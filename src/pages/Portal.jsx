import { Components, Theme } from "@/DocelCore"

export default function Portal() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
            <Components.DimmedImage src="/furniture/background_home.png" childStyle={{
                display: "flex",
                objectFit: "fill"
            }} style={{
                width: "25%"
            }} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "10%",
                alignItems: "center",
                marginTop: "5%",
                backgroundColor: Theme.BACKGROUND.MAIN
            }}>
                <Components.PortalCard title="Buscar usuario" hasInput>
                    <input placeholder="Nombre de usuario" style={{ width: "40%" }}></input>
                </Components.PortalCard>
                <Components.PortalCard title="Subir un mueble"/>
                <Components.PortalCard title="Reporte de ventas"/>
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}