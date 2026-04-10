/**
 * @typedef FlexParams
 * @property {import("react").CSSProperties} style
 * @property {boolean} row
 * @property {boolean} column
 * @property {string} className 
 */

/**
 * @param {FlexParams} param0 
 */
export default function Flex({className="", row = false, column = false, style = {}, children}) {
    if(!row && !column || !column) row = true;
    return (<div className={className} style={{
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