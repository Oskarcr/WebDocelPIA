import { Components, Theme } from "@/DocelClient";
import "../css/styles.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Shopping() {
    const [options, setOptions] = useState([]);
    const didFetch = useRef(false);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const response = await axios.get("api/furnitures/all");
                setOptions(response.data.map(json => {
                    return <Components.ShoppingItem
                        path={"/product/" + json.id}
                        src={"/attachments/" + json.imageUrl}
                        name={json.name}
                        price={json.price}
                    />
                }));
            } 
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (<Components.Main horizontal>
        <Components.Column color={Theme.ACCENT}/>
        <div className="shopping-main-container" style={{
            backgroundColor: Theme.BACKGROUND.SURFACE
        }}>
            <div style={{
                backgroundColor: Theme.ACCENT,
                outline: "2px solid " + Theme.ACCENT,
                overflow: "scroll",
            }}
            onWheel={(evt) => {
                evt.currentTarget.scrollLeft += evt.deltaY;
            }}>
                {options}
            </div>
        </div>
        <Components.Column color={Theme.BLACK}/>
    </Components.Main>);
}