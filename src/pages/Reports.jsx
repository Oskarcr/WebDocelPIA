import { capitalize, Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

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
    const [reports, setReports] = useState([[]]);
    const didFetch = useRef(false);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        (async () => {
            try {
                const response = await axios.get("/api/reports/all");
                const d = response.data;
                setReports(d.map(a => [
                    a.folio,
                    capitalize(
                        (new Date(a.period).toLocaleDateString("es-MX", { 
                            timeZone: "UTC", 
                            month: "long", 
                            year: "numeric"
                        }))
                    ), 
                    "$" + a.income + " MXN"
                ]));
            } 
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

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
                            elements={reports}
                        />
                    </Components.Flex>
                </div>
            </Components.Flex>
        <Components.Column color={Theme.ACCENT}/>
    </Components.Main>);
}