
/**
 * @typedef DimmedImageParams
 * @property {import("react").CSSProperties} style
 * @property {import("react").CSSProperties} childStyle
 * @property {string} src
 * @property {string}
 */

/**
 * @param {DimmedImageParams} param0 
 */
export default function DimmedImage({src = "", style = {}, childStyle = {}, children}) {
    style.position = "relative";
    style.boxShadow = "var(--box-shadow)";
    Object.assign(childStyle, {
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 2
    });
    return <div style={style}>
        <div style={childStyle}>
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
            opacity: 0.6
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