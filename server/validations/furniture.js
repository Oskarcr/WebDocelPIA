import { FinishType } from "#DocelServer";
import RequestValidator from "./RequestValidator.js";

const furniture = new RequestValidator({
    name: {
        label: "nombre",
        type: String,
        validate: (name) => {
            const trimmed = name.trim();
            if (trimmed.length < 2) {
                return "El nombre tiene que tener por lo menos 2 caracteres.";
            }
            if (trimmed.length > 50) {
                return "El nombre supera el limite de 50 caracteres.";
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/.test(trimmed)) {
                return "El nombre contiene caracteres no validos.";
            }
        }
    },
    price: {
        label: "precio",
        type: Number,
        validate: (price) => {
            if(price < 5) {
                return "El precio debe ser mayor a 5.";
            }
        }
    },
    finishName: {
        label: "acabado",
        type: String,
        validate: (finishName) => {
            const finish = FinishType.fromString(finishName);
            if(!finish) {
                const list = FinishType.labels().map(a => "'" + a + "'").join(" | ");
                return "El tipo de acabado es invalido, debe ser " + list;  
            }
        }
    }
});

export default furniture;