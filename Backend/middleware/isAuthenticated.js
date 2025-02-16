import jwt from "jsonwebtoken";


const isAuthenticated = async(req,res,next)=>
{
    try
    {
        
        console.log("Cookies:", req.cookies);
        const token = req.cookies.token;
        

        if(!token)
        {

            return res.status(401).json({
                message:"User is not authenticated",
                success:false
            })
        }
       
        let decode;
        try {
            decode = jwt.verify(token, process.env.SECRET_KEY);
            //If the token is valid, verify() decodes it and extracts the payload data, such as userId or other claims embedded in the token.
            // If valid: Returns the decoded payload (e.g., { userId: '12345', iat: 1678490231, exp: 1678576631 }).
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false,
            });
        }
        req.id = decode.userId;
        
        next();
    }
    catch(error)
    {
        console.error("Authentication Middleware Error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}
export default isAuthenticated;