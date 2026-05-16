import Path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const PROJECT_DIR = Path.dirname(__filename);
const ATTACHMENTS_DIR = Path.join(PROJECT_DIR, "attachments");
const JSON_SERVER_ERROR = { 
    errors: ["Error del servidor."]
};
const JSON_NOT_FOUND = {
    errors: ["No se encontraron registros que coincidieran en el id."]
}

export {
    PROJECT_DIR,
    ATTACHMENTS_DIR,
    JSON_SERVER_ERROR,
    JSON_NOT_FOUND
};