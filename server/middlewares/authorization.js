import jwt from "jsonwebtoken"

export const authorization = (req , res , next) =>{
    try {

        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized',  status: false });
        }
        var token = authHeader.split(' ')[1];
        if (!token || token === "") {
            return res.status(401).json({ message: 'Unauthorized',  status: false });
        }

        let decodedToken = null;

        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized',  status: false });
        }

        if (!decodedToken) {
            req.isAuth = false;
            return res.status(401).json({ status: 0, msg: "Unauthorized" });
        }

        if (decodedToken) {
            req.userId = decodedToken.uuid
            return next();
        };


    } catch (error) {
        console.log(error);
        return res.status(401).json({ status: 0, msg: "Unauthorized" });
    }
}