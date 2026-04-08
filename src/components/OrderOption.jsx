import { OrderStatus, Theme } from "@/DocelCore";

export default function OrderOption({status = -1, register = Date.now(), delivery = Date.now()}) {  
    const rdate = new Date(register);
    const ddate = new Date(delivery);

    const data = {
        status: OrderStatus.toString(status),
        register: rdate.getDay() + "/" + rdate.getMonth() + "/" + rdate.getFullYear(),
        delivery: ddate.getDay() + "/" + ddate.getMonth() + "/" + ddate.getFullYear()
    };
    
    return (<div className="order-option" style={{
        borderColor: Theme.PRIMARY,
        backgroundColor: Theme.BACKGROUND.SURFACE,
        color: Theme.PRIMARY,
    }}>
        <div>Estado: {data.status}</div>
        <div>Registro: {data.register}</div>
        <div>Entrega: {data.delivery}</div>
    </div>);
}