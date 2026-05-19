import { capitalize, Theme } from "@/DocelClient";

export default function OrderOption({
    statusName = "Desconocido", 
    register = "???", 
    delivered = "???",
    onClick = () => {}
}) {  
    const data = {
        statusName,
        register,
        delivered
    };
    
    return (<div className="order-option" onClick={onClick} style={{
        borderColor: Theme.PRIMARY,
        color: Theme.PRIMARY
    }}>
        <div>Estado: <br/> {capitalize(data.statusName)}</div>
        <div>Registro: <br/> {data.register}</div>
        <div>Entrega: <br/> {data.delivered}</div>
    </div>);
}