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
    const [message, setMessage] = useState(null);
    
    const adding = !colorJSON.id;

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
            setMessage(error.response.data.errors.join("\\n"));
        }
    }

    const onDelete = async () => {
        try {
            await axios.delete("/api/colors/" + colorJSON.id);
            window.location.reload();
        }
        catch(error) {
            console.error(error);
            setMessage(error.response.data.errors.join("\\n"));
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
        {message && (
            <Components.MessageBox 
            title="Error" 
            content={message} 
            onClose={() => setMessage(null)} 
            />
        )}
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
                content="PROPIEDADES DEL COLOR"
                fontSize={FontSize.LG}
            />
            <input name="name" type="text" placeholder="Nombre" defaultValue={colorJSON.name}/>
            <input name="basePrice" type="number" placeholder="Precio base" defaultValue={colorJSON.basePrice}/>
            <input name="hexReference" ref={colorRef} type="color" style={{
                width: "100%"
            }} defaultValue={colorJSON.hexReference}/>
            <button type="button" onClick={() => pickerRef.current.click()}>CARGAR COLOR POR IMAGEN</button>
            <Components.TextBox content="FINALIZAR"/>
            <button type="button" onClick={handleSubmit}>ACEPTAR</button>
            <button type="button" onClick={onCancel}>CANCELAR</button>

            {!adding && <>
                <Components.TextBox content="ZONA PELIGROSA"/>
                <button type="button" onClick={onDelete}>ELIMINAR</button>
            </>}
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
                        <div className="color-swatches-text-container">
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
                        flex: 1,
                        overflow: "auto"
                    }}>
                        <div className="colors-container">
                            <Components.ColorItem 
                                onClick={() => setEditingColorJSON({})}
                                name="Agregar nuevo"
                            />
                            {options}
                        </div> 
                    </div>
                </Components.Flex>
            <Components.Column color={Theme.SECONDARY}/>
        </Components.Main>
    </>;
}