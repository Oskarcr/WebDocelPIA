import { Components, FontSize, Theme } from "@/DocelClient";

const employees = [
    { id: 1, name: "Emiliano", email: "emi@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 2, name: "Gabriel", email: "gabriel@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 3, name: "Carlos", email: "carloschad@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 4, name: "Adrian", email: "vidgamer@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 5, name: "Edwin", email: "eduin@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 6, name: "Andres", email: "andre@mail.com", phone: "+52 000 000 0000", role: 1},
    { id: 7, name: "Hector", email: "hector@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 8, name: "Angel", email: "angel@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 9, name: "Diego", email: "diego@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 10, name: "Oscar", email: "locoscar@mail.com", phone: "+52 000 000 0000", role: 1 }
];

const elements = employees.map((emp) => {
    return [emp.name, emp.email, emp.phone, (emp.role + "_role")];
});

export default function Employees() {
    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK} />
        <div style={{
            flex: 1
        }}>
            <div className="employee-text-wrapper" style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Components.TextBox 
                    alignment="bottom-left" fontSize={FontSize.LG} content="LISTA DE EMPLEADOS" style={{
                    width: "70%"
                }} />
            </div>
            <div style={{
                display: "flex",
                height: "60%",
                justifyContent: "center"
            }}>
                <Components.Table className="employee-table"
                    head={["Nombre", "Correo", "Telefono", "Asignar rol"]}  
                    elements={elements}
                />
            </div>
        </div>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}