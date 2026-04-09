import { Components, Theme } from "@/DocelCore";

const employees = [
    { id: 1, name: "Emiliano", email: "emi@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 2, name: "Gabriel", email: "gabriel@mail.com", phone: "+52 000 000 0000", role: "Admin" },
    { id: 3, name: "Carlos", email: "carloschad@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 4, name: "Adrian", email: "vidgamer@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 5, name: "Edwin", email: "eduin@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 6, name: "Andres", email: "andre@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 7, name: "Hector", email: "hector@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 8, name: "Angel", email: "angel@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 9, name: "Diego", email: "diego@mail.com", phone: "+52 000 000 0000", role: "Empleado" },
    { id: 10, name: "Oscar", email: "locoscar@mail.com", phone: "+52 000 000 0000", role: "Empleado" }
];

const children = employees.map((emp) => {
    return (
        <tr key={emp.id}>
            <td style={{
                padding: "12px",
                outline: "3px solid" + Theme.PRIMARY  
            }}>
                <Components.TextBox fontSize="1.5rem" color={Theme.PRIMARY} content={emp.name}/>
            </td>
            <td style={{
                padding: "12px",
                outline: "3px solid" + Theme.PRIMARY  
            }}>
                <Components.TextBox fontSize="1.5rem" color={Theme.PRIMARY} content={emp.email}/>
            </td>
            <td style={{
                padding: "12px",
                outline: "3px solid" + Theme.PRIMARY
            }}>
                <Components.TextBox fontSize="1.5rem" color={Theme.PRIMARY} content={emp.phone}/>
            </td>
            <td style={{
                padding: "12px",
                outline: "3px solid" + Theme.PRIMARY  
            }}>
                <Components.TextBox fontSize="1.5rem" color={Theme.PRIMARY} content={emp.role}/>
            </td>
        </tr>
    )
})

export default function Employees() {
    return (
        <Components.Main horizontal>
            <Components.Column color={Theme.BLACK} />
            <div style={{
                flex: 1
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "20%"
                }}>
                    <Components.TextBox alignment="bottom-left" fontSize="1.8rem" content="LISTA DE EMPLEADOS" style={{
                        width: "70%"
                    }} />
                </div>
                <div className="employee-wrapper" style={{
                    display: "flex",
                    height: "60%",
                    justifyContent: "center"
                }}>
                    <div className="employee-container" style={{
                        backgroundColor: Theme.PRIMARY,
                        border: "5px solid" + Theme.PRIMARY,
                        width: "70%",
                        height: "100%",
                        overflowY: "auto",
                        boxSizing: "border-box"
                    }}>
                        <table id="employee-table" style={{
                            width: "100%",
                            height: "100%",
                            borderCollapse: "collapse",
                            backgroundColor: Theme.BACKGROUND.SURFACE,
                            tableLayout: "fixed",
                            boxShadow: "0px"
                        }}>
                            <thead style={{
                                height: "20%",
                                backgroundColor: Theme.PRIMARY
                                }}>
                                <tr>
                                    <th style={{
                                        padding: "12px",
                                        outline: "1px solid" + Theme.PRIMARY,
                                        }}>
                                        <Components.TextBox fontSize="1.5rem" color={Theme.TEXT.SECONDARY} content="Nombre"/>
                                    </th>
                                    <th style={{
                                        padding: "12px",
                                        outline: "1px solid" + Theme.PRIMARY
                                        }}>
                                        <Components.TextBox fontSize="1.5rem" color={Theme.TEXT.SECONDARY} content="Correo"/>
                                    </th>
                                    <th style={{
                                        padding: "12px",
                                        outline: "1px solid" + Theme.PRIMARY
                                        }}>
                                        <Components.TextBox fontSize="1.5rem" color={Theme.TEXT.SECONDARY} content="Telefono"/>
                                    </th>
                                    <th style={{
                                        padding: "12px",
                                        outline: "1px solid" + Theme.PRIMARY,
                                        }}>
                                        <Components.TextBox fontSize="1.5rem" color={Theme.TEXT.SECONDARY} content="Rol / Asignar rol"/>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{
                    height: "20%"
                }}>
                </div>
            </div>
            <Components.Column color={Theme.ACCENT} />
        </Components.Main>
    )
}