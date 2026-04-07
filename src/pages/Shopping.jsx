import { Components, Theme } from "@/DocelCore";
import "../css/styles.css";
import { Link as RouterLink } from "react-router-dom";

const shoppingItems = [
    { path: "/login", name: "Aparador bonito", price: 1000, src: "furniture/sideboard.png" },
    { path: "/login", name: "Aparador mediano", price: 1200, src: "furniture/sideboard2.png" },
    { path: "/login", name: "Cajonera mediana", price: 2500, src: "furniture/chest.png" },
    { path: "/login", name: "Armario mediano", price: 2800, src: "furniture/closet.png" },
    { path: "/login", name: "Base de cama familiar", price: 4800, src: "furniture/bed_base.png" },
    { path: "/login", name: "Silla bonita", price: 800, src: "furniture/chair.png" }
];

const children = shoppingItems.map((item) => {
    return <Components.ShoppingItem ShoppingItem path={item.path} src={item.src} name={item.name} price={item.price} />
});

export default function Shopping() {
    return (
        <>
            <Components.Main horizontal>
                <div id="shopping-wrapper" style={{ backgroundColor: Theme.BACKGROUND.MAIN }}>
                    {children}
                </div>
            </Components.Main>
        </>
    )
}