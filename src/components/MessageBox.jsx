import { Components, FontSize, Spacing, Theme } from "@/DocelClient"

export default function MessageBox({ title = "", content = "", onClose}) {


    return (
        <div onClick={onClose} style={{
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
                <div>
                    <Components.TextBox content={title} fontSize={FontSize.LG} bold alignment="center" style={{
                        color: Theme.PRIMARY
                    }}/>
                    <Components.TextBox content={content} fontSize={FontSize.SM} style={{
                        color: Theme.PRIMARY
                    }}/>

                    <button onClick={onClose} style={{
                        display: "flex",
                        marginInline: "auto",
                        color: Theme.BACKGROUND.MAIN
                    }}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}