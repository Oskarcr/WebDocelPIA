import { Components, FontSize, getAverageColor, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function ColorEdit({
    onCancel = () => {},
    onAccept = () => {} 
}) {
    /**@type {import("react").RefObject<HTMLInputElement>} */
    const pickerRef = useRef(null);
    
    /**@type {import("react").RefObject<HTMLInputElement>} */
    const colorRef = useRef(null);

    const overlayRef = useRef(null);

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

    /**
     * @param {PointerEvent} evt 
     */
    const onc = (evt) => {
       const target = evt.target;
       if(target !== overlayRef.current) return;
       onCancel();
    }

    return <div ref={overlayRef} className="modal-color-edit-overlay" onClick={onc}>
        <input 
            ref={pickerRef} 
            type="file" 
            accept="image/*" 
            onChange={handleImage}
            style={{
                display: "none"
            }}
        />
        <div className="modal-color-edit-content">
            <Components.TextBox
                content="ASIGNAR COLOR"
                fontSize={FontSize.LG}
            />
            <input type="text" placeholder="Nombre"/>
            <input type="number" placeholder="Precio base"/>
            <Components.TextBox content="COLOR"/>
            <input ref={colorRef} type="color" style={{
                width: "100%"
            }}/>
            <button onClick={() => pickerRef.current.click()}>CARGAR COLOR POR IMAGEN</button>
            <Components.TextBox content="FINALIZAR"/>
            <button onClick={onAccept}>ACEPTAR</button>
            <button onClick={onCancel} >CANCELAR</button>
        </div>
    </div>
}

export default function ColorSwatches() {
    const [options, setOptions] = useState([]);
    const [pickerOpen, setPickerOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("api/colors/all");
                setOptions(response.data.map(json => {
                    return <Components.ColorItem
                        onClick={() => setPickerOpen(true)}
                        hexReference={json.hexReference}
                        name={json.name}
                    />
                }));
            } 
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const onPickerAccept = () => {
        setPickerOpen(false);
    }

    const onPickerCancel= () => {
        setPickerOpen(false);
    }

    return <>
        {pickerOpen && (
            <ColorEdit onAccept={onPickerAccept} onCancel={onPickerCancel}/>
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
                            onClick={() => setPickerOpen(true)}
                            name="Agregar nuevo"
                        />
                        {options}
                    </div> 
                </Components.Flex>
            <Components.Column color={Theme.SECONDARY}/>
        </Components.Main>
    </>;
}