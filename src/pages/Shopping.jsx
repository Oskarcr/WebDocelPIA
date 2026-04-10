import { Components, Spacing, Theme } from "@/DocelCore";
import "../css/styles.css";

const shoppingItems = [
    { path: "/product_details", name: "Aparador bonito", price: 1000, src: "furniture/sideboard.png" },
    { path: "/product_details", name: "Aparador mediano", price: 1200, src: "furniture/sideboard2.png" },
    { path: "/product_details", name: "Cajonera mediana", price: 2500, src: "furniture/chest.png" },
    { path: "/product_details", name: "Armario mediano", price: 2800, src: "furniture/closet.png" },
    { path: "/product_details", name: "Base de cama familiar", price: 4800, src: "furniture/bed_base.png" },
    { path: "/product_details", name: "Silla bonita", price: 800, src: "furniture/chair.png" }
];

const children = shoppingItems.map((item) => {
    return <Components.ShoppingItem ShoppingItem path={item.path} src={item.src} name={item.name} price={item.price} />
});

export default function Shopping() {
    return (<Components.Main horizontal>
        <Components.Column color={Theme.ACCENT}/>
        <div className="shopping-main-container" style={{
            backgroundColor: Theme.BACKGROUND.SURFACE
        }}>
            <div style={{
                backgroundColor: Theme.ACCENT,
                outline: "2px solid " + Theme.ACCENT,
            }}>
                {children}
            </div>
        </div>
        <Components.Column color={Theme.BLACK}/>
    </Components.Main>);
}