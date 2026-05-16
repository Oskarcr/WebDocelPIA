import { capitalize, Components, FontSize, Spacing, Theme } from "@/DocelClient";

export default function ColorItem({
    colorJSON={
        id: "",
        hexReference: "#00000000",
        name: "agregar nuevo"
    },
    onClick,
}) {
    return <div onClick={onClick} className="color-item">
        <Components.TextBox
            alignment="center"
            color={Theme.TEXT.SECONDARY}
            content={capitalize(colorJSON.name)}
            style={{
                flexShrink: 0,
                height: "60px",
                margin: "auto"
            }}
        />
        <div className="color-item-preview" style={{
            backgroundColor: colorJSON.hexReference
        }}>

        </div>
    </div>
}