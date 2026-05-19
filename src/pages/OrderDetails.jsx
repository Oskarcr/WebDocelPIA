import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import OrderItem from "../components/OrderItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [statusName, setStatusName] = useState(null);
    const [furnitures, setFurnitures] = useState([]);
    const [message, setMessage] = useState(null);
    const didFetch = useRef(false);
    const { id } = params;
    const BASE_ROUTE = "/api/orders/" + id;

    useEffect(() => {
        if(didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const response = await axios.get("/api/orders/" + id + "/furnitures");
                setFurnitures(response.data);

                const { data } = await axios.get(BASE_ROUTE);
                setStatusName(data.statusName);
            }
            catch(error) {
                showErrors(error);
            }
        })();
    }, []);


    const showErrors = (error) => {
        const data = error.response?.data;
        if(!data || !Array.isArray(data.errors)) return;
        setMessage({
            title: "ERROR",
            content: data.errors.join("\\n")
        });
    }

    const onOkMsg = () => window.location.reload();

    // Al cancelar el pedido.
    const handlerCancel = async () => {
        try {
            await axios.patch(BASE_ROUTE + "/status", {
                statusName: "cancelado"
            });
            setMessage({
                title: "MENSAJE",
                content: "El pedido se cancelo.",
                onOk: onOkMsg
            });
        }
        catch(error) {
            showErrors(error);
        }
    }

    // Al enviar a revision el pedido.
    const handlerReview = async () => {
        try {
            await axios.patch(BASE_ROUTE + "/send");
            setMessage({
                title: "MENSAJE",
                content: "El pedido se envio con exito.",
                onOk: onOkMsg
            });
        }
        catch(error) {
            showErrors(error);
        }
    }

    // Al pagar el pedido
    const handlerPay = async () => {
        try {
            await axios.patch(BASE_ROUTE + "/status", {
                statusName: "aceptado"
            });
            setMessage({
                title: "MENSAJE",
                content: "El pago se realizo con exito.",
                onOk: onOkMsg
            })
        }
        catch(error) {
            showErrors(error);
        }
    }

    // Al administrar el pedido.
    const handlerManage = async () => {
        setOpen(true);
    }

    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
            {open && <Components.OrderBox 
                onShowError={showErrors}
                onCancel={() => {
                    setOpen(false);
                }}
            />}
            <div style={{
                width: "100%"
            }}>
                <Components.DimmedImage src="/furniture/background_order.png" style={{
                    display: "flex",
                    width: "100%",
                    height: "25%",
                    alignItems: "center",
                }}>
                    <Components.TextBox fontSize={FontSize.XL1} color={Theme.TEXT.SECONDARY} content="DETALLES DEL PEDIDO" style={{
                        marginLeft: Spacing.LG
                    }}/>
                </Components.DimmedImage>
                <div className="product-details-wrapper" style={{
                    padding: Spacing.SM,
                    backgroundColor: Theme.BACKGROUND.SURFACE,
                    gap: Spacing.LG,
                }}>
                    <div className="order-details-content">
                        <div className="box-buttons-handler">
                            <button onClick={handlerReview}>ENVIAR A REVISION</button>
                            {(statusName == "pendiente" || statusName == "devuelto") &&
                            <button onClick={handlerCancel}>CANCELAR</button>}
                            {(statusName == "devuelto") &&
                            <button onClick={handlerPay}>PAGAR</button>}
                            {(statusName == "pendiente" || statusName == "aceptado") && 
                            <button onClick={handlerManage}>ADMINISTRAR</button>}
                        </div>
                        
                        {
                            furnitures.map(item => <OrderItem 
                                path={"/product_details/" + item.id} 
                                src={"/attachments/" + item.imageUrl} 
                                name={item.name} 
                                price={item.price}
                            />)
                        }
                    </div>
                    </div>
                    
            </div>
            <Components.Column color={Theme.ACCENT} />
            { message && <Components.MessageBox
                content={message.content}
                title={message.title}
                onClose={() => {
                    if(message.onOk) message.onOk();
                    setMessage(null);
                }}
            />}
        </Components.Main>
    )
}