import "../core/theme.js"
import Theme from "../core/theme.js"

export default function ButtonHeader({className,name}) {
    return (
        <>
            <button className={className} style={{
                color: Theme.TEXT.SECONDARY,
                backgroundColor: Theme.PRIMARY
                }}>{name}</button>
        </>
    )
}