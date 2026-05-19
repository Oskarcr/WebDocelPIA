import { Components, FontSize, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Orders() {
    const location = useLocation();
    const path = location.pathname.split("/").filter(Boolean).pop();
    const [orders, setOrders] = useState([]);
    const didFetch = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                let response = null;

                if(path == "pending") {
                    response = await axios.get("/api/orders/pending");
                }
                else {
                    response = await axios.get("/api/orders/me", {
                        withCredentials: true
                    });
                }
                
                if(response) setOrders(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <Components.Main horizontal>
                <Components.Column color={Theme.BLACK} />
                <div style={{
                    flex: 1,
                    backgroundColor: Theme.ACCENT,
                    overflow: "auto",
                }}>
                    <Components.DimmedImage
                        style={{
                            height: "20%",
                            width: "100%"
                        }}
                        childStyle={{
                            height: "100%",
                            width: "100%"
                        }}
                        src="https://ecohabitar.org/wp-content/uploads/2019/12/original.jpg"
                    >
                        <Components.TextBox
                            fontSize={FontSize.XL1}
                            color={Theme.TEXT.SECONDARY}
                            content="PEDIDOS"
                            alignment="center-left"
                            style={{
                                height: "100%",
                                width: "80%",
                                marginInline: "auto"
                            }}
                        />
                    </Components.DimmedImage>

                    <div className="orders-list-container" style={{
                        backgroundColor: Theme.ACCENT,
                    }}>
                        {
                            orders.map((order) => {
                                return (<Components.OrderOption 
                                    key={order.id} 
                                    statusName={order.statusName} 
                                    delivered={order.deliveredAt}
                                    register={order.createdAt}
                                    onClick={() => navigate("/orders/" + order.id)}
                                />);
                            })
                        }
                    </div>
                </div>
                <Components.Column color={Theme.SECONDARY} />
            </Components.Main>
        </>
    );
}