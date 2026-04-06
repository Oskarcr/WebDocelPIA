import { Theme } from "@/DocelCore";

/**
 * @typedef {"top-left" | "top-center" | "top-right" | "center-left" | "center" | "center-right" |"bottom-left" | "bottom-center" | "bottom-right"} TextBoxAlignment
 */

/**
 * @typedef TextBoxParams
 * @property {import("react").CSSProperties} style
 * @property {TextBoxAlignment} alignment
 * @property {boolean} bold
 * @property {string} fontSize
 * @property {string} color
 * @property {string} content
 */

/**
 * @param {TextBoxParams} param0 
 */
export default function TextBox({ content="", fontSize = "1.1rem", color = Theme.TEXT.PRIMARY, alignment = "top-left", style = {}}) {
    const positions = {
        "top-left":     { justifyContent: "flex-start", alignItems: "flex-start", textAlign: "left" },
        "top-center":   { justifyContent: "flex-start", alignItems: "center",     textAlign: "center" },
        "top-right":    { justifyContent: "flex-start", alignItems: "flex-end",   textAlign: "right" },
        "center-left":  { justifyContent: "center",     alignItems: "flex-start", textAlign: "left" },
        "center":       { justifyContent: "center",     alignItems: "center",     textAlign: "center" },
        "center-right": { justifyContent: "center",     alignItems: "flex-end",   textAlign: "right" },
        "bottom-left":  { justifyContent: "flex-end",   alignItems: "flex-start", textAlign: "left" },
        "bottom-center":{ justifyContent: "flex-end",   alignItems: "center",     textAlign: "center" },
        "bottom-right": { justifyContent: "flex-end",   alignItems: "flex-end",   textAlign: "right" },
    };
    const pos = positions[alignment] || positions.center;
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            fontSize,
            padding: "10px",
            color,
            minHeight: "var(--box-size)",
            ...pos,
            ...style
        }}>
            {content}
        </div>
    );
}