import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios, { formToJSON } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
    const { email } = useParams();

    const loggedInUserRole = Number(localStorage.getItem("role"));

    const isAdmin = loggedInUserRole === 3;
    const formRef = useRef(null);
    const didFetch = useRef(false);

    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [passwordBox, setPasswordBox] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        address: "",
        phone: "",
        password: ""
    });

    async function loadLocation() {
        if (!user.address) return;

        const query = encodeURIComponent(user.address);

        window.open("https://www.google.com/maps/search/?api=1&query=" + query, "_blank");
    }

    async function hireUserHandler() {
        if (!email) return;
        try {
            const response = await axios.patch("/api/users/" + email.trim().toLowerCase(), {
                role: 2
            }, { withCredentials: true });

            setUser(prev => ({ ...prev, role: response.data.role }));

            setTitle("Éxito");
            setMessage(user.username + " ahora es miembro del personal!");
            setShowMessage(true);
        } catch (error) {
            console.log(error);
            setTitle("Error");
            setMessage(error.response?.data?.message || "No se pudo contratar al usuario.");
            setShowMessage(true);
        }
    }


    async function submitHandler(evt) {
        evt.preventDefault();
        try {
            if (email) return;

            const data = new FormData(formRef.current);

            const json = formToJSON(data);

            if (user.password) {
                json.password = user.password;
            }

            await axios.patch("/api/users/me", json, {
                withCredentials: true
            });

            window.location.reload();
        } catch (error) {
            const data = error.response?.data;

            setTitle("Error");

            if (data.error) {
                setMessage(data.message);
            }

            if (data.errors) {
                setMessage(data.errors.join("\\n"));
            }

            else if (data.empties) {
                setMessage(" Faltan los campos:\\n" + data.empties.join("\\n"));
            }
            setShowMessage(true);
        }
    }

    async function logoutHandler() {
        try {
            await axios.post("/api/users/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor:", error);
        }
        localStorage.clear();
        window.location.href = "/login";
    }

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const endpoint = email ? "/api/users/" + email.trim().toLowerCase() : "/api/users/me";

                const response = await axios.get(endpoint, {
                    withCredentials: true
                });

                setUser(response.data);

            } catch (error) {
                console.log(error);
                const data = error.response?.data;

                if (data.message) {
                    setMessage(data.message);
                }

                if (data.errors) {
                    setMessage(data.errors.join("\\n"));
                }

                else if (data.empties) {
                    setMessage(" Faltan los campos:\\n" + data.empties.join("\\n"));
                }

                setShowMessage(true);
            }
        })();

    }, [email]);

    return (
        <>
            {
                showMessage && (
                    <Components.MessageBox title={title} content={message} onClose={() => setShowMessage(false)} />
                )
            }
            {
                passwordBox && (
                    <Components.InputBox
                        title="CAMBIAR CONTRASEÑA"
                        placeholder="Nueva contraseña"
                        isPassword
                        onClose={() => setPasswordBox(false)}
                        onConfirm={(value) => {
                            setUser({
                                ...user,
                                password: value
                            });

                            setPasswordBox(false);
                        }}
                    />
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
                                <div className="profile-dimmed-text">
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
                                        content={"Hola, " + user.username}
                                    />
                                </div>
                            </Components.DimmedImage>
                            <form ref={formRef} className="profile-inputs-container" onSubmit={submitHandler}>
                                <input type="text" defaultValue={user.username} name="username" disabled={!!email} />
                                <input type="email" defaultValue={user.email} name="email" disabled={!!email} />
                                <input type="text" defaultValue={user.address} name="address" disabled={!!email} />
                                <input type="number" defaultValue={user.phone} name="phone" disabled={!!email} />

                                {!email && (
                                    <button type="button" onClick={() => setPasswordBox(true)}>CAMBIAR CONTRASEÑA</button>
                                )}

                                <button type="button" onClick={loadLocation}>VER UBICACIÓN</button>

                                {
                                    isAdmin && email && user.role === 1 && (
                                        <button type="button" onClick={hireUserHandler}>CONTRATAR</button>
                                    )
                                }

                                {!email && (
                                    <button type="submit">CONFIRMAR CAMBIOS</button>
                                )}

                                {!email && (
                                    <button type="button" onClick={logoutHandler}>CERRAR SESIÓN</button>
                                )}
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