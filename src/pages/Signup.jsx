import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";

async function handleSubmit(evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    try{
        await axios.post("/api/auth/signup", {
        name: formData.get("name"),
        phone: parseInt(formData.get("phone")),
        address: formData.get("address"),
        email: formData.get("email"),
        password: formData.get("password")
        });
    }catch(error){
        console.log(error.response.data);
    }    
}

export default function Signup() {
    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK} />
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
                    <form onSubmit={handleSubmit} style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: Spacing.MD,
                        
                    }}>
                        <input type="text" name="name" placeholder="Nombre" />
                        <input type="number" name="phone" placeholder="Telefono" />
                        <input type="text" name="address" placeholder="Domicilio" />
                        <input type="email" name="email" placeholder="Correo" />
                        <input type="password" name="password" placeholder="Contraseña" />
                        <button type="submit" style={{
                            marginTop: Spacing.MD
                        }}>REGISTRARME</button>
                    </form>
                    <Components.TextBox
                        content="Ya tengo cuenta"
                        alignment="center"
                        href="/login"
                    />
                </div>
                <Components.Column color={Theme.ACCENT} horizontal />
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
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}