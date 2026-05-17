import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next){
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).send("Token invalido.");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    }catch(error){
        console.log(error);
        return res.status(401).send("Token invalido.");
    }
}

export function requireRole(requiredRole){
    return (req, res, next) => {
        try {
            if (!req.user || req.user.role < requiredRole) return res.status(403).json({ message: "Acceso denegado." });

            next();
        }catch(error){
            console.log(error);
            return res.status(403).json({ message: "Acceso denegado."})
        }
    }
}