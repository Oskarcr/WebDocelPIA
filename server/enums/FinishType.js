import Enumerable from "./Enumerable.js";

class FinishTypeEnum extends Enumerable {
    /**
     * Tipo de acabado barniz.
     * @readonly
     */
    VARNISH = 1;

    /**
     * Tipo de acabado laca.
     * @readonly
     */
    LACQUER = 2;

    /**
     * Tipo de acabado poliuretano.
     * @readonly
     */
    POLYURETHANE = 3;

    buildMap() {
        return {
            "barniz": this.VARNISH,
            "laca": this.LACQUER,
            "poliuretano": this.POLYURETHANE
        };
    }
}

const FinishType = new FinishTypeEnum();

Object.freeze(FinishType);

export default FinishType;