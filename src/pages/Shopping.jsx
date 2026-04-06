import "../css/styles.css"
import { useNavigate } from "react-router-dom"

const navigate = useNavigate();

export default function Shopping() {
    return (
        <>
            <div class="header-wrapper">
                <h1>DoCeL</h1>
                <Link>
                    <button class="header-button">Inicio</button>
                </Link>
                <Link>
                    <button class="header-button">Pedidos</button>
                </Link>
                <Link>
                    <button class="header-button">Muebles</button>
                </Link>
                <Link>
                    <button class="header-button">Perfil</button>
                </Link>
            </div>
            <div id="furniture-wrapper">
                <div id="furniture-content"></div>
            </div>
        </>
    )
}