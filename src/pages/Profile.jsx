import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        address: "",
        phone: 0
    });

    async function submitHandler(evt) {
        evt.preventDefault();

        try {
            const response = await axios.patch("/api/users/me", user, {
                withCredentials: true
            })

            setUser(response.data);

            setTitle("Éxito");
            setMessage("Datos modificados con exito.");
            setShowMessage(true);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await axios.get("/api/users/me", {
                    withCredentials: true
                });

                setUser(response.data);

            } catch (error) {
                console.log(error);
                const data = error.response.data;

                if (data.message) {
                    setMessage(data.message);
                }

                if (data.errors) {
                    setMessage(data.errors.join("\\n"));
                }

                else if (data.empties) {
                    setMessage(" Faltan los campos:\\n" + data.empties.join(", \\n"));
                }
            }
        }

        loadUser();
    }, []);

    return (
        <>
            {
                showMessage && (
                    <Components.MessageBox title={title} content={message} onClose={() => setShowMessage(false)} />
                )
            }

            <Components.Main horizontal inverted>
                <Components.Flex column>
                    <Components.Flex row>
                        <Components.Column color={Theme.PRIMARY} />
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
                            <form className="profile-inputs-container" onSubmit={submitHandler}>
                                <input type="text" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                <input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                <input type="text" name="address" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
                                <input type="text" name="phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                                <button>CAMBIAR CONTRASEÑA</button>
                                <button>VER UBICACIÓN</button>
                                <button>CONTRATAR</button>
                                <button type="submit">CONFIRMAR CAMBIOS</button>
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
                <Components.Column color={Theme.ACCENT} />
            </Components.Main>
        </>
    );
}