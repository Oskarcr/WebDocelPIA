import { Components, DELAY_FETCH, FontSize, Spacing, Theme } from "@/DocelClient";
import axios, { formToJSON } from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function ProductPage({
    productJSON = {
        id: "",
        name: "",
        imageUrl: "",
        finishName: "",
        price: "",
        colorName: ""
    },
    onCancel
}) {
    const refs = {
        image: useRef(null),
        /**@type {React.RefObject<HTMLFormElement>} */
        form: useRef(null)
    };

    const onAccept = async () => {
        const data = new FormData(refs.form.current);
        const adding = !productJSON.id;
        try {
            if(adding) {
                await axios.post("/api/furnitures", data);
            }
            else {
                data.set("id", productJSON.id);
                await axios.patch("/api/furnitures", data);
            }
            
            window.location.reload();
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
        
        <Components.Flex 
            ref={refs.form}
            form
            column
            style={{
            width: "100%",
            flex: "unset",
            gap: "20px",
            boxSizing: "border-box",
            padding: Spacing.MD,
            borderRadius: "8px",
            backgroundColor: Theme.BACKGROUND.MAIN,
            flexShrink: 0
        }}>
            <input
                ref={refs.image}
                name="img"
                type="file"
                accept="image/*"
                style={{
                    display: "none"
                }}
            />
            <input name="name" placeholder="Nombre" defaultValue={productJSON.name}/>
            <input name="finishName" placeholder="Tipo de acabado" defaultValue={productJSON.finishName}/>
            <input name="price" placeholder="Precio" defaultValue={productJSON.price}/>
            <input name="colorName" placeholder="Color" defaultValue={productJSON.colorName}/>

            <button type="button" onClick={() => {
                refs.image.current.click();
            }}>SUBIR IMAGEN</button>
            <button type="button" onClick={onAccept}>ACEPTAR</button>
            <button type="button" onClick={onCancel}>CANCELAR</button>
            <Components.TextBox
                content="OTRAS OPCIONES"
            />
            <button type="button">ELIMINAR</button>
        </Components.Flex>
    </div>);
}

export default function ProductManager() {
    const { id } = useParams();
    const [options, setOptions] = useState([]);
    const [editingProductJSON, setEditingProductJSON] = useState(null);
    const didFetch = useRef(false);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const response = await axios.get("/api/furnitures/all");
                setOptions(response.data);
            }
            catch(_) {
                alert("Server error");
            }
        })();
    }, []);

    let child = [];

    if (!id) {
        child.push(
            <button onClick={() => {
                setEditingProductJSON({
                    id: null
                });
            }}>AGREGAR NUEVO</button>
        );
        for (const option of options) {
            child.push(
                <Components.ProductOption
                    onClick={() => {
                        setEditingProductJSON(option);
                    }}
                    src={"attachments/" + option.imageUrl}
                    name={option.name}
                />
            );
        }
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
            {editingProductJSON ? 
            <ProductPage 
                onCancel={() => {
                    setEditingProductJSON(null);
                }}
                productJSON={editingProductJSON}
            /> : child}
        </Components.DimmedImage>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}