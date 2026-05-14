// Es un mugrero pero esta mejor para no tener que usar TypeScript
// y para que se pueda 

/**
 * @template T
 * @typedef {T extends NumberConstructor ? number : 
 * T extends StringConstructor ? string : 
 * T extends BooleanConstructor ? boolean : 
 * T extends ArrayConstructor ? any[] :
 * T extends ObjectConstructor ? Record<string, any> :
 * T extends new (...args: any[]) => infer R ? R : 
 * any} InferType
 */

/**
 * Son nombres que se recomiendan para el titulo de 
 * `RequestValidator`, no necesariamente tienen que 
 * ser los que vienen.
 * @typedef {"password" | 
 * "username" | 
 * "name" |
 * "description" |
 * "email" |
 * "password" |
 * (string & {})} RequestValidatorRecommendedName
 */

/**
 * @template T 
 * @typedef {{ [K in keyof T]: {
 *      type: T[K],
 *      validate: (value: InferType<T[K]>) => string | null 
 * }}} RequestValidationDat_a
 */

/**
 * @template T
 */
class RequestValidationData {

    /**
     * Una función que teoricamente retornaria un 
     * `string` en caso de ser invalido con la informacion
     * del error o `null` en caso contrario.
     * 
     * El parametro `value` siempre será de tipo especificado 
     * `type` al llamarse.
     * @type {(value: InferType<T>) => string | null}
     */
    validate = null;

    /**
     * Es el tipo del cual es `validate()`.
     * @type {T}
     */
    type = null;

    /**
     * Es el constructor de la clase `RequestValidator`.
     * @example 
     * "campo": {
     *      type: Number, // Es el tipo de n.
     *      validate: (n) => {
     *          // La validacion de n.
     *          // Lo mejor es que n nunca va a ser de otro tipo que type.
     *          if(n <= 0) return "El numero tiene que ser mayor a 0";
     *          return null;
     *      }
     * }
     */
    constructor(reference) {
        const keys = Object.keys(reference);
        for(const key of keys) {
            if(key in this === false) continue;
            this[key] = reference[key];
        }
    }
}

/**
 * Una clase para crear validaciones dinamicas y reutilizables
 * con identificadores y opciones que no se repiten.
 * @template T
 */
class RequestValidator {
    /**
     * Retorna `true` si `value` es de tipo `type`.
     * En otro caso será `false`.
     * @template V
     * @param {any} value 
     * @param {new () => V} type 
     */
    static isType(value, type) {
        switch(type) {
            case String:
                return typeof value === "string";
            case Number:
                return typeof value === "number" && !Number.isNaN(value);
            case Boolean:
                return typeof value === "boolean";
            case BigInt:
                return typeof value === "bigint";
            case Symbol:
                return typeof value === "symbol";
            case Function:
                return typeof value === "function";
            case Object:
                return (
                    value !== null &&
                    typeof value === "object" &&
                    !Array.isArray(value)
                );
            case Array:
                return Array.isArray(value);
            default:
                return value instanceof type;
        }
    }

    /**
     * Retorna `true` si `value` esta vacio.
     * @param {string} value 
     */
    static isEmpty(value) {
        return value === undefined || value === null || value === "";
    }

    /** @type {{ [K in keyof T]: RequestValidationData<T[K]>}} */
    #schema = null;

    /**
     * Crea un nuevo `RequestValidator` mediante los
     * datos de `schema`.
     * @param {{ [K in keyof T]: RequestValidationData<T[K]>}} schema
     */
    constructor(schema) {
        const parsedSchema = {};
        for(const rule in schema) {
            parsedSchema[rule] = new RequestValidationData(schema[rule]);
        }
        this.#schema = parsedSchema;
    }

    /**
     * Devuelve una lista de errores (si los contiene)
     * de cada cada regla establecida en `schema`.
     * @param {Partial<T>} body 
     */
    validate(body) {
        if(!body || Object.keys(body).length === 0) {
            return ["El body no existe o esta vacio."];
        }
        const errors = [];
        for(const k in this.#schema) {
            if(body[k] === undefined || body[k] === null) {
                errors.push("El campo '" + k + "' no existe o esta vacio.");
                continue;
            }
            if(!RequestValidator.isType(body[k], this.#schema[k].type)) {
                errors.push("El campo '" + k + "' no es de tipo '" + this.#schema[k].type?.name + "'");
                continue;
            }
            const validate = this.#schema[k].validate;
            const result = validate(body[k]);
            if(result) errors.push(result);
        }
        return errors;
    }

    /**
     * Retorna una lista de errores si cada `arg` 
     * que sea atributo `body` esta vacio.
     * @template {Partial<T>} V
     * @param {V} body 
     * @param  {...(RequestValidatorRecommendedName | keyof V)} args 
     * 
     * @example
     * const empties = validator.empties(req.body, "username", "email");
     * if(empties.length > 0) {
     *      // Hay algun campo vacio.
     *      console.log(empties);
     * }
     */
    empties(body, ...args) {
        const errors = [];
        for(const key of args) {
            const value = body[key];
            if(RequestValidator.isEmpty(value)) {
                errors.push("El campo '" + key + "' esta vacio.");
                continue;
            }
        }
        return errors;
    }
}

export default RequestValidator;