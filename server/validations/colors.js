import { RequestValidator } from "#DocelServer";

const colors = new RequestValidator({
    "name": {
        label: "nombre",
        type: String,
        normalize: (a) => a.trim().toLowerCase().replace(/\s+/g, " "),
        validate: (name) => {
            const colorNameRegex = /^[\p{L}\s]{3,100}$/u;
            const validColorName = colorNameRegex.test(name);
            if(!validColorName) return "El nombre del color no es valido.";
        }
    },
    "hexReference": {
        label: "color",
        type: String,
        normalize: (a) => a.trim(),
        validate: (color) => {
            const colorRegex = /^#[0-9A-Fa-f]{6}$/;
            const validColor = colorRegex.test(color);
            if(!validColor) return "Referencia hexadecimal no valida.";
        }
    },
    "basePrice": {
        label: "precio",
        type: Number,
        validate: (price) => {
            if(price <= 0) return "El precio no puede ser 0 o negativo.";
            if(price > 5000) return "El precio no puede ser mayor a $5000MXN.";
        }
    }
});

export default colors;