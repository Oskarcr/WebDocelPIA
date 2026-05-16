import { capitalize, Components, Spacing, Theme } from "@/DocelClient";

export default function ColorItem({
    colorJSON={
        id: "",
        hexReference: "#00000000",
        name: "agregar nuevo"
    },
    onClick,
}) {
    return <div onClick={onClick} style={{
        width: "180px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        backgroundColor: Theme.PRIMARY,
        boxShadow: "var(--box-shadow)",
        cursor: "pointer",
        overflow: "hidden"
    }}>
        <Components.TextBox
            alignment="center"
            color={Theme.TEXT.SECONDARY}
            content={capitalize(colorJSON.name)}
            style={{
                height: "60px"
            }}
        />
        <div style={{
            padding: Spacing.SM,
            boxSizing: "border-box",
            width: "100%",
            aspectRatio: "1/1",
            marginInline: "auto",
            backgroundColor: colorJSON.hexReference
        }}>

        </div>
    </div>
}