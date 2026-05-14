import Enumerable from "./Enumerable.js";

class OrderStatusEnum extends Enumerable {
    /**
     * Es cuando el cliente envia una solicitud
     * de una compra.
     * @readonly
     */
    PENDING = 1;

    /**
     * Es cuando el empleado le asigna un precio
     * a la solicitud y completa los datos faltantes.
     * @readonly
     */
    RETURNED = 2;

    /**
     * Es cuando el cliente paga su orden y se
     * confirma la compra
     * @readonly
     */
    ACCEPTED = 3;

    /**
     * Es cuando el empleado rechaza la solicitud
     * por algun motivo.
     * @readonly
     */
    REJECTED = 4;

    /**
     * Es cuando el cliente cancela el pedido.
     * @readonly
     */
    CANCELED = 5;

    /**
     * Es cuando el pedido se entrego con exito.
     * @readonly
     */
    CONCLUDED = 6;

    buildMap() {
        return {
            "pendiente": this.PENDING,
            "devuelto": this.RETURNED,
            "aceptado": this.ACCEPTED,
            "rechazado": this.REJECTED,
            "cancelado": this.CANCELED,
            "concluido": this.CONCLUDED
        };
    }
}

const OrderStatus = new OrderStatusEnum();

Object.freeze(OrderStatus);

export default OrderStatus;