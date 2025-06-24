const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

exports.middleUser = async(req, res, next) => {
  // Middleware to check if the user is logged in
  try {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const user = await prisma.user.findFirst({
      where: { 
        id: req.user.id
      }
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
/*   console.log(user.role); */
  // If the token is valid, proceed to the next middleware or route handler
/*   if (user.role !== 'USER') {
    return res.status(400).json({ message: 'Access denied' });
  } */

  next()
  }
  catch (error) {
    // If an error occurs, respond with a 401 Unauthorized status
    /* console.log("middleUser",error); */
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'jwt expired' });
    }
    return res.status(401).json({ message: 'server errer' });
  }
}

exports.middleAdmin = async(req, res, next) => {
  // Middleware to check if the user is an admin
  try {

    const { email } = req.user
    const admin = await prisma.user.findFirst({
      where: {
        email: email,
       }
    })
    console.log(admin);

    if (!admin) {
      return res.status(400).json({ message: 'Access denied' });  
    }

    if (admin.role !== 'ADMIN') {
      return res.status(400).json({ message: 'You is not Admin please go back' });
    }
    // If the user is an admin, proceed to the next middleware or route handler
  next()
  }
  catch (error) {
    // If an error occurs, respond with a 401 Unauthorized status
    /* console.log("middleAdmin",error); */
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'jwt expired' });
    }
    return res.status(401).json({ message: 'server errer' });
  }
}