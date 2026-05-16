import Path from "path";
import { writeFileSync } from "fs";
import { ATTACHMENTS_DIR } from "#DocelServer";

/**
 * Guarda un archivo `Express.Multer.File` previamente 
 * guardado en memoria `RAM` en la carpeta `attachments/`.
 * 
 * Devuelve `true` si se completo y `false` en caso contrario.
 * @param {Express.Multer.File} file 
 */
export default function saveAttachment(file) {
    const extension = Path.extname(file.originalname);
    const basename = Path.basename(file.originalname, extension);
    const fileOriginalName = (Date.now() + "_" + basename);
    const buffer = Buffer.from(fileOriginalName, "utf-8");
    const fileName = buffer.toString("base64url") + extension;
    const filePath = Path.join(ATTACHMENTS_DIR, fileName);
    writeFileSync(filePath, file.buffer);
    return fileName;
}