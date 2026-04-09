import { Components, Theme } from "@/DocelCore";

const tmp = [
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
    {folio: 1, date: Date.now(), income : 10000},
];

const elements = tmp.map(a => {
    const ddate = new Date(a.date); 
    const date = ddate.getDate() + "/" + ddate.getMonth() + "/" + ddate.getFullYear();
    const income = "$" + a.income +  "MXN";
    return [a.folio, date, income];
});

export default function Reports() {
    return (<Components.Main horizontal>
        <Components.Column/>
            <Components.Flex column>
                <Components.DimmedImage 
                    style={{
                        width: "100%",
                        height: "20%"
                    }}
                    childStyle={{
                        width: "100%",
                        height: "100%"
                    }}
                    src="https://media.istockphoto.com/id/916076720/es/foto/empresario-da-cuenta-dinero-billetes-de-yen-japonés-en-el-escritorio.jpg?s=612x612&w=0&k=20&c=FqEsDRbABPvMqFpRjOLcnzuc4ss4leoJSc-He7LOBDw="
                >
                    <Components.TextBox 
                        style={{
                            padding: "20px",
                            height: "100%",
                            width: "80%",
                            marginInline: "auto"
                        }}
                        fontSize="3.2rem"
                        alignment="bottom-left"
                        color={Theme.TEXT.SECONDARY}
                        content="REPORTES DOCEL"
                    />
                </Components.DimmedImage>
                <Components.Flex column style={{
                    padding: "30px",
                    width: "60%",
                    minWidth: "700px",
                    height: "100%",
                    boxSizing: "border-box",
                    marginInline: "auto"
                }}>
                    
                    <Components.Flex row style={{
                        boxSizing: "border-box"
                    }}>
                        <Components.Table 
                            style={{
                                flex: 1,
                            }}
                            head={["Folio", "Fecha", "Ingresos"]}
                            elements={elements}
                        />
                    </Components.Flex>
                </Components.Flex>
            </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}