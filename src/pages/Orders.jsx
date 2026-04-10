import { Components, FontSize, Spacing, Theme } from "@/DocelCore";

export default function Orders() {
    // Temporal
    const children = [];
    for(let i = 0; i < 4; i++) {
        children.push(<Components.OrderOption status={1 + Math.round(Math.random() * 5)}/>);
    }

    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK}/>
        <div style={{
            flex: 1,
            backgroundColor: Theme.ACCENT,
            overflow: "auto",
        }}>
            <Components.DimmedImage 
                style={{
                    height: "20%",
                    width: "100%"
                }}
                childStyle={{
                    height: "100%",
                    width: "100%"
                }}
                src="https://ecohabitar.org/wp-content/uploads/2019/12/original.jpg"
            >
                <Components.TextBox
                    fontSize={FontSize.XL1}
                    color={Theme.TEXT.SECONDARY}
                    content="PEDIDOS"
                    alignment="center-left"
                    style={{
                        height: "100%",
                        width: "80%",
                        marginInline: "auto"
                    }}
                />
            </Components.DimmedImage>
            <div className="orders-list-container" style={{
                backgroundColor: Theme.ACCENT,
            }}>
                {children}
            </div>
        </div>
        <Components.Column color={Theme.SECONDARY}/>
    </Components.Main>);
}