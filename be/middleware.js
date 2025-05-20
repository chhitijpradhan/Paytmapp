const { JWT_SECRET } = require("./config");

const jwt = require("jsonwebtoken");

const authMiddleware = (req , res, next) => {
    const authHeader = req.headers.authorzation;

    if(!authHeader || !authHeader.startWith("Bearer")){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode =jwt.verify(token, JWT_SECRET);

        req.userId =decode.useId;
        next();

    }catch (err) {
        return res.status(403).json({});

    }
};
module.exports ={
    authMiddleware
}