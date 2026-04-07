import { Components, Theme } from "@/DocelCore";

export default function Main({horizontal = false, children}) {
    return (<div style={{
        backgroundColor: Theme.BACKGROUND.MAIN,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    }}>
        <Components.Header/>
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