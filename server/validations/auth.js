import RequestValidator from "./RequestValidator.js";

const auth = new RequestValidator({
    email: {
        type: String,
        validate: (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const normalizedEmail = email.trim().toLowerCase();
            const validEmail = emailRegex.test(normalizedEmail);
            
            if(!validEmail) return "Se debe proporcionar un correo valido.";
        }
    },
    password: {
        type: String,
        validate: (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            const validPassword = passwordRegex.test(password);

            if (!validPassword) return "La contraseña debe ser de al menos 8 caracteres, 1 mayuscula y 1 minuscula.";
        }
    }
});

export default auth;