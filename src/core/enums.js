const OrderStatus = {
    /**
     * Es cuando el cliente envia una solicitud
     * de una compra.
     * @readonly
     */
    PENDING: 1,

    /**
     * Es cuando el empleado le asigna un precio
     * a la solicitud y completa los datos faltantes.
     * @readonly
     */
    RETURNED: 2,

    /**
     * Es cuando el cliente paga su orden y se
     * confirma la compra
     * @readonly
     */
    ACCEPTED: 3,

    /**
     * Es cuando el empleado rechaza la solicitud
     * por algun motivo.
     * @readonly
     */
    REJECTED: 4,

    /**
     * Es cuando el cliente cancela el pedido.
     * @readonly
     */
    CANCELED: 5,

    /**
     * Es cuando el pedido se entrego con exito.
     * @readonly
     */
    CONCLUDED: 6,

    /**
     * Convierte en string el nombre de un valor de este enum.
     * @param {number} n 
     */
    toString(n) {
        const map = {
            [this.PENDING]: "Pendiente",
            [this.RETURNED]: "Devuelto",
            [this.ACCEPTED]: "Aceptado",
            [this.REJECTED]: "Rechazado",
            [this.CANCELED]: "Cancelado",
            [this.CONCLUDED]: "Concluido"
        };
        return map[n] ?? "Desconocido";
    }
};

Object.freeze(OrderStatus);

const UserRole = {
    /**
     * El tipo de usuario por defecto, puede realizar
     * pedidos y realizar compras.
     * @readonly
     */
    CLIENT: 1,

    /**
     * Es un usuario que se encarga de los servicios de
     * atencion al cliente, como los pedidos o compras.
     * @readonly
     */
    EMPLOYEE: 2,

    /**
     * Es un usuario que se encarga de asignar los
     * roles a los usuarios.
     * @readonly
     */
    ADMINISTRATOR: 3,

    /**
     * Convierte en string el nombre de un valor de este enum.
     * @param {number} n 
     */
    toString(n) {
        const map = {
            [this.CLIENT]: "Cliente",
            [this.EMPLOYEE]: "Empleado",
            [this.ADMINISTRATOR]: "Administrador"
        };
        return map[n] ?? "Desconocido";
    }
};

Object.freeze(UserRole);

const FinishType = {
    /**
     * Tipo de acabado barniz.
     * @readonly
     */
    VARNISH: 1,

    /**
     * Tipo de acabado laca.
     * @readonly
     */
    LACQUER: 2,

    /**
     * Tipo de acabado poliuretano.
     * @readonly
     */
    POLYURETHANE: 3,

    /**
     * Convierte en string el nombre de un valor de este enum.
     * @param {number} n 
     */
    toString(n) {
        const map = {
            [this.VARNISH]: "Barniz",
            [this.LACQUER]: "Laca",
            [this.POLYURETHANE]: "Poliuretano"
        };
        return map[n] ?? "Desconocido";
    }
};

Object.freeze(FinishType);

export {
    OrderStatus,
    UserRole,
    FinishType
};