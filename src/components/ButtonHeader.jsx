export default function ButtonHeader({name = ""}) {
    return (<button className="header-button" style={{
        color: "var(--text-color-secondary)",
        backgroundColor: "transparent"
    }}>{name}</button>);
}