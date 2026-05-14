export default class Enumerable {
    /**
     * Es el map de tu enum.
     * @example 
     * _map = {
     *      "cliente": this.CLIENT,
     *      "administrador": this.ADMINISTRATOR,
     *      "etc": this.ETC
     * };
     */
    _map = {};

    /**
     * Devuelve una lista de los valores del enum.
     */
    values() {
        return Object.values(this)
            .filter(v => typeof v === "number");
    }

    /**
     * Devuelve una lista de los nombres del enum.
     */
    names() {
        return Object.keys(this)
            .filter((v) => typeof this[v] === "number");
    }

    /**
     * Devuelve una lista de los texto descriptivos del mapa del enum.
     */
    labels() {
        return Object.keys(this._map);
    }

    /**
     * Convierte `value` en un `string` que representa 
     * el label de un valor de este enum.
     * 
     * En caso de ser invalido, retorna `null`.
     * @param {number} value
     */
    toLabel(value) {
        const map = this._map;
        for(const k in map) {
            if(map[k] === value) {
                return k;
            }
        }
        return null;
    }

    /**
     * Convierte `label` en un valor de tipo `number`
     * perteneciente a este enum.
     * 
     * Retorna `null` si no se encuentra.
     * @param {string} label 
     */
    fromLabel(label) {
        /**@type {number} */
        const value = this._map[label] ?? null;
        if(!value) return -1;
        return value;
    }
}