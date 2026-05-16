import { Router } from "express";

import auth from "../routes/auth.js";
import furnitures from "../routes/furnitures.js";
import orders from "../routes/orders.js";
import sales from "../routes/sales.js";
import users from "../routes/users.js";
import colors from "../routes/colors.js";

const api = Router();

api.get("/", (req, res) => {
    res.send("Hello World!");
});

api.use("/auth", auth);

api.use("/furnitures", furnitures);

api.use("/orders", orders);

api.use("/sales", sales);

api.use("/users", users);

api.use("/colors", colors);

export default api;