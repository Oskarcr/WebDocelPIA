/**
 * @typedef FlexParams
 * @property {import("react").CSSProperties} style
 * @property {boolean} row
 * @property {boolean} column
 * @property {string} className
 */

import { forwardRef } from "react";

/**
 * @param {FlexParams} param0 
 */
const Flex = forwardRef(function({
    className="",
    form = false, 
    row = false, 
    column = false, 
    style = {}, 
    children
}, ref) {
    if(!row && !column || !column) row = true;

    const Comp = form ? "form" : "div";

    return (<Comp 
        ref={ref}
        className={className} 
        style={{
            flex: 1,
            display: "flex",
            flexDirection: (row ? "row" : "column"),
            minHeight: 0,
            minWidth: 0,
            ...style
        }}
    >
        {children}
    </Comp>);
});

export default Flex;