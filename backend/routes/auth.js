const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "Ke$#@vG@rg"




router.post('/create-user',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be of minimum 8 character').isLength({min: 8}) ],
    async (req, res)=>{
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {name, email, password} = req.body

        const checkEmail = await User.findOne({email: email})
        if(checkEmail){return res.status(400).json({error: "Sorry a user with this email already exists"})}

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        const user = await User.create({
            name: name,
            email: email,
            password: secPass,
        })

        jwt.sign(user.id, JWT_SECRET)
        res.json({success: true, message: "You are Successfully Registered"})
      } catch (error) {
        res.status(500)
      }
    }
)



router.post('/login-user',[
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists() ], 
  async (req, res)=>{
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} = req.body

      let user = await User.findOne({email})
      if(!user){res.status(400).json({error: "Please try to login with valid credentials"})}
      let passwordCompare = await bcrypt.compare(password, user.password)
      if(!passwordCompare){res.status(400).json({error: "Please try to login with valid credentials"})}

      const authToken = jwt.sign(user.id, JWT_SECRET)
      res.json({success: true, authToken: authToken})
    } catch (error) {
        res.status(500)
    }
  }
)



router.post('/get-user', fetchuser,
  async (req, res)=>{
    try {
      const userId = req.user
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      res.status(500)
    }
  }
)




module.exports = router