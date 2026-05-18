import { Components, FontSize, Spacing, Theme } from "@/DocelClient"
import { useState } from "react"

export default function InputBox({ title = "", placeholder = "", onClose = () => { }, onConfirm = () => { } }) {
const [value, setValue] = useState("");

    return <div className="message-box">
        <div className="message-box-content">
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: Spacing.MD
            }}>
                <Components.TextBox content={title} fontSize={FontSize.LG} bold alignment="center" style={{
                    color: Theme.PRIMARY
                }} />
                <input placeholder={placeholder} fontSize={FontSize.SM} value={value} onChange={(e) => setValue(e.target.value)} style={{
                    color: Theme.PRIMARY
                }} />

                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: Spacing.MD
                }}>
                    <button onClick={onClose} style={{
                        flex: 1,
                        color: Theme.BACKGROUND.MAIN
                    }}>
                        CANCELAR
                    </button>

                    <button onClick={() => onConfirm(value)} style={{
                        flex: 1,
                        marginInline: "auto",
                        color: Theme.BACKGROUND.MAIN
                    }}>
                        CONFIRMAR
                    </button>
                </div>

            </div>
        </div>
    </div>
}