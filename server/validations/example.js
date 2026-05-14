import RequestValidator from "./RequestValidator.js";

const example = new RequestValidator({
    "foo": {
        type: String,
        validate: (s) => {
            if(s.length <= 5) {
                return "El campo 'foo' debe tener mas de 5 caracteres.";
            }
            return null;
        }
    }
});

export default example;