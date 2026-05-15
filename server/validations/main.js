import auth from "./auth.js";
import colors from "./colors.js";
import furniture from "./furniture.js";

const Validators = {
    colors,
    furniture,
    auth
};

Object.freeze(Validators);

export default Validators;