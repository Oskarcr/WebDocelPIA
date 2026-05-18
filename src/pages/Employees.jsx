import { Components, FontSize, Spacing, Theme } from "@/DocelClient";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

/*
const employees = [
    { id: 1, name: "Emiliano", email: "emi@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 2, name: "Gabriel", email: "gabriel@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 3, name: "Carlos", email: "carloschad@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 4, name: "Adrian", email: "vidgamer@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 5, name: "Edwin", email: "eduin@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 6, name: "Andres", email: "andre@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 7, name: "Hector", email: "hector@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 8, name: "Angel", email: "angel@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 9, name: "Diego", email: "diego@mail.com", phone: "+52 000 000 0000", role: 1 },
    { id: 10, name: "Oscar", email: "locoscar@mail.com", phone: "+52 000 000 0000", role: 1 }
];


const elements = employees.map((emp) => {
    return [emp.name, emp.email, emp.phone, (emp.role + "_role")];
});
*/
export default function Employees() {
    const didFetch = useRef(false);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        if (didFetch.current) return;
        didFetch.current = true;
        async function loadEmployees() {
            try {
                const response = await axios.get("/api/users/employees", {
                    withCredentials: true
                });

                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        loadEmployees();
    }, [])

    async function updateRole(email, role) {
        try {
            await axios.patch("/api/users/" + email, {
                role: Number(role)
            }, {
                withCredentials: true
            }
            );

            setEmployees((prev) => prev.map((emp) => emp.email === email ? { ...emp, role: Number(role) } : emp));
        } catch (error) {
            console.log(error);
        }
    }

    const elements = employees.map((emp) => {
        return [
            emp.username,
            emp.email,
            emp.phone,
            <select className="employee-selected-role" value={emp.role} onChange={(e) => { updateRole(emp.email, e.target.value)}} style={{
                padding: Spacing.SM,
                border: "2px solid" + Theme.PRIMARY,
                backgroundColor: Theme.BACKGROUND.MAIN,
                color: Theme.PRIMARY,
                fontSize: FontSize.SM
            }}>
                <option value={1}>CLIENTE</option>
                <option value={2}>EMPLEADO</option>
                <option value={3}>ADMINISTRADOR</option>
            </select>
        ]
});

    return (<Components.Main horizontal>
        <Components.Column color={Theme.BLACK} />
        <div style={{
            flex: 1
        }}>
            <div className="employee-text-wrapper">
                <Components.TextBox
                    alignment="bottom-left" fontSize={FontSize.LG} content="LISTA DE EMPLEADOS" style={{
                        width: "70%"
                    }} />
            </div>
            <div className="employee-table-container">
                <Components.Table className="employee-table"
                    head={["Nombre", "Correo", "Telefono", "Asignar rol"]}
                    elements={elements}
                />
            </div>
        </div>
        <Components.Column color={Theme.ACCENT} />
    </Components.Main>);
}