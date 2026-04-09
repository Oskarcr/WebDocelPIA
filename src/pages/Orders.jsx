import { Components, Theme } from "@/DocelCore";

export default function Orders() {
    // Temporal
    const children = [];
    for(let i = 0; i < 12; i++) {
        children.push(<Components.OrderOption status={1 + Math.round(Math.random() * 5)}/>);
    }

    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                gap: "20px",
                paddingTop: "20px",
                borderRadius: "8px",
                boxSizing: "border-box",
                overflow: "scroll"
            }}>
                {children}
            </div>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}