/**
 * @typedef SaleParams
 * @property {number} amount
 * @property {string} username
 * @property {number} date 
 * @property {number} total
 */

import { Theme } from "@/DocelCore";

/**
 * @param {SaleParams} param0 
 */
export default function SaleOption({amount = 1, username = "Oscar", date = Date.now(), total = 100}) {
    const ddate = (new Date(date));
    return (<div className="sale-option" style={{
        borderColor: Theme.PRIMARY,
        backgroundColor: Theme.BACKGROUND.SURFACE,
        color: Theme.PRIMARY,
    }}>
        <div>{"Cantidad: " + amount}</div>
        <div>{"Usuario: " + username}</div>
        <div>{"Fecha: " + ddate.getDay() + "/" + ddate.getMonth() + "/" + ddate.getFullYear()}</div>
        <div>{"Total: $" + total + "MXN"}</div>
    </div>);
}