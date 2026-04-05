import "../css/styles.css"

export default function Furniture() {
    return (
        <>
            <div class="header-wrapper">
                <h1>DoCeL</h1>
                    <button class="header-button">Inicio</button>
                    <button class="header-button">Pedidos</button>
                    <button class="header-button">Muebles</button>
                    <button class="header-button">Perfil</button>
            </div>
            <div id="furniture-wrapper">
                <div id="furniture-content"></div>
            </div>
        </>
    )
}