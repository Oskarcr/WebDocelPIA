import { Theme } from "@/DocelCore";

/**
 * @typedef ColumnParams
 * @property {import("react").CSSProperties} style
 * @property {string | null} color
 * @property {boolean} horizontal
 */

/**
 * @param {ColumnParams} param0 
 */
export default function Column({color = Theme.BLACK, style = {}, horizontal}) {
    const HEIGHT = 60;
    style.backgroundColor = color;
    style.width = (horizontal ? "100%" : HEIGHT + "px");
    style.height = (!horizontal ? "100%" : HEIGHT + "px");
    style.zIndex = "99";
    return (<div style={style}/>);
}