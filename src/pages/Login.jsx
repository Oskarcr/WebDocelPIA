import { Components, FontSize, Theme } from "@/DocelCore";

export default function Login() {
    return(<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
        <Components.Flex row>   
            <Components.DimmedImage style={{
                width: "50%",
                display: "flex"
            }} childStyle={{
                color: Theme.TEXT.SECONDARY,
                fontSize: FontSize.XL3,
                padding: "20px",
                boxSizing: "border-box",
                marginBlock: "auto"
            }} src="https://images.homify.com/v1461159094/p/photo/image/1468444/20151118_131941_resized.jpg">
                EMPIEZA <br/> 
                A <br/> 
                DECORAR <br/> 
                TU HOGAR
            </Components.DimmedImage>
            <Components.Flex column style={{
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
                        color={Theme.BLACK}
                        fontSize={FontSize.MD}
                        alignment="center-left" 
                        content="INICIAR SESION EN DOCEL"
                    />
                    <input type="email" placeholder="Correo electronico"/>
                    <input type="password" placeholder="Contraseña"/>
                    <button style={{
                        marginTop: "20px"
                    }}>INICIAR SESION</button>
                    <Components.TextBox 
                        fontSize={FontSize.SM}
                        color={Theme.BLACK}
                        alignment="center" 
                        content="¿No tienes cuenta?"
                        href="/signup"
                    />
                </div>
                <Components.Column style={{
                    marginTop: "auto"
                }} color={Theme.BLACK} horizontal/>
            </Components.Flex>
        </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}