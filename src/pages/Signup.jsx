import { Components, FontSize, Theme } from "@/DocelCore";

export default function Signup() {
    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            backgroundColor: Theme.BACKGROUND.MAIN
        }}>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                backgroundColor: Theme.BACKGROUND.MAIN
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    width: "80%",
                    maxWidth: "500px",
                    marginBlock: "auto",
                    marginInline: "auto",
                    boxSizing: "border-box",
                    gap: "20px"
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
                        marginTop: "20px"
                    }}>REGISTRARME</button>
                    <Components.TextBox 
                        content="Ya tengo cuenta" 
                        alignment="center"
                        href="/login"
                    />
                </div>
                <Components.Column color={Theme.ACCENT} horizontal/>
            </div>
            
            <Components.DimmedImage style={{
                height: "100%",
                width: "50%",
                padding: "20px",
                boxSizing: "border-box"
            }} childStyle={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }} src="https://www.shutterstock.com/image-photo/senior-carpenter-guides-woman-using-600nw-2585917355.jpg">
                <div style={{
                    marginTop: "auto"
                }}></div>
                <div style={{
                    fontSize: FontSize.XL3
                }}>
                    COMIENZA <br/> 
                    A <br/> 
                    TRANSFORMAR <br/> 
                    TU HOGAR
                </div>
                <Components.TextBox 
                    style={{
                        marginTop: "auto"
                    }}
                    fontSize={FontSize.MD}
                    alignment="center"
                    color={Theme.TEXT.SECONDARY}
                    content="CONSTRUYE CON NOSOTROS ENVIANDO MENSAJE AL +52 0000000000"
                />
            </Components.DimmedImage>
        </div>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}