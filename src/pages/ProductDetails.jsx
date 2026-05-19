import { capitalize, Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
    const [furniture, setFurniture] = useState({
        name: "Cargando...",
        price: "Cargando...",
        finishName: "Cargando...",
        colorName: "Cargando...",
        imageUrl: "",
        error: true
    });
    const [message, setMessage] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
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

    const handlerAdd = async () => {
        try {
            await axios.post("/api/orders/active",{},{
                withCredentials: true
            });

            await axios.patch("/api/orders/active/add/" + id);
            navigate(-1);
        }
        catch(error){
            showErrors(error);
        }
    }

    const handlerRemove = async () => {
        try {
            await axios.post("/api/orders/active",{},{
                withCredentials: true
            });
            
            await axios.patch("/api/orders/active/remove/" + id);
            navigate(-1);
        }
        catch(error){
            showErrors(error);
        }
    }

    const showErrors = (error) => {
        const data = error.response?.data;
        if(!data || !Array.isArray(data.errors)) return;
        setMessage({
            title: "ERROR",
            content: data.errors.join("\\n")
        });
    }

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
                            {furniture.error === false && <>
                                <button type="button" onClick={handlerRemove}>Eliminar del carrito</button>
                                <button type="button" onClick={handlerAdd}>Agregar al carrito</button>
                            </>}
                        </Components.Flex>
                    </div>
                </Components.Flex> 
            </div>
            <Components.Column color={Theme.BLACK} />
            { message && <Components.MessageBox
                title={message.title}
                content={message.content}
                onClose={() => setMessage(null)}
            />}
        </Components.Main>
    )
}