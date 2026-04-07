import { Components, Theme } from "@/DocelCore";

/**
 * @typedef MainParams
 * @property {boolean} horizontal Si se encuentra, el contenido se apilara como `row`, sino `column`.
 * @property {boolean} inverted Si esta activo, el header estara en el color inverso.
 */

/**
 * @param {MainParams} param0 
 */
export default function Main({horizontal = false, inverted = false, children}) {
    return (<div style={{
        backgroundColor: Theme.BACKGROUND.MAIN,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    }}>
        <Components.Header inverted={inverted}/>
        <div style={{
            flex: 1,
            display: "flex",
            flexDirection: (horizontal ? "row" : "column"),
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }}>
            {children}
        </div>
    </div>);
}