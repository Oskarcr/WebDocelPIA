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
                return "El tipo de acabado es invalido, debe ser " + list + ".";
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