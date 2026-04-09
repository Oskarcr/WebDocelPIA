export default function ButtonHeader({name = "", isNew = ""}) {
    return (<button className="header-button" style={{
        color: "var(--text-color-secondary)",
        backgroundColor: "transparent"
    }}>{name}</button>);
}