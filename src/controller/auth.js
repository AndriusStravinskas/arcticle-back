const fs = require('fs')
const uid = require("uid")
const RegisterValidationSchema = require('../validation/register-validate-Schema')
const bcrypt = require("bcrypt")
const userSchema = require('../mongoDb-schema/user-schema')


module.exports = {
  register: async (req, res) => {
    const {email, password} = await req.body;

    const checkUser = await userSchema.findOne({email: email})
    if (checkUser) return res.send({error: true, message: `User with email ${email} exist`});

    const validateUser = RegisterValidationSchema.validateSync({email, password})
    const hashedPassword = await bcrypt.hash(validateUser.password, 10);

    const newUser = new userSchema({
      email: validateUser.email,
      password: hashedPassword,
      secret: uid.uid()
    })

    console.log(`Vartotojas su email: ${newUser.email} sėkmingai sukurtas`)
    await newUser.save()
   
    res.send(newUser)
   },

   login: async (req, res) => {
    const {email, password} = await req.body

    const findUserByemail = await userSchema.findOne({email})

    if(!findUserByemail) return res.send({error: true, message: "User does not exist"})
    const PasswordMatch = await bcrypt.compare(password, findUserByemail.password)
    if(!PasswordMatch) return res.send({error: true, message: "User does not exist"})
    
    return res.send({
      error: false, 
      message: `user with id: ${findUserByemail.secret} Login successfully`, 
      secret: findUserByemail.secret, 
      loginUserEmail: findUserByemail.email
    })

  },
}

