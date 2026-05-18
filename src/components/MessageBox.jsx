import { Components, FontSize, Spacing, Theme } from "@/DocelClient"

export default function MessageBox({ title = "", content = "", onClose}) {
    return (
        <div onClick={onClose} className="message-box">
            <div className="message-box-content">
                <Components.TextBox 
                    content={title} 
                    fontSize={FontSize.LG} 
                    bold 
                    alignment="center" 
                    style={{
                        color: Theme.PRIMARY
                    }}
                />
                <Components.TextBox 
                    content={content}
                    alignment="center-left"
                    fontSize={FontSize.SM}
                    style={{
                        minHeight: "90px",
                        color: Theme.PRIMARY
                    }}
                />
                <button onClick={onClose}>
                    ACEPTAR
                </button>
                
            </div>
        </div>
    )
}