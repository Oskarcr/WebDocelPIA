const Theme = {
    /**
     * Es el color primario de la aplicacion, un tono
     * oscuro, ideal para botones.
     * @readonly
     */
    PRIMARY: "#754a32",

    /**
     * Es un color que apoya al `PRIMARY`, ideal para botones
     * extras / tono de ayuda.
     * @readonly
     */
    SECONDARY: "#a07258",

    /**
     * Es un color para llamar la atencion a pequeños detalles, 
     * pero sin ser tan intenso como `PRIMARY` o `SECONDARY`.
     * @readonly
     */
    ACCENT: "#d1ac98",

    /**
     * Es el color negro, simplemente eso.
     * @readonly
     */
    BLACK: "#000000",

    /**
     * Es una estructura que sirve para guardar colores
     * relacionados al fondo.
     * @readonly
     */
    BACKGROUND: {
        /**
         * Color principal de los fondos.
         * @readonly
         */
        MAIN: "#ffffff",

        /**
         * Color que sirve como apoyo para no usar `BACKGROUND.MAIN`.
         * @readonly
         */
        SURFACE: "#f0ddd5"
    },

    /**
     * Es una estructura que ayuda a guardar colores relacionados a los
     * textos de la aplicacion.
     * @readonly
     */
    TEXT: {
        /**
         * Color oscuro para el texto.
         * @readonly
         */
        PRIMARY: "#000000",

        /**
         * Color claro para el texto.
         * @readonly
         */
        SECONDARY: "#ffffff"
    }
};

Object.freeze(Theme);
Object.freeze(Theme.BACKGROUND);
Object.freeze(Theme.TEXT);

export default Theme;