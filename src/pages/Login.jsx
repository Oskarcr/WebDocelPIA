import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";

async function handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    try {
        const res = await axios.post("/api/auth/login", {
            email: formData.get("email"),
            password: formData.get("password")
        });
        
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("username", res.data.username);

            console.log(res);

    } catch (error) {
        console.log(error.response.data);
    }

}

export default function Login() {
    return(<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
        <Components.Flex row>   
            <Components.DimmedImage orientation="portrait" style={{
                width: "50%",
                display: "flex"
            }} childStyle={{
                color: Theme.TEXT.SECONDARY,
                fontSize: FontSize.XL3,
                padding: Spacing.MD,
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
                    padding: Spacing.SM,
                    width: "80%",
                    maxWidth: "500px",
                    marginBlock: "auto",
                    marginInline: "auto",
                    boxSizing: "border-box",
                    gap: Spacing.MD
                }}>
                    <Components.TextBox 
                        color={Theme.BLACK}
                        fontSize={FontSize.MD}
                        alignment="center-left" 
                        content="INICIAR SESION EN DOCEL"
                    />
                    <form onSubmit={handleSubmit} style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: Spacing.MD
                    }}>
                        <input type="email" name="email" placeholder="Correo electronico" />
                        <input type="password" name="password" placeholder="Contraseña" />
                        <button type="submit" style={{
                            marginTop: Spacing.MD
                        }}>INICIAR SESION</button>
                    </form>
                    
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