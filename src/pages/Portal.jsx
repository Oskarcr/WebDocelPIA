import { Components, FontSize, Spacing, Theme } from "@/DocelClient"
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Portal() {
    const relativeUserRole = Number(localStorage.getItem("role"));

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const searchUserHandler = async () => {
        if(!email.trim()) return;
        try{
            await axios.get("/api/users/" + email.trim().toLocaleLowerCase());

            navigate("/profile/" + email.trim().toLowerCase());
        }catch(error){
            console.log(error.response.data);
        }
    }

    return (
        <Components.Main horizontal>
            <Components.DimmedImage orientation="portrait" src="/furniture/background_home.png" style={{
                width: "45%"
            }}childStyle={{
                display: "flex",
                height: "100%",
                width: "100%",
            }}>
                <Components.TextBox
                    style={{
                        padding: Spacing.SM,
                        marginBlock: "auto"
                    }}
                    color={Theme.TEXT.SECONDARY}
                    fontSize={FontSize.XL3}
                    content="PORTAL\nDE\nAPLICACIÓN"
                    alignment="center-left"
                />
            </Components.DimmedImage>
            <div className="portal-options-wrapper" style={{
                padding: Spacing.SM,
                backgroundColor: Theme.BACKGROUND.SURFACE
            }}>
                <div className="portal-options-container" style={{
                    marginTop: Spacing.LG,
                    backgroundColor: Theme.BACKGROUND.MAIN
                }}>
                    {(relativeUserRole > 1) &&<>
                        <Components.PortalCard title="Buscar usuario por correo" onClick={searchUserHandler} hasInput>
                        <input placeholder="Usuario" 
                            value={email} onChange={(evt) => setEmail(evt.target.value)} style={{
                                width: "45%"
                            }}/>
                        </Components.PortalCard>
                        <Components.PortalCard path="/product_manager" title="Gestor de muebles"/>
                        <Components.PortalCard path="/color_swatches" title="Muestras de color"/>
                    </>}

                    {(relativeUserRole > 2) &&<>
                        <Components.PortalCard path="/reports" title="Reporte de ventas"/>
                        <Components.PortalCard path="/employees" title="Empleados"/>
                    </>}
                </div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}