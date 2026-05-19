import { Components, FontSize, Spacing } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderBox({
    onCancel,
    onShowError
}) {
    const params = useParams();
    const [statusName, setStatusName] = useState("loading");
    const formRef = useRef(null);
    const didFetch = useRef(false);
    const navigate = useNavigate();
    const { id } = params;

    const BASE_ROUTE = "/api/orders/" + id;

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const { data } = await axios.get(BASE_ROUTE);
                setStatusName(data.statusName);
            }
            catch(error) {
                console.log(error);
                onShowError(error);
            }
        })();
    }, []);

    const handleConcluded = () => {
        (async () => {
            try {
                await axios.patch(BASE_ROUTE + "/status", {
                    statusName: "concluido"
                }, {
                    withCredentials: true
                });
                navigate("/orders/pending");
            }
            catch(error) {
                onShowError(error);
            }
        })();
    }

    /**
     * @param {PointerEvent} evt 
     */
    const handleReview = (evt) => {
        const currentTarget = evt.currentTarget;
        if(currentTarget instanceof HTMLButtonElement === false) return;
        const nextStatusName = (currentTarget.hasAttribute("data-reject") ? "rechazado" : "devuelto");
        (async () => {
            const data = new FormData(formRef.current);
            try {
                await axios.patch(BASE_ROUTE + "/review", {
                    statusName: nextStatusName,
                    comment: data.get("comment")
                });
                navigate("/orders/pending");
            }
            catch(error) {
                console.log(error);
                onShowError(error);
            }
        })();
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
                {(() => {
                    switch(statusName) {
                        case "pendiente": 
                        return <>
                            <input name="comment" type="text" placeholder="Comentario"/>
                            <Components.Flex row style={{
                                gap: Spacing.MD
                            }}>
                                <button type="button" data-reject onClick={handleReview} style={{flex: 1}}>RECHAZAR</button>
                                <button type="button" data-return onClick={handleReview} style={{flex: 1}}>DEVOLVER</button>
                            </Components.Flex>
                        </>;
                        case "aceptado":
                        return <button type="button" onClick={handleConcluded}>
                            CONCLUIR
                        </button>;
                    }
                })()}
                <button type="button" onClick={onCancel}>CANCELAR</button>
            </form>
        </div>
    </div>);
}