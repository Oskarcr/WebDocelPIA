import { Components, FontSize, Theme } from "@/DocelClient"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Sales() {
    const [sales, setSales] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        async function loadSales(){
            if(!id) return;

            try{
                const response = await axios.get("/api/sales/report/" + id, {
                    withCredentials: true
                });

                setSales(response.data);

            }catch(error){
                console.log(error);
            }
        }

        loadSales();
    }, [id])


    /* Temporal
    const children = [];
    for(let i = 0; i < 12; i++) {
        children.push(<Components.SaleOption key={i}/>);
    }
    */

    return (<Components.Main horizontal inverted> 
        <Components.Column color={Theme.PRIMARY}/>
        <Components.Flex column>
            <Components.DimmedImage 
                style={{
                    width: "100%",
                    height: "25%",
                }}
                childStyle={{
                    width: "100%",
                    height: "100%"
                }}
                src="https://www.galdon.com/wp-content/uploads/2018/12/erp-venta-distribucion-madera-bricolaje.jpg"
            >
                <Components.TextBox
                    style={{
                        height: "100%",
                        width: "80%",
                        marginInline: "auto",
                        borderColor: Theme.PRIMARY
                    }} 
                    alignment="center-left"
                    fontSize={FontSize.XL2}
                    color={Theme.TEXT.SECONDARY}
                    content="VENTAS DOCEL"
                />
            </Components.DimmedImage>
            
            <Components.Flex column style={{
                overflowY: "auto",
                backgroundColor: Theme.ACCENT,
            }}>   
                <div className="sales-list-container">
                    {sales.map((sale) => {
                        return <Components.SaleOption key={sale.id} amount={sale.amount} username={sale.username} date={sale.date} total={sale.total}/>
                    })}
                </div>
            </Components.Flex>
        </Components.Flex>
        <Components.Column color={Theme.BLACK}/>
    </Components.Main>);
}