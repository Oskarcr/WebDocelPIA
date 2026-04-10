import { Components, FontSize, Spacing, Theme } from "@/DocelCore";

export default function Home() {
    return (<Components.Main horizontal inverted>
        <Components.Flex column style={{
            minHeight: 0
        }}>
            <Components.Flex row>
                <Components.Column color={Theme.BLACK} />
                <Components.Flex column style={{
                    flexShrink: 0
                }}>
                    <Components.DimmedImage src="/furniture/background_home.png" style={{
                        width: "100%",
                        minHeight: "50%",
                        flexShrink: 0
                    }} childStyle={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "900px",
                        height: "100%",
                        marginInline: "auto",
                        position: "relative"
                    }} >
                        <Components.TextBox 
                            style={{
                                padding: Spacing.MD,
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
                        flex: 1,
                        display: "flex",
                        color: Theme.BLACK,
                        overflow: "auto"
                    }}>
                        <Components.TextBox 
                            fontSize={FontSize.MD} 
                            alignment="center" 
                            style={{
                                marginBlock: "auto",
                                width: "100%",
                                maxWidth: "900px",
                                marginInline: "auto"
                            }} 
                            content="
                            Somos un negocio de carpinteria totalmente transparente y profesional con años de
                            experiencia, que ofrece el envio de muebles desde nuestras instalaciones hasta la
                            comodidad de su hogar."
                        />
                    </div>
                </Components.Flex>
            </Components.Flex>
            <div className="home-footer-container">
                <Components.TextBox 
                    device="desktop"
                    fontSize={FontSize.MD} 
                    alignment="center" 
                    color={Theme.TEXT.SECONDARY} 
                    content="Contacto:"
                />
                <Components.TextBox 
                    alignment="bottom-left" 
                    color={Theme.TEXT.SECONDARY}
                    content="DOCEL@CORREO.COM"
                />
                <Components.TextBox 
                    alignment="bottom-left" 
                    color={Theme.TEXT.SECONDARY}
                    content="MTY. NL. AVENIDA 'LA AVENIDA' #00000"
                />
                <Components.TextBox 
                    alignment="bottom-left" 
                    color={Theme.TEXT.SECONDARY}
                    content="+52 000 000 0000"
                />
            </div>
        </Components.Flex>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}