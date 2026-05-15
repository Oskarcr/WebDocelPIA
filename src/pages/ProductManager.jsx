import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useRef } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
    const refs = {
        name: useRef(null),
        finishName: useRef(null),
        price: useRef(null),
        image: useRef(null),
        colorName: useRef(null)
    };

    const onAccept = async () => {
        try {
            const formData = new FormData();
            formData.set("name", refs.name.current.value);
            formData.set("finishName", refs.finishName.current.value.toLowerCase());
            formData.set("price", parseInt(refs.price.current.value));
            formData.set("img", refs.image.current.files[0]);
            formData.set("colorName", refs.colorName.current.value);

            await axios.post("/api/furniture", formData);
        } 
        catch(error) {
            console.log(error);
            alert(JSON.stringify(error.response.data));
        }
    };

    return (<div style={{
        display: "flex",
        flexDirection: "column",
        marginInline: "auto",
        width: "100%",
        height: "100%",
        flexShrink: 0
    }}>
        <input
            ref={refs.image}
            type="file"
            accept="image/*"
            style={{
                display: "none"
            }}
        />
        <Components.Flex column style={{
            width: "100%",
            flex: "unset",
            gap: "20px",
            boxSizing: "border-box",
            padding: Spacing.MD,
            borderRadius: "8px",
            backgroundColor: Theme.BACKGROUND.MAIN,
            flexShrink: 0
        }}>
            <input ref={refs.name} placeholder="Nombre"/>
            <input ref={refs.finishName} placeholder="Tipo de acabado"/>
            <input ref={refs.price} placeholder="Precio"/>
            <input ref={refs.colorName} placeholder="Color"/>
            <button onClick={() => {
                refs.image.current.click();
            }}>SUBIR IMAGEN</button>
            <button onClick={onAccept}>ACEPTAR</button>
            <Components.TextBox
                content="OTRAS OPCIONES"
            />
            <button>ELIMINAR</button>
        </Components.Flex>
    </div>);
}

export default function ProductManager() {
    let child = null;
    const { id } = useParams();
    if (!id) {
        child = [];
        for (let i = 0; i < 10; i++) {
            child.push(
                <Components.ProductOption
                    key={i}
                    src="/furniture/closet.png"
                    name="Hola"
                    id={i + 1}
                />
            );
        }
    }
    else {
        child = <ProductPage name="Hola" finish="Barniz" price="500" />
    }
    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK} />
        <Components.DimmedImage src="/furniture/background_order.png" style={{
            flex: 1,
            justifyItems: "center"
        }} childClassName="product-manager-options-container">
            <Components.TextBox
                content="GESTOR DE MUEBLES"
                fontSize={FontSize.XL1}
                color={Theme.TEXT.SECONDARY}
                alignment="center-left"
                style={{
                    flexShrink: 0,
                    height: "15%"
                }} />
            {child}
        </Components.DimmedImage>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}