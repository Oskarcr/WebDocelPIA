import { Components, Theme } from "@/DocelCore";

export default function Home() {
    return (
        <Components.Main horizontal>
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
                    <Components.Column color={Theme.BLACK}/>
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
                            display: "flex",
                            color: Theme.BLACK,
                            justifyContent: "center",
                            alignItems: "center"
                            }}>
                            <Components.TextBox fontSize={32} alignment="center" style={{
                                width: "70%"
                            }}content="
                            Somos un negocio de carpinteria totalmente transparente y profesional con años de
                            experiencia, que ofrece el envio de muebles desde nuestras instalaciones hasta la
                            comodidad de su hogar."></Components.TextBox>
                        </div>
                    </div>
                </div>
                <Components.TextBox style={{
                    width: "100%",
                    height: "100px",
                    backgroundColor: Theme.PRIMARY
                }} />
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>


        // <Components.Main horizontal>
        //     <Components.Column color={Theme.BLACK}/>
        //     <div style={{
        //         flex: 1,
        //         position: "relative",
        //         backgroundColor: Theme.BACKGROUND.MAIN
        //     }}>
        //         <Components.DimmedImage src="/furniture/background_home.png" childStyle={{
        //             display: "flex",
        //             flexDirection: "column",
        //             width: "70%",
        //             height: "100%",
        //             justifyContent: "center",
        //             alignItems: "start",
        //             marginInline: "auto"
        //         }}
        //             style={{
        //                 width: "100%",
        //                 height: "60%",
        //                 justifyContent: "center"
        //             }}>
        //             <Components.TextBox content="CARPINTERIA Y PINTURA" color={Theme.TEXT.SECONDARY} fontSize={48}/>
        //             <Components.TextBox content="TUS DISEÑOS FAVORITOS" color={Theme.TEXT.SECONDARY} fontSize={80}/>
        //             <Components.TextBox content="EN TU ESPACIO" color={Theme.TEXT.SECONDARY} fontSize={80} style={{ marginBottom: "auto"}}/>
        //         </Components.DimmedImage>
        //             <Components.TextBox fontSize={32} alignment="center" style={{
        //                 width: "75%",
        //                 height: "calc(40% - 60px)",
        //                 marginInline: "auto"
        //             }} content="
        //         Somos un negocio de carpinteria totalmente transparente y profesional con años de
        //         experiencia, que ofrece el envio de muebles desde nuestras instalaciones hasta la
        //         comodidad de su hogar."/>
        //         <Components.Column horizontal color={Theme.PRIMARY}>
        //             <Components.TextBox content="Contacto:"/>
        //             <Components.TextBox content="Correo"/>
        //             <Components.TextBox content="Ubicacion"/>
        //             <Components.TextBox content="Telefono"/>
        //         </Components.Column>
        //     </div>
        //     <Components.Column color={Theme.ACCENT} />
        // </Components.Main>
    )
}