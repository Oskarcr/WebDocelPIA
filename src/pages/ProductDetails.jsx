import { capitalize, Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, Route, useNavigate, useParams } from "react-router-dom";

async function submitHandler(evt) {
    evt.preventDefault();
        
    // PENDIENTE
    try {
        const color = document.getElementById("product-details-color").value;

        const res = await axios.post("/api/orders/", {
            color: color
        })

        console.log(res.data);
    }catch(error){
        console.log(error.response.data);
    }
}

export default function ProductDetails() {
    const [furniture, setFurniture] = useState({
        name: "Cargando...",
        price: "Cargando...",
        finishName: "Cargando...",
        colorName: "Cargando...",
        imageUrl: "",
        error: true
    });
    const params = useParams();
    const didFetch = useRef(false);
    const { id } = params;

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const response = await axios.get("/api/furnitures/" + id);
                const d = response.data;
                setFurniture({
                    name: capitalize(d.name),
                    colorName: capitalize(d.colorName),
                    finishName: capitalize(d.finishName),
                    price: d.price,
                    imageUrl: "/attachments/" + d.imageUrl,
                    error: false
                });
            } 
            catch (error) {
                console.error(error);
                setFurniture({
                    name: "No encontrado",
                    price: "No especificado",
                    colorName: "Ninguno",
                    finishName: "Ninguno",
                    imageUrl: "",
                    error: true
                });
            }
        })();
    }, []);

    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.ACCENT} />
            <div style={{
                flex: 1,
                backgroundColor: Theme.BACKGROUND.SURFACE
            }}>
                <Components.DimmedImage
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "35%",
                    }}
                    src="/furniture/sideboard2.png"
                />
                <Components.Flex column className="product-details-card-container">
                    <Components.TextBox
                        style={{
                            marginTop: Spacing.MD,
                        }}
                        color={Theme.TEXT.SECONDARY}
                        content="DETALLES DEL PRODUCTO"
                        fontSize={FontSize.XL1}
                    />
                    <div className="product-details-card" style={{
                        backgroundColor: Theme.BACKGROUND.MAIN,
                    }}>
                        <img src={furniture.imageUrl}/>
                        <Components.Flex column style={{
                            padding: Spacing.MD,
                            boxSizing: "border-box",
                            gap: Spacing.SM
                        }}>
                            <Components.TextBox
                                fontSize={FontSize.LG}
                                color={Theme.PRIMARY}
                                content={furniture.name}
                            />
                            <Components.TextBox 
                                fontSize={FontSize.MD} 
                                color={Theme.PRIMARY} 
                                content={
                                    "Precio: " + furniture.price + "MXN"+ 
                                    "\\nAcabado: " + furniture.finishName + 
                                    "\\nColor principal: " + furniture.colorName
                                }
                            />
                            <Components.Flex/>
                            {furniture.error === false &&
                                <button id="product-details-button" onClick={submitHandler}>Agregar</button>
                            }
                        </Components.Flex>
                    </div>
                </Components.Flex> 
            </div>
            <Components.Column color={Theme.BLACK} />
        </Components.Main>
    )
}