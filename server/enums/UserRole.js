import Enumerable from "./Enumerable.js";

class UserRoleEnum extends Enumerable {
    /**
     * El tipo de usuario por defecto, puede realizar
     * pedidos y realizar compras.
     * @readonly
     */
    CLIENT = 1;

    /**
     * Es un usuario que se encarga de los servicios de
     * atencion al cliente, como los pedidos o compras.
     * @readonly
     */
    EMPLOYEE = 2;

    /**
     * Es un usuario que se encarga de asignar los
     * roles a los usuarios.
     * @readonly
     */
    ADMINISTRATOR = 3;

    buildMap() {
        return {
            "cliente": this.CLIENT,
            "empleado": this.EMPLOYEE,
            "administrador": this.ADMINISTRATOR
        }
    };
};

const UserRole = new UserRoleEnum();

Object.freeze(UserRole);

export default UserRole;