import RequestValidator from "./RequestValidator.js";

const user = new RequestValidator({
    email: {
        label: "correo",
        type: String,
        validate: (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const normalizedEmail = email.trim().toLowerCase();
            const validEmail = emailRegex.test(normalizedEmail);
            
            if(!validEmail) return "Se debe proporcionar un correo valido.";
        }
    },
    password: {
        label: "contraseña",
        type: String,
        validate: (password) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            const validPassword = passwordRegex.test(password);

            if (!validPassword) return "La contraseña debe ser de al menos 8 caracteres, 1 mayuscula y 1 minuscula.";
        }
    },
    address: {
        label: "dirección",
        type: String,
        validate: (address) => {
            const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s#.,-]{5,100}$/;
            const validAddress = addressRegex.test(address);

            if(!validAddress) return "La direccion proporcionada no es valida.";
        }
    },
    phone: {
        label: "telefono",
        type: Number,
        validate: (phone) => {
            const phoneRegex = /^\d{12}$/;
            const validPhone = phoneRegex.test(phone);

            if(!validPhone) return "El telefono debe contener 12 caracteres (Incluyendo prefijo).";
        }
    },
    username: {
        label: "nombre",
        type: String,
        validate: (name) => {
            const usernameRegex = /^[A-Za-z]{3,100}$/;
            const validUsername = usernameRegex.test(name);

            if(!validUsername) return "El usuario debe contener al menos 3 caracteres, no debe contener numeros, ni simbolos.";
        }
    }
});

export default user;