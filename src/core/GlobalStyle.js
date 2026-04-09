import Theme from "./Theme.js";

/**
 * Son los estilos globales de la aplicacion.
 * Se deberian utilizar para pasar variables `CSS`.
 * @type {import("react").CSSProperties}
 */
const GlobalStyle = {
    "--button-background-color": Theme.PRIMARY,
    "--button-active-color": Theme.SECONDARY,
    "--input-border-color": Theme.PRIMARY,
    "--input-active-border-color": Theme.SECONDARY,
    "--input-placeholder-color": Theme.SECONDARY,
    "--text-color-primary": Theme.TEXT.PRIMARY,
    "--text-color-secondary": Theme.TEXT.SECONDARY,
    "--input-background-color": Theme.TEXT.SECONDARY
};

export default GlobalStyle;