import { Components, FontSize, Spacing } from "@/DocelClient";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function OrderBox({
    onConcluded,
    onCancel
}) {
    const params = useParams();
    const formRef = useRef(null);
    const didFetch = useRef(false);
    const { id } = params;

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        alert(id);
    }, []);

    const handleConcluded = () => {
        if(onConcluded) onConcluded();
    }

    const handleReturned = () => {

    }

    const handleReject = () => {

    }

    return (<div className="message-box">
        <div className="message-box-content">
            <form ref={formRef} style={{
                display: "flex",
                flexDirection: "column",
                gap: Spacing.MD
            }}>
                <Components.TextBox
                    alignment="center"
                    fontSize={FontSize.LG}
                    content="REVISAR ORDEN"
                />
                <Components.TextBox
                    style={{padding: 0}}
                    alignment="bottom-left"
                    fontSize={FontSize.SM}
                    content="PASO 1. RECHACE O DEVUELVA EL PEDIDO"
                />
                <input type="text" placeholder="Comentario"/>
                <input type="number" placeholder="Adelanto"/>
                <input type="text" placeholder="Fecha estimada dia/mes/año"/>
                <Components.Flex row style={{
                    gap: Spacing.MD
                }}>
                    <button type="button" onClick={handleReject} style={{flex: 1}}>RECHAZAR</button>
                    <button type="button" onClick={handleReturned} style={{flex: 1}}>DEVOLVER</button>
                </Components.Flex>
                
                <Components.TextBox
                    style={{padding: 0}}
                    alignment="bottom-left"
                    fontSize={FontSize.SM}
                    content="PASO 2. CONCLUYA EL PEDIDO"
                />
                <button type="button" onClick={handleConcluded}>CONCLUIR</button>
                <Components.TextBox
                    style={{padding: 0}}
                    alignment="bottom-left"
                    fontSize={FontSize.SM}
                    content="CANCELE SI LO DESEA"
                />
                <button type="button" onClick={onCancel}>VOLVER</button>
            </form>
        </div>
    </div>);
}