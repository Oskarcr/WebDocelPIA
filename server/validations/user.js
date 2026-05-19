import RequestValidator from "./RequestValidator.js";

const user = new RequestValidator({
    email: {
        label: "correo",
        type: String,
        normalize: (a) => a.trim().toLowerCase(),
        validate: (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const validEmail = emailRegex.test(email);
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
        normalize: (address) => address.trim().replace(/\s+/, " "),
        validate: (address) => {
            const addressRegex = /^[a-zA-ZÀ-ÿ0-9\s#.,-]{5,100}$/;
            const validAddress = addressRegex.test(address);
            if(!validAddress) return "La direccion proporcionada no es valida.";
        }
    },
    phone: {
        label: "telefono",
        type: Number,
        normalize: (a) => Math.abs(Math.round(a)),
        validate: (phone) => {
            const phoneRegex = /^\d{11,13}$/;
            const validPhone = phoneRegex.test(phone);
            if(!validPhone) return "El telefono debe contener entre 11-13 caracteres (Incluyendo prefijo).";
        }
    },
    username: {
        label: "nombre",
        type: String,
        normalize: (a) => a.trim().replace(/\s+/," "),
        validate: (name) => {
            const usernameRegex = /^[\sA-Za-z]{3,100}$/;
            const validUsername = usernameRegex.test(name);
            if(!validUsername) return "El usuario debe contener al menos 3 caracteres, no debe contener numeros, ni simbolos.";
        }
    }
});

export default user;