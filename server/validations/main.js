import user from "./user.js";
import colors from "./colors.js";
import furniture from "./furniture.js";

const Validators = {
    colors,
    furniture,
    user
};

Object.freeze(Validators);

export default Validators;