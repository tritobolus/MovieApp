import jwt from 'jsonwebtoken'

const verifyUser = (req, res, next) => {
    const token = req.cookies.token 
    if(!token){
        return res.json({Error: "You are not authenticated!"})
    } else {
        try {
            const decode = jwt.verify(token, 'jwt-secret-key')
            // console.log(decode)
            req.username = decode.username  // req.name is how Express lets you “carry” user information through the request chain.It’s not just about storing data — it’s about making it available later in the same request.
            req.email = decode.email;
            req.userId = decode.userId;
            next()
        } catch (error) {
            return res.json({ Error: "Token is invalid!" });
        }
    }
}

export default verifyUser;