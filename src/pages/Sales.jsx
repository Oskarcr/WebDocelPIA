import { Components, Theme } from "@/DocelCore"

export default function Sales() {
    // Temporal
    const children = [];
    for(let i = 0; i < 12; i++) {
        children.push(<Components.SaleOption/>);
    }

    return (<Components.Main horizontal> 
        <Components.Column color={Theme.BLACK}/>
        <Components.Flex column>
            <Components.TextBox
                style={{
                    height: "100px",
                    borderBottom: "3px solid",
                    borderColor: Theme.PRIMARY
                }} 
                alignment="center"
                fontSize="2.0rem"
                content="VENTAS DOCEL"
            />
            <Components.Flex column style={{
                gap: "30px",
                overflowY: "scroll"
            }}>   
                {children}
            </Components.Flex>
        </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}