import { Types } from "mongoose";

// Constantes
export * from "../constants.js";
export { default as saveAttachment } from "./core/saveAttachment.js";
export { default as deleteAttachment } from "./core/deleteAttachment.js";

// Uploader
export { default as uploader } from "./core/uploader.js";

// Enumeradores internos
export { default as FinishType } from "./enums/FinishType.js";
export { default as OrderStatus} from "./enums/OrderStatus.js";
export { default as UserRole } from "./enums/UserRole.js";

// Modelos de mongo
export { default as User } from "./models/User.js";
export { default as Color } from "./models/Color.js";
export { default as Furniture } from "./models/Furniture.js";
export { default as Order } from "./models/Order.js";
export { default as Report } from "./models/Report.js";
export { default as Sale } from "./models/Sale.js";

// Validadores personalizados
export { default as RequestValidator } from "./validations/RequestValidator.js";
export { default as Validators } from "./validations/main.js";

// Ultimo
export const isObjectId = Types.ObjectId.isValid;
export { default as api } from "./core/api.js";
export { default as app } from "./core/app.js";