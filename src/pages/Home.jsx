import { Components, Theme } from "@/DocelCore";

export default function Home() {
    return (
        <Components.Main horizontal inverted>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                <div style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                }}>
                    <Components.Column color={Theme.BLACK} />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}>
                        <Components.DimmedImage src="/furniture/background_home.png" childStyle={{
                            width: "100%",
                            height: "100%"
                        }} style={{
                            width: "100%",
                            height: "60%"
                        }}>
                        </Components.DimmedImage>
                        <div style={{
                            height: "40%",
                            display: "flex",
                            color: Theme.BLACK,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Components.TextBox fontSize={"1.8rem"} alignment="center" style={{
                                width: "70%"
                            }} content="
                            Somos un negocio de carpinteria totalmente transparente y profesional con años de
                            experiencia, que ofrece el envio de muebles desde nuestras instalaciones hasta la
                            comodidad de su hogar."></Components.TextBox>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    width: "100%",
                    height: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "3rem",
                    backgroundColor: Theme.PRIMARY
                }}>
                    <div style={{
                        width: "20%"
                    }}>
                        <Components.TextBox fontSize={"2rem"} alignment="center" color={Theme.TEXT.SECONDARY} content="Contacto:"/>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "80%",
                    }}>
                        <div style={{
                            width: "100%",
                            height: "50%",
                            display: "flex",
                            }}>
                            <Components.TextBox fontSize={"1rem"} alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                                width: "30%"
                            }} content="CORREO"/>
                            <Components.TextBox fontSize={"1rem"} alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                                width: "40%"
                            }} content="Ubicacion"/>
                            <Components.TextBox fontSize={"1rem"} alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                                width: "30%"
                            }} content="Telefono"/>
                        </div>
                        <div style={{
                            width: "100%",
                            height: "50%",
                            display: "flex",
                            }}>
                            <Components.TextBox fontSize={"1rem"} color={Theme.TEXT.SECONDARY} style={{
                                width: "30%"
                            }} content="DOCEL@CORREO.COM"/>
                            <Components.TextBox fontSize={"1rem"} alignment="top-left" color={Theme.TEXT.SECONDARY} style={{
                                width: "40%"
                            }} content="MTY. NL. AVENIDA 'LA AVENIDA' #00000"/>
                            <Components.TextBox fontSize={"1rem"} color={Theme.TEXT.SECONDARY} style={{
                                width: "30%"
                            }} content="+52 000 000 0000"/>
                        </div>
                    </div>
                </div>
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}