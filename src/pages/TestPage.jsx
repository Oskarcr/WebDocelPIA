import { Components } from "@/DocelClient";

export default function TestPage () {
    function onCloseHandler(evt){
        console.log("Cancelado");
    }

    function onConfirmHandler(evt){
        console.log("Confirmado");
    }

    return (
        <Components.InputBox title="Contraseña" placeholder="PepeTilinEtesechNiñodeloxxo" onClose={onCloseHandler} onConfirm={onConfirmHandler}/>
    )
}