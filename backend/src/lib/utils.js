import jwt from "jsonwebtoken"

export const generateToken = (userId, res) =>{

    const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:"7d"}); // creating a JSON Web Token (JWT)
    // after 7 days the server will reject the token during verification, even if it’s still in the browser cookie.

    res.cookie("jwt",token,{ // sends a cookie to the user's browser.
        maxAge:7 * 24 * 60 * 60 * 1000, // Controls how long(milli seconds) the cookie containing the JWT is stored in the browser.
        httpOnly:true, // Protects the cookie from being stolen via Cross-Site Scripting (XSS) attacks.
        sameSite:"strict", // prevent CSRF attacks
        secure:process.env.NODE_ENV !== "development" // Ensures the cookie is only sent over secure HTTPS connections.(it doesn't work in development.)
    });

    return token;

}