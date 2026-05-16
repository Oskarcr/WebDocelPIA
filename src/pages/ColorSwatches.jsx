import { Components, FontSize, getAverageColor, Spacing, Theme } from "@/DocelClient";
import axios, { formToJSON } from "axios";
import { useEffect, useRef, useState } from "react";

function ColorEdit({
    onCancel = () => {},
    colorJSON={
        id: "",
        hexReference: "#00000000",
        name: "",
        basePrice: ""
    },
}) {
    /**@type {React.RefObject<HTMLFormElement>} */
    const formRef = useRef(null);
    /**@type {import("react").RefObject<HTMLInputElement>} */
    const pickerRef = useRef(null);
    /**@type {import("react").RefObject<HTMLInputElement>} */
    const colorRef = useRef(null);
    const overlayRef = useRef(null);
    const [lastTarget, setLastTarget] = useState(null);

    const handleImage = () => {
        const file = pickerRef.current.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const color = getAverageColor(img);
                colorRef.current.value = color;
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async () => {
        const data = new FormData(formRef.current);
        try {
            const adding = !colorJSON.id;
            if(adding) {
                await axios.post("/api/colors/", formToJSON(data));
            }
            else {   
                data.set("id", colorJSON.id);
                await axios.patch("/api/colors/", formToJSON(data));
            }
            window.location.reload();
        }
        catch(error) {
            console.log(error);
            alert(JSON.stringify(error.response.data));
        }
    }

    return <div 
        ref={overlayRef} 
        className="modal-color-edit-overlay" 
        onMouseDown={(evt) => {
            setLastTarget(evt.target);
        }}
        onMouseUp={(evt) => {
            if(lastTarget == evt.target) {  
                const target = evt.target;
                if(target === overlayRef.current) {   
                    onCancel();
                }
            }
            setLastTarget(null);
        }}
    >
        <input 
            ref={pickerRef} 
            type="file" 
            accept="image/*" 
            onChange={handleImage}
            style={{
                display: "none"
            }}
        />
        <form ref={formRef} className="modal-color-edit-content">
            <Components.TextBox
                content="ASIGNAR COLOR"
                fontSize={FontSize.LG}
            />
            <input name="name" type="text" placeholder="Nombre" defaultValue={colorJSON.name}/>
            <input name="basePrice" type="number" placeholder="Precio base" defaultValue={colorJSON.basePrice}/>
            <Components.TextBox content="COLOR"/>
            <input name="hexReference" ref={colorRef} type="color" style={{
                width: "100%"
            }} defaultValue={colorJSON.hexReference}/>
            <button type="button" onClick={() => pickerRef.current.click()}>CARGAR COLOR POR IMAGEN</button>
            <Components.TextBox content="FINALIZAR"/>
            <button type="button" onClick={handleSubmit}>ACEPTAR</button>
            <button type="button" onClick={onCancel} >CANCELAR</button>
        </form>
    </div>
}

export default function ColorSwatches() {
    const [options, setOptions] = useState([]);
    const [editingColorJSON, setEditingColorJSON] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("api/colors/all");
                setOptions(response.data.map(json => {
                    return <Components.ColorItem
                        colorJSON={json}
                        onClick={() => {
                            setEditingColorJSON(json);
                        }}
                    />
                }));
            } 
            catch (error) {
                console.error(error);
            }
        })();
    }, []);
    
    const onPickerAccept = () => {
        setEditingColorJSON(null);
    }

    const onPickerCancel= () => {
        setEditingColorJSON(null);
    }

    return <>
        {editingColorJSON && (
            <ColorEdit 
                colorJSON={editingColorJSON} 
                onAccept={onPickerAccept} 
                onCancel={onPickerCancel}
            />
        )}
        <Components.Main horizontal inverted> 
            <Components.Column color={Theme.PRIMARY}/>
                <Components.Flex column>
                    <Components.DimmedImage
                    style={{
                        height: "140px"
                    }}
                        childStyle={{
                        height: "100%",
                        padding: Spacing.SM,
                        boxSizing: "border-box"
                        }} 
                        src="https://d38qrl83hrqn1t.cloudfront.net/media/catalog/product/cache/e5313a059d82e47a0dd0c73b13afb6be/m/u/mueble-tv-160cm-cairo-nogal-decorado-cto40669s1-1_principal.jpg"
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "60%",
                            minWidth: "500px",
                            height: "100%",
                            marginInline: "auto",
                        }}>
                            <Components.TextBox 
                                style={{
                                    marginBottom: "auto",
                                    height: "100%"
                                }}
                                alignment="center-left"
                                fontSize={FontSize.XL1}
                                color={Theme.TEXT.SECONDARY}
                                content="MUESTRAS DE COLOR"
                            />
                        </div>
                    </Components.DimmedImage>
                    <div style={{
                        padding: Spacing.LG,
                        boxSizing: "border-box",
                        flex: 1,
                        backgroundColor: Theme.BACKGROUND.MAIN,
                        gap: Spacing.LG,
                        display: "grid",
                        alignItems: "start",
                        gridTemplateColumns: "repeat(auto-fill, minmax(200px, auto))",
                        overflow: "auto"
                    }}>
                        <Components.ColorItem 
                            onClick={() => setEditingColorJSON({})}
                            name="Agregar nuevo"
                        />
                        {options}
                    </div> 
                </Components.Flex>
            <Components.Column color={Theme.SECONDARY}/>
        </Components.Main>
    </>;
}