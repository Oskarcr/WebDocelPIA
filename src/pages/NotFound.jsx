import { Components, FontSize } from "@/DocelCore";

export default function NotFound() {
    return (<Components.Main>
        <Components.TextBox 
            style={{
                width: "100%",
                height: "50%"
            }}
            alignment="center"
            fontSize={FontSize.XL2}
            content="Not found :("
        />
    </Components.Main>);
}