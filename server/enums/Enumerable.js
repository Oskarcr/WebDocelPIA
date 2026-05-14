export default class Enumerable {
    #map = null;

    #getMap() {
        if(this.#map === null) this.#map = this.buildMap();
        return this.#map;
    }

    /**
     * Un metodo que puedes sobreescribir para poner el map de tu enum.
     */
    buildMap() {
        return {};
    }

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
        return Object.keys(this.#map);
    }


    /**
     * Convierte `value` en un `string` que representa 
     * el nombre de un valor de este enum .
     * 
     * En caso de ser invalido, retorna `null`.
     * @param {number} value
     */
    toString(value) {
        const map = this.#getMap();
        for(const k in map) {
            if(map[k] === value) {
                return k;
            }
        }
        return null;
    }

    /**
     * Convierte `str` en un valor de tipo `number`
     * perteneciente a este enum.
     * @param {string} str 
     */
    fromString(str) {
        return this.#getMap()[str] ?? null;
    }
}