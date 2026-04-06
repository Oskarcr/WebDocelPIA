import { Theme } from "@/DocelCore";

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