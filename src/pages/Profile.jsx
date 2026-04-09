import { Components, FontSize, Theme } from "@/DocelCore";

export default function Profile() {
    return (<Components.Main horizontal inverted>
        <Components.Flex column>
            <Components.Flex row>
                <Components.Column color={Theme.PRIMARY}/>
                <Components.Flex column style={{
                    overflowY: "scroll"
                }}>
                    <Components.DimmedImage style={{
                        height: "25%",
                    }} childStyle={{
                        height: "100%"
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
                    <Components.Flex column style={{
                        marginInline: "auto",
                        padding: "20px",
                        width: "50%",
                        minWidth: "600px",
                        maxWidth: "800px",
                        boxSizing: "border-box",
                        gap: "20px",
                        overflowY: "scroll"
                    }}>
                        <input type="text" value="Oscar"/>
                        <input type="email" value="oscar.pro@gmail.com"/>
                        <input type="text" value="Monterrey av. 'La avenida' calle 'Ernesto Peralez' #0000"/>
                        <input type="text" value="+52 000 000 0000"/>
                        <button>CAMBIAR CONTRASEÑA</button>
                        <button>VER UBICACIÓN</button>
                        <button>CONTRATAR</button>
                    </Components.Flex>
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