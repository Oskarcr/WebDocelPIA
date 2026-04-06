import { Components, Theme } from "@/DocelCore";

export default function Login() {
    return(<>
        <link rel="stylesheet" href="css/login.css"/>
        <div style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: Theme.BACKGROUND.MAIN,
            width: "100%",
            height: "100%"
        }}>
            <Components.Column color={Theme.BLACK}/>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "row"
            }}>   
                <Components.DimmedImage style={{
                    width: "50%",
                    display: "flex"
                }} childStyle={{
                    color: Theme.TEXT.SECONDARY,
                    fontSize: "5.2rem",
                    padding: "20px",
                    boxSizing: "border-box",
                    marginBlock: "auto"
                }} src="https://images.homify.com/v1461159094/p/photo/image/1468444/20151118_131941_resized.jpg">
                    EMPIEZA <br/> 
                    A <br/> 
                    DECORAR <br/> 
                    TU HOGAR
                </Components.DimmedImage>
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
                            color={Theme.BLACK}
                            fontSize="1.5rem"
                            alignment="center-left" 
                            content="INICIAR SESION EN DOCEL"
                        />
                        <input type="email" placeholder="Correo electronico"/>
                        <input type="password" placeholder="Contraseña"/>
                        <button style={{
                            marginTop: "20px"
                        }}>INICIAR SESION</button>
                        <Components.TextBox 
                            fontSize="1.2rem"
                            color={Theme.BLACK}
                            alignment="center" 
                            content="¿No tienes cuenta?"
                        />
                    </div>
                    <Components.Column style={{
                        marginTop: "auto"
                    }} color={Theme.BLACK} horizontal/>
                </div>
            </div>
            <Components.Column color={Theme.SECONDARY}/>
        </div>
    </>);
}