import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


class UserController{
    static async register(req, res){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password) return res.status(400).send({status:false, message: 'All Fields are Required'}) 
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const user = await User.create({name, email, password: hashedPassword })
            const token = await jwt.sign(user.email, process.env.SECRET);
            const registeredUser = {...user, token}
            delete registeredUser.password
            res.status(200).send({status: true, user: registeredUser._doc, token , message: 'User Registered'})
        } catch(e) {
            res.status(400).send({status: false, message: e.message})
        }
    }
    static async login(req, res){
        try{
            const { email , password } = req.body;
            if(!email || !password) return res.status(400).send({status: false, message: 'All Fields are required'})
            const user = await User.findOne({email})
          
            if (!user) {
              return res.status(401).json({ message: 'Authentication failed' });
            }
            const result = await bcrypt.compare(password, user.password)
            if(!result) return res.status(401).send({status: false, message: 'Unauthorized, Plz try again...'})
            const token = await jwt.sign(user.email, process.env.SECRET);
         //   res.status(200).send({status: true, token, message: 'User Login Successfull'})
         res.status(200).send({status: true, user, token , message: 'User Login Sucessfull'})
        } catch(e){
            res.status(400).send({status: false, message: e.message})
        }
    }
    static async updateUser(req, res){
       try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(400).send({status: false, message: 'User not exist'})
        if(user){
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password){
                const saltRounds = 10;
                user.password = await bcrypt.hash(req.body.password, saltRounds)
            }
        }

        await user.save()
        res.status(200).send({status: true, user,message: 'User Updated'})
       } catch(e){
        return res.status(400).send({status: 400, message: e.message})
       }
    }
    static getUser(req, res){
        return res.status(200).send({status: true, user: req.user})
    }
    static async getAllUsers(req, res){
       const users = await User.find({}).select('-password')
       return res.status(200).send({users})
    }
    static logout(){

    }
}

export default UserController