/**
 * @typedef FlexParams
 * @property {import("react").CSSProperties} style
 * @property {boolean} row
 * @property {boolean} column 
 */

/**
 * @param {FlexParams} param0 
 */
export default function Flex({row = false, column = false, style = {}, children}) {
    if(!row && !column || !column) row = true;
    return (<div style={{
        flex: 1,
        display: "flex",
        flexDirection: (row ? "row" : "column"),
        minHeight: 0,
        minWidth: 0,
        ...style
    }}>
        {children}
    </div>);
}