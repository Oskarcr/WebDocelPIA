import { FontSize, Theme } from "@/DocelCore";
import { useNavigate } from "react-router-dom";


/**
 * @typedef TableParams
 * @property {JSX.Element[]} head
 * @property {JSX.Element[][]} elements
 * @property {import("react").CSSProperties} style
 * @property {import("react").CSSProperties} headStyle
 * @property {import("react").CSSProperties} elementsStyle
 * @property {string} size
 * @property {string} fontSize 
 * @property {string} color
 * @property {string} backgroundColor
 */

/**
 * @param {TableParams} param0 
 */
export default function Table({
    color = Theme.PRIMARY,
    size = "var(--box-size)",
    fontSize = FontSize.SM,
    backgroundColor = Theme.BACKGROUND.SURFACE,
    rowActiveColor = Theme.ACCENT,
    head = ["Test", "Test2"],
    elements = [["body1", "body2"], [null, "body3"]],
    style = {},
    headStyle = {},
    elementsStyle = {}
}) {
const navigate = useNavigate();
    const headElements = [];
    const hlen = head.length;

    for (let i = 0; i < hlen; i++) {
        headElements.push(<th style={{
            padding: "12px",
            outline: "1px solid" + color,
            height: size,
            ...headStyle
        }}>
            {(head[i] ?? head[i])}
        </th>);
    }

    const bodyElements = [];

    for (let i = 0; i < elements.length; i++) {
        if (!Array.isArray(elements[i])) elements[i] = [];
        bodyElements[i] = [];
        for (let j = 0; j < hlen; j++) {
            bodyElements[i].push(<td style={{
                padding: "12px",
                border: "5px solid " + Theme.PRIMARY,
                height: size,
                ...elementsStyle
            }}>
                {elements[i][j] ?? elements[i][j]}
            </td>);
        }
    }

    return (<div style={{
        position: "relative",
        overflowY: "auto",
        boxSizing: "border-box",
        outline: "inset 3px solid" + Theme.PRIMARY,
        boxShadow: "var(--box-shadow)",
        "--tr-active-color": rowActiveColor,
        ...style
    }} onClick={() => {navigate("/sales")}}>
        <table style={{
            borderCollapse: "collapse",
            backgroundColor: backgroundColor,
            tableLayout: "fixed",
            fontSize: fontSize,
            width: "100%",
        }}>
            <thead style={{
                outline: "3px solid" + Theme.PRIMARY,
                backgroundColor: color
            }}>   
                <tr>
                    {headElements}
                </tr>
            </thead>
            <tbody style={{
                color: color
            }}>
                {bodyElements.map(a => 
                <tr style={{ cursor: "pointer" }}>{a}</tr>
                )}
            </tbody>
        </table>
    </div>);
}