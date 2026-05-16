import Path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const PROJECT_DIR = Path.dirname(__filename);
const ATTACHMENTS_DIR = Path.join(PROJECT_DIR, "attachments");

export {
    PROJECT_DIR,
    ATTACHMENTS_DIR
};