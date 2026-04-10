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
        backgroundColor: Theme.BACKGROUND.MAIN,
        color: Theme.PRIMARY
    }}>
        <div>{"Cantidad"} <br/> {amount}</div>
        <div>{"Usuario"} <br/> {username}</div>
        <div>{"Fecha"} <br/> {ddate.getDay() + "/" + ddate.getMonth() + "/" + ddate.getFullYear()}</div>
        <div>{"Total"} <br/> {total + "MXN"}</div>
    </div>);
}