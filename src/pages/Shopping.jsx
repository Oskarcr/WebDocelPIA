import { Theme } from "@/DocelCore";
import ButtonHeader from "../components/ButtonHeader";
import "../css/styles.css";
import { Link as RouterLink } from "react-router-dom";
import ShoppingItem from "../components/ShoppingItem";

const shoppingItems = [
    {index: 0, name: "Aparador bonito", price:1000, src: "furniture/sideboard.png"},
    {index: 1, name: "Aparador mediano", price:1200, src: "furniture/sideboard2.png"},
    {index: 2, name: "Cajonera mediana", price:2500, src: "furniture/chest.png"},
    {index: 3, name: "Armario mediano", price:2800, src: "furniture/closet.png"},
    {index: 4, name: "Base de cama familiar", price:4800, src: "furniture/bed_base.png"},
    {index: 5, name: "Silla bonita", price:800, src: "furniture/chair.png"}
];

const children = shoppingItems.map((item) => {
    return <ShoppingItem key={item.index} src={item.src} name={item.name} price={item.price}></ShoppingItem>
});

export default function Shopping() {
    return (
        <>
            <div className="header-wrapper">
                <div className="title-wrapper">
                    DoCeL
                </div>
                <div className="buttons-wrapper">
                    <RouterLink to="/" className="link-button">
                        <ButtonHeader className="header-button" name={"INICIO"}></ButtonHeader>
                    </RouterLink>
                    <RouterLink to="/not_found" className="link-button">
                        <ButtonHeader className="header-button" name={"PEDIDOS"}></ButtonHeader>
                    </RouterLink>
                    <RouterLink to="/shopping" className="link-button">
                        <ButtonHeader className="header-button" name={"MUEBLES"}></ButtonHeader>
                    </RouterLink>
                    <RouterLink to="/not_found" className="link-button">
                        <ButtonHeader className="header-button" name={"PERFIL"}></ButtonHeader>
                    </RouterLink>
                </div>
            </div>
            <div id="shopping-wrapper" style={{backgroundColor: Theme.BACKGROUND.MAIN}}>
                {children}
            </div>
        </>
    )
}