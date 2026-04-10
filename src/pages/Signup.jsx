import { Components, FontSize, Spacing, Theme } from "@/DocelCore";

export default function Signup() {
    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
        <Components.Flex row style={{
            backgroundColor: Theme.BACKGROUND.MAIN
        }}>
            <Components.Flex column style={{
                backgroundColor: Theme.BACKGROUND.MAIN
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: Spacing.SM,
                    width: "80%",
                    maxWidth: "500px",
                    marginBlock: "auto",
                    marginInline: "auto",
                    boxSizing: "border-box",
                    gap: Spacing.MD,
                    overflow: "auto"
                }}>
                    <Components.TextBox 
                        fontSize={FontSize.MD}
                        content="REGISTRARSE EN DOCEL"
                    />
                    <input type="text" placeholder="Nombre"/>
                    <input type="number" placeholder="Telefono"/>
                    <input type="text" placeholder="Domicilio"/>
                    <input type="email" placeholder="Correo"/>
                    <input type="password" placeholder="Contraseña"/>
                    <button style={{
                        marginTop: Spacing.MD
                    }}>REGISTRARME</button>
                    <Components.TextBox 
                        content="Ya tengo cuenta" 
                        alignment="center"
                        href="/login"
                    />
                </div>
                <Components.Column color={Theme.ACCENT} horizontal/>
            </Components.Flex>
            
            <Components.DimmedImage 
            device="desktop"
            orientation="portrait" style={{
                height: "100%",
                width: "50%",
                padding: Spacing.MD,
                boxSizing: "border-box"
            }} childStyle={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }} src="https://www.shutterstock.com/image-photo/senior-carpenter-guides-woman-using-600nw-2585917355.jpg">
                <Components.TextBox
                    style={{
                        marginTop: "auto"
                    }}
                    color={Theme.TEXT.SECONDARY}
                    fontSize={FontSize.XL3}
                    content="COMIENZA\nCON\nNOSOTROS"
                />
                <Components.TextBox 
                    style={{
                        marginTop: "auto"
                    }}
                    fontSize={FontSize.SM}
                    alignment="center"
                    color={Theme.TEXT.SECONDARY}
                    content="CONSTRUYE CON NOSOTROS ENVIANDO MENSAJE AL +52 0000000000"
                />
            </Components.DimmedImage>
        </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}