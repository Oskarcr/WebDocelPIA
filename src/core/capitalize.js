/**
 * Devuelve un `string` donde la primera letra sera
 * mayuscula y las demas minusculas.
 * @param {string} str 
 */
export default function capitalize(str) {
    if (typeof str !== "string") return "";
    const clean = str.trim();
    if (!clean) return "";
    return clean[0].toUpperCase() + clean.slice(1).toLowerCase();
}