const { emit } = require('process')
const authService = require('../services/authService.js')
const parser = require('../utils/parser.js')

exports.loginPage = (req,res) => {
    res.render('auth/login')
}

exports.registerPage = (req,res) => {
    res.render('auth/register')
}

exports.postRegisterUser = async (req, res) => {
    const {email, password, rePassword, female, male} = req.body
    console.log(`------------------`)
    let gender = ''

    const existingUser = await authService.getUserByEmail(email)
    try{
        if(password !== rePassword) {
            throw new Error ("Passwords do not match!")
        }

        if(email == "" ||  password == "" || rePassword == ""){
            throw new Error ("All fields are requiered!")
        }

        if(existingUser){
            throw new Error("Email is already taken!")
        }
        if(female == "ON" && male == "ON"){
            throw new Error (`Chose "female" or "male"!`)
        }

        if(!female && !male){
            throw new Error (`Chose "female" or "male"!`)
        }
    
        if(female == "ON" && !male){
            gender = "female"
        }
    
        if(!female && male == "ON"){
            gender = "male"
        }
        console.log(gender)

        const token = await authService.register(email, password, gender)
        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/')

    } catch(error){
        const errors = parser.parseError(error)
        res.render('auth/register', {errors})
    }

}

exports.postLoginUser = async (req, res) => {
    const {email, password} = req.body

    const existingUser = await authService.getUserByEmail(email)

    try{
        if(email =="" || password ==""){
            throw new Error ("All fields are requiered!")
        }

        if(!existingUser){ //we call the modell method
            throw new Error ("Invalid Email or password!")
         }

        const token = await authService.login(existingUser, password)
        res.cookie('auth', token, {httpOnly: true})
        res.redirect('/')
   
    } catch(error){
        const errors = parser.parseError(error)
        res.render('auth/login', {errors})
    }
}

exports.logout = (req, res) => {
    res.clearCookie("auth");
    res.redirect('/')
}