import { Components, FontSize, Spacing, Theme } from "@/DocelClient"
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Portal() {
const [email, setEmail] = useState("");

const navigate = useNavigate();

    async function searchUserHandler(){
        if(!email.trim()) return;
        try{
            const response = await axios.get("/api/users/" + email.trim().toLocaleLowerCase());
            console.log(response.data);

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
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
                padding: Spacing.SM,
                backgroundColor: Theme.BACKGROUND.SURFACE
            }}>
                <div style={{
                    width: "85%",
                    marginTop: Spacing.LG,
                    marginBottom: "auto",
                    overflow: "hidden",
                    boxShadow: "var(--box-shadow)",
                    borderRadius: "8px",
                    backgroundColor: Theme.BACKGROUND.MAIN
                }}>
                    <Components.PortalCard title="Buscar usuario por correo" onClick={searchUserHandler} hasInput>
                        <input placeholder="Usuario" value={email} onChange={(evt) => setEmail(evt.target.value)} style={{
                                width: "45%"
                            }}/>
                    </Components.PortalCard>
                    <Components.PortalCard path="/product_manager" title="Gestor de muebles"/>
                    <Components.PortalCard path="/reports" title="Reporte de ventas"/>
                    <Components.PortalCard path="/color_swatches" title="Muestras de color"/>
                </div>
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}