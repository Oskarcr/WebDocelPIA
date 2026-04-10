/**
 * @typedef DimmedImageParams
 * @property {import("react").CSSProperties} style
 * @property {import("react").CSSProperties} childStyle
 * @property {string} src
 * @property {string} className
 * @property {string} childClassName
 * @property {string} device
 * @property {string} orientation
 */

/**
 * @param {DimmedImageParams} param0 
 */
export default function DimmedImage({orientation = null, device=null, src = "", className="", style = {}, childClassName="", childStyle = {}, children}) {
    if(!style.position) style.position = "relative";
    style.boxShadow = "var(--box-shadow)";
    style.overflow = "hidden";
    Object.assign(childStyle, {
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 2
    });
    return <div 
    data-device={(device !== null ? device : undefined)} 
    data-orientation={(orientation !== null ? orientation : undefined)} 
    className={className} 
    style={style}>
        <div className={childClassName} style={childStyle}>
            {children}
        </div>
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: 1,
            opacity: 0.5
        }}></div>
        <img src={src} style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0
        }}/>
    </div>
}