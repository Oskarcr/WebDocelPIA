import { Components, FontSize, Theme } from "@/DocelCore";

export default function Home() {
    return (<Components.Main horizontal inverted>
        <Components.Flex column>
            <Components.Flex row>
                <Components.Column color={Theme.BLACK} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%"
                }}>
                    <Components.DimmedImage src="/furniture/background_home.png" style={{
                        width: "100%",
                        height: "50%"
                    }} childStyle={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        maxWidth: "900px",
                        minWidth: "800px",
                        height: "100%",
                        marginInline: "auto",
                        position: "relative"
                    }} >
                        <Components.TextBox 
                            style={{
                                marginTop: "auto"
                            }}
                            color={Theme.TEXT.SECONDARY}
                            fontSize={FontSize.LG}
                            content="CARPINTERIA Y PINTURA"
                        />
                        <Components.TextBox 
                            style={{
                                marginBottom: "auto"
                            }}
                            color={Theme.TEXT.SECONDARY}
                            fontSize={FontSize.XL3}
                            content="TUS DISEÑOS FAVORITOS EN TU ESPACIO"
                        />
                    </Components.DimmedImage>
                    <div style={{
                        height: "40%",
                        display: "flex",
                        color: Theme.BLACK,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Components.TextBox fontSize={FontSize.LG} alignment="center" style={{
                            width: "70%"
                        }} content="
                        Somos un negocio de carpinteria totalmente transparente y profesional con años de
                        experiencia, que ofrece el envio de muebles desde nuestras instalaciones hasta la
                        comodidad de su hogar."></Components.TextBox>
                    </div>
                </div>
            </Components.Flex>
            <div style={{
                display: "flex",
                width: "100%",
                height: "100px",
                justifyContent: "center",
                alignItems: "center",
                gap: FontSize.XL2,
                backgroundColor: Theme.PRIMARY
            }}>
                <div style={{
                    width: "20%"
                }}>
                    <Components.TextBox fontSize={FontSize.MD} alignment="center" color={Theme.TEXT.SECONDARY} content="Contacto:"/>
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
                        <Components.TextBox alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                            width: "30%"
                        }} content="CORREO"/>
                        <Components.TextBox alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                            width: "40%"
                        }} content="UBICACION"/>
                        <Components.TextBox alignment="bottom-left" color={Theme.TEXT.SECONDARY} style={{
                            width: "30%"
                        }} content="TELEFONO"/>
                    </div>
                    <div style={{
                        width: "100%",
                        height: "50%",
                        display: "flex",
                        }}>
                        <Components.TextBox color={Theme.TEXT.SECONDARY} style={{
                            width: "30%"
                        }} content="DOCEL@CORREO.COM"/>
                        <Components.TextBox alignment="top-left" color={Theme.TEXT.SECONDARY} style={{
                            width: "40%"
                        }} content="MTY. NL. AVENIDA 'LA AVENIDA' #00000"/>
                        <Components.TextBox color={Theme.TEXT.SECONDARY} style={{
                            width: "30%"
                        }} content="+52 000 000 0000"/>
                    </div>
                </div>
            </div>
        </Components.Flex>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}