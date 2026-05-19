import { capitalize, Theme } from "@/DocelClient";

export default function OrderOption({statusName = "loading...", register = Date.now(), delivery = Date.now(), onClick = () => {}}) {  
    const rdate = new Date(register);
    const ddate = new Date(delivery);

    const data = {
        statusName: statusName,
        register: rdate.getDay() + "/" + rdate.getMonth() + "/" + rdate.getFullYear(),
        delivery: ddate.getDay() + "/" + ddate.getMonth() + "/" + ddate.getFullYear()
    };
    
    return (<div className="order-option" onClick={onClick} style={{
        borderColor: Theme.PRIMARY,
        color: Theme.PRIMARY
    }}>
        <div>Estado: <br/> {capitalize(data.statusName)}</div>
        <div>Registro: <br/> {data.register}</div>
        <div>Entrega: <br/> {data.delivery}</div>
    </div>);
}