import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import { Link as RouterLink } from "react-router-dom";

/**
 * @param {{
 * title: string
 * path: string
 * style: React.CSSProperties
 * hasInput: boolean
 * onClick: function
 * children: React.ReactNode
 * }}
 */
export default function PortalCard({ title = "", path = "", style = {}, hasInput = false, children, onClick = () => {}}) {
    const handleClick = (evt) => {
        if (evt.target !== evt.currentTarget) {
            if (evt.target.tagName === "INPUT") {
                evt.preventDefault();
                console.log(evt.target);
                return;
            }
        }

        onClick(evt);
    };
    
    if(!path){
        <div className="portal-item" to={path} onClick={handleClick} style={{
            outline: "1px solid " + Theme.ACCENT,
            ...style
        }}>
            <Components.TextBox fontSize={FontSize.MD} alignment="center-left" color={Theme.PRIMARY} content={title} style={{width: hasInput ? "45%" : "90%"}}/>
            {children}
            <Components.TextBox fontSize={FontSize.MD} alignment="center-right" color={Theme.PRIMARY} content=">" style={{
                width: "10%",
                padding: Spacing.MD
                }}/>
        </div>
    }

    return (
        <RouterLink className="portal-item" to={path} onClick={handleClick} style={{
            outline: "1px solid " + Theme.ACCENT,
            ...style
        }}>
            <Components.TextBox fontSize={FontSize.MD} alignment="center-left" color={Theme.PRIMARY} content={title} style={{width: hasInput ? "45%" : "90%"}}/>
            {children}
            <Components.TextBox fontSize={FontSize.MD} alignment="center-right" color={Theme.PRIMARY} content=">" style={{
                width: "10%",
                padding: Spacing.MD
                }}/>
        </RouterLink>
    )
}