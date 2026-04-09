import { FontSize, Theme } from "@/DocelCore";
import { Link as RouterLink } from "react-router-dom";

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
 * @property {string} href
 */

/**
 * @param {TextBoxParams} param0 
 */
export default function TextBox({ content="", fontSize = FontSize.SM, href = null, color = Theme.TEXT.PRIMARY, alignment = "top-left", style = {}}) {
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

    const contentHTML = (<>
        {content.split("\\n").map((a, i) => {
            return (i != 0 ? <><br/>{a}</> : <>{a}</>);
        })}
    </>);

    const pos = positions[alignment] || positions.center;
    /**@type {import("react").CSSProperties} */
    const elementStyle = {
        display: "flex",
        flexDirection: "column",
        fontSize,
        padding: "10px",
        color,
        minHeight: "var(--box-size)",
        boxSizing: "border-box",
        ...pos,
        ...style
    };
    const element = (href !== null ?
        <RouterLink to={href} style={{
            textDecoration: "underline",
            ...elementStyle
        }}>
            {content}
        </RouterLink> :
        <div style={elementStyle}>
            {contentHTML}
        </div>
    );
    return element;
;
}