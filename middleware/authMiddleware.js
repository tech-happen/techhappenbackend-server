const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
 dotenv.config();

const authenticate = async (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader.split(' ')[1];

   console.log('authorization Header:', authHeader);
   console.log('Token:', token);
   
   if(!authHeader){
    return res.status(401).json({ message: 'Invalid authorization header'})
   }

   if(!token){
    return res.status(401).json({message:'token missing'});
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (error) {
    console.error(error);
      res.status(400).json({message: "Invalid token"});
   }
};

module.exports = authenticate;