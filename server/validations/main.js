import user from "./user.js";
import colors from "./colors.js";
import furniture from "./furniture.js";
import order from "./order.js";

const Validators = {
    colors,
    furniture,
    user,
    order
};

Object.freeze(Validators);

export default Validators;