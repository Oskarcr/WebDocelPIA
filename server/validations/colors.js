import { RequestValidator } from "#DocelServer";

const colors = new RequestValidator({
    "name": {
        label: "nombre",
        type: String,
        validate: (name) => {
            name = name.toLowerCase();
            const colorNameRegex = /^[A-Za-z]{3,100}$/;
            const validColorName = colorNameRegex.test(name);
            if(!validColorName) return "El nombre del color no es valido.";
        }
    },
    "hexReference": {
        label: "color",
        type: String,
        validate: (color) => {
            const colorRegex = /^#[0-9A-Fa-f]{6}$/;
            const validColor = colorRegex.test(color);
            if(!validColor) return "Referencia hexadecimal no valida.";
        }
    },
    "price": {
        label: "precio",
        type: Number,
        validate: (price) => {
            if(price <= 0) return "El precio no puede ser 0 o negativo.";
            if(price > 5000) return "El precio no puede ser mayor a 5000";
        }
    }
});

export default colors;