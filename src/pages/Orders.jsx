import { Components, FontSize, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        async function loadOrders() {
            try {
                const response = await axios.get("/api/orders/me", {
                    withCredentials: true
                });
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    /*
        const children = [];
        for(let i = 0; i < 4; i++) {
            children.push(<Components.OrderOption status={1 + Math.round(Math.random() * 5)}/>);
        }
    */

    return (
        <>
            {
                selectedOrder && (
                    <Components.OrderDetailsBox
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                    />
                )
            }

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
                                return (<Components.OrderOption key={order._id} status={order.status} onClick={() => setSelectedOrder(order)}/>);
                            })
                        }
                    </div>
                </div>
                <Components.Column color={Theme.SECONDARY} />
            </Components.Main>
        </>
    );
}