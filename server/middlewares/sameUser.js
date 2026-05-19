import { UserRole } from "#DocelServer";

/**
 * Revisa si `const { id } = req.params` coincide con el `const { id } = req.user`.
 * 
 * Tambien deja pasar si pones un rol como autorizado.
 * @param {number} authorizedRole 
 */
export default function sameUser(authorizedRole = null) {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    return (req, res, next) => {
        const err = {
            errors: ["Credenciales invalidas."]
        };
        if(!req.user) {
            res.status(400).json(err);
            return;
        }

        const idA = req.params.id;
        const idB = req.user.id;
        const role = req.user.role;

        console.log(idA, idB);

        if(!idA || !idB || idA !== idB || (role && role < authorizedRole)) {
            console.log("abc");
            res.status(400).json(err);
            return;
        }

        next();
    }
}