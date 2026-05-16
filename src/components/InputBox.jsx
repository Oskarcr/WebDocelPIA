import { Components, FontSize, Spacing, Theme } from "@/DocelClient"
import { useState } from "react"

export default function InputBox({ title = "", placeholder = "", onClose = () => { }, onConfirm = () => { } }) {
const [value, setValue] = useState("");

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999
        }}
        >
            <div style={{
                width: "80%",
                maxWidth: "500px",
                minWidth: "300px",
                padding: Spacing.LG,
                borderRadius: "8px",
                backgroundColor: Theme.BACKGROUND.MAIN
            }}
            >
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
                        flexDirection: "row"
                    }}>
                        <button onClick={onClose} style={{
                            display: "flex",
                            marginInline: "auto",
                            color: Theme.BACKGROUND.MAIN
                        }}>
                            Cancelar
                        </button>

                        <button onClick={() => onConfirm(value)} style={{
                            display: "flex",
                            marginInline: "auto",
                            color: Theme.BACKGROUND.MAIN
                        }}>
                            Confirmar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}