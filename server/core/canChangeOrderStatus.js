import { OrderStatus } from "#DocelServer";

/**
 * Retorna `true` si el estado `current` se puede poner como `target`.
 * @param {number | undefined | null} current 
 * @param {number} target 
 */
export default function canChangeOrderStatus(current = null, target) {
    const values = OrderStatus.values();
    if(!values.includes(target)) return false;
    if(!current) return target === OrderStatus.PENDING;
    // Ver para cual es el que quiere pasar.
    switch(target) {
        case OrderStatus.RETURNED:
            return current === OrderStatus.PENDING;
        case OrderStatus.ACCEPTED:
            return current === OrderStatus.RETURNED;
        case OrderStatus.REJECTED:
            return current === OrderStatus.PENDING;
        case OrderStatus.CANCELED:
            return current === OrderStatus.PENDING || current === OrderStatus.RETURNED;
        case OrderStatus.CONCLUDED:
            return current === OrderStatus.ACCEPTED;
    }
    return false;
}