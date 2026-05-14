import { Components, FontSize, Spacing, Theme } from "@/DocelClient";

async function handle(evt){
    evt.preventDefault();

    const formData = new FormData(evt.target);

    try{
        await axios.patch("/api/users/:id", {

        })
    }catch(error){
        console.log(error.response.data);
    }
}

export default function Profile() {
    return (<Components.Main horizontal inverted>
        <Components.Flex column>
            <Components.Flex row>
                <Components.Column color={Theme.PRIMARY}/>
                <Components.Flex column style={{
                    overflowY: "scroll"
                }}>
                    <Components.DimmedImage style={{
                    }} childStyle={{
                        height: "100%",
                        padding: Spacing.SM,
                        boxSizing: "border-box"
                    }} src="https://d38qrl83hrqn1t.cloudfront.net/media/catalog/product/cache/e5313a059d82e47a0dd0c73b13afb6be/m/u/mueble-tv-160cm-cairo-nogal-decorado-cto40669s1-1_principal.jpg">
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "60%",
                            minWidth: "500px",
                            height: "100%",
                            marginInline: "auto",
                        }}>
                            <Components.TextBox 
                                style={{
                                    marginTop: "auto",
                                }}
                                fontSize={FontSize.MD}
                                color={Theme.TEXT.SECONDARY}
                                content="PERFIL CLIENTE"
                            />
                            <Components.TextBox 
                                style={{
                                    marginBottom: "auto"
                                }}
                                fontSize={FontSize.XL2}
                                color={Theme.TEXT.SECONDARY}
                                content="Hola, Oscar"
                            />
                        </div>
                    </Components.DimmedImage>
                    <form className="profile-inputs-container">
                        <input type="text" name="name" value="Oscar"/>
                        <input type="email" name="email" value="oscar.pro@gmail.com"/>
                        <input type="text" name="address" value="Monterrey av. 'La avenida' calle 'Ernesto Peralez' #0000"/>
                        <input type="text" name="phone" value="+52 000 000 0000"/>
                        <button type="submit">CAMBIAR CONTRASEÑA</button>
                        <button>VER UBICACIÓN</button>
                        <button>CONTRATAR</button>
                    </form>
                </Components.Flex>
            </Components.Flex>
            <Components.TextBox style={{
                backgroundColor: Theme.BLACK,
                minHeight: "60px"
            }} 
                alignment="center"
                content="ESTA INFORMACION SE COMPARTE CON PERSONAL Y CON EL CLIENTE."
                color={Theme.TEXT.SECONDARY}
            />
        </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}