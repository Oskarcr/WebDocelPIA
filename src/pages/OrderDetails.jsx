import { Components, FontSize, Theme } from "@/DocelCore";
import OrderItem from "../components/OrderItem";

const orderItems = [
    { src:"/furniture/closet.png", name: "Armarios", color: "Marron", price: "12600" },
    { src:"/furniture/chair.png", name: "Sillas", color: "Marron", price: "3400" },
    { src:"/furniture/bed_base.png", name: "Bases de cama", color: "Marron", price: "9000" },
    { src:"/furniture/sideboard.png", name: "Aparador", color: "Marron", price: "6500" }
]

const children = orderItems.map(item => {
    return <OrderItem src={item.src} name={item.name} color={item.color} price={item.price}></OrderItem>
})

export default function OrderDetails() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
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
                        marginLeft: "30px"
                    }}/>
                </Components.DimmedImage>
                <div style={{
                    display: "flex",
                    width: "100%",
                    height: "75%",
                    paddingTop: "30px",
                    backgroundColor: Theme.BACKGROUND.SURFACE,
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    overflowY: "auto"
                }}>
                    {children}
                </div>
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}