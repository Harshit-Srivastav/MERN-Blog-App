import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
async function authorizeBearerToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' , status: false});
    }


    // Split the header into its parts (e.g., "Bearer" and the token)
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format', status: false });
    }
  
    // Verify the token using the secret key
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' , status: false});
      }
  
      // Token is valid; you can access 'decoded' data in your route
      const user = await User.findOne({email: decoded}).select('-password')
      req.user = user;

      next(); // Proceed to the next middleware or route
    });
  }
  
  export default authorizeBearerToken