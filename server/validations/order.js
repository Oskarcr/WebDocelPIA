import { OrderStatus, RequestValidator } from "#DocelServer";
import { isValidObjectId } from "mongoose";

const order = new RequestValidator({
    statusName: {
        label: "estado",
        type: String,
        normalize: (a) => a.trim(),
        validate: (statusName) => {
            const status = OrderStatus.fromLabel(statusName);
            if(!status) {
                const list = OrderStatus.labels().map(a => "'" + a + "'").join(" | ");    
                return "El tipo de acabado es invalido, debe ser " + list;
            }
        }
    },
    furnituresIds: {
        label: "muebles",
        type: Array,
        validate: (furnituresIds) => {
            if(furnituresIds.length > 4) {
                return "Cada pedido puede tener un máximo de 4 muebles.";
            }

            for(let i = 0; i < furnituresIds.length; i++) {
                if(!isValidObjectId(furnituresIds[i])) {
                    return "El mueble no. " + (i + 1) + " no tiene un identificador valido.";
                }
            }
        }
    },
    userId: {
        label: "usuario",
        type: String,
        validate: (userId) => {
            if(!isValidObjectId(userId)) {
                return "El identificador de usuario proporcionado no es valido.";
            }
        }
    },
    comment: {
        label: "comentario",
        type: String,
        normalize: (a) => a.trim().replace(/\s+/, " "),
        validate: (comment) => {
            if(comment.length <= 10) {
                return "El comentario tiene que tener minimo 10 caracteres.";
            }
            if(comment.length > 240) {
                return "El comentario no puede rebasar los 240 caracteres.";
            }
        }
    }
});

export default order;