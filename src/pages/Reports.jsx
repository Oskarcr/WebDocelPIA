import { Components, FontSize, Spacing, Theme } from "@/DocelCore";

const tmp = [
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
                            padding: Spacing.LG,
                            height: "100%",
                            width: "80%",
                            marginInline: "auto"
                        }}
                        fontSize={FontSize.XL1}
                        alignment="bottom-left"
                        color={Theme.TEXT.SECONDARY}
                        content="REPORTES DOCEL"
                    />
                </Components.DimmedImage>
                <div className="report-table-container" style={{
                    padding: Spacing.SM
                }}>
                    
                    <Components.Flex row>
                        <Components.Table 
                            head={["Folio", "Fecha", "Ingresos"]}
                            elements={elements}
                        />
                    </Components.Flex>
                </div>
            </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}