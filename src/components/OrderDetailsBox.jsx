import { Components, FontSize, Spacing, Theme } from "@/DocelClient";

export default function OrderDetailsBox({ order, onClose = () => { } }) {
    const total = order.furnitures.reduce((sum, furniture) => {
        return sum + furniture.price;
    }, 0);

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999
        }}>
            <div style={{
                width: "80%",
                maxWidth: "600px",
                minWidth: "300px",
                maxHeight: "80vh",
                overflowY: "auto",
                padding: Spacing.LG,
                borderRadius: "8px",
                backgroundColor: Theme.BACKGROUND.MAIN
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: Spacing.MD
                }}>
                    <Components.TextBox content="Detalles del pedido" fontSize={FontSize.LG} bold alignment="center" style={{
                            color: Theme.PRIMARY
                        }}/>

                    {
                        order.furnitures.map((furniture) => (
                            <div key={furniture._id} style={{
                                    padding: Spacing.MD,
                                    border: "1px solid" + Theme.PRIMARY,
                                    borderRadius: "8px"
                                }}>

                                <Components.TextBox content={"Nombre: $" + furniture.name}/>
                                <Components.TextBox content={"Precio: $" + furniture.price}/>
                                <Components.TextBox content={"Acabado:" + furniture.finish}/>
                            </div>
                        ))
                    }

                    <Components.TextBox bold content={"Total:" + total} style={{
                            color: Theme.PRIMARY
                        }}/>

                    <button onClick={onClose}
                        style={{
                            color: Theme.BACKGROUND.MAIN
                        }}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}