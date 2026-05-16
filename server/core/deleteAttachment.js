import { existsSync, unlinkSync } from "fs";
import Path from "path";
import { ATTACHMENTS_DIR } from "#DocelServer";

/**
 * Borra un archivo de la carpeta `attachments/` mediante su url.
 * @param {string} attachmentUrl 
 */
export default function deleteAttachment(attachmentUrl) {
    const path = Path.join(ATTACHMENTS_DIR, attachmentUrl);
    try {
        if(!existsSync(path)) return;
        unlinkSync(path);
    }
    catch(_) {}
}