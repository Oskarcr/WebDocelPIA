import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useRef } from "react";
import { useParams } from "react-router-dom";

function ProductPage() {
    const refs = {
        name: useRef(null),
        finishName: useRef(null),
        price: useRef(null)
    };

    const onAccept = async () => {
        const json = {
            name: refs.name.current.value,
            finishName: refs.finishName.current.value,
            price: parseInt(refs.price.current.value),
        };
        try {

        const json = {
            name: refs.name.current.value,
            finishName: refs.finishName.current.value.toLowerCase(),
            price: parseInt(refs.price.current.value),
        };

        const response = await axios.post("/api/furniture", json);
            alert(JSON.stringify(response.data));
        } catch(err) {
            alert(JSON.stringify(err.response.data));
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
            <input ref={refs.name} placeholder="Nombre del mueble" />
            <input ref={refs.finishName} placeholder="Tipo de acabado" />
            <input ref={refs.price} placeholder="Precio del mueble" />
            <button>SUBIR IMAGEN</button>
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