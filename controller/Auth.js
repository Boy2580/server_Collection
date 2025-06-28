
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { Role } = require('@prisma/client');

exports.Register = async(req, res) => {
  // Logic for user login
  try{
    const {name, email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send('Email and password are required');
    }
    // Here you would typically hash the password and save the user to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Simulate saving user to database
    // In a real application, you would save the user to your database here
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if(user){
        return res.status(200).send('User already exists');
    }

    const newUser = await prisma.user.create({
      data: {
        name:name,
        email: email,
        password: hashedPassword
      }
    });
    res.status(200).send('User registered successfully');   
  }
  catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
}

exports.Login = async(req, res) => {
  // Logic for Login login
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send('Email and password are required');
    }

    // Here you would typically check the user's credentials
    // For simplicity, let's assume we have a user object
    const user  = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!user) {
        return res.status(200).send('User not found');
    }

    console.log(user);

    Payload = {
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role
    }
      // Check password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          // Generate JWT token
          const token = jwt.sign(Payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error generating token');
            }
            // Send the token to the client
            res.status(200).json({ payload: Payload, token: token});
          })
        } else {
          return res.status(200).send('Invalid credentials');
        }
      });
  }
  catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
}

exports.ProtectUser = (req, res) => {
  // Logic for ProtectUser login
  try{
    res.status(200).json({ message:"User || Admin pass" })
  }
  catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
}