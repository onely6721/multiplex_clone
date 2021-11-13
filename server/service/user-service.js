const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt");
require("dotenv").config();

class UserService {
    async registration(user) {
        const candidate = await UserModel.findOne({
            $or: [{email: user.email}, {username: user.username}]
        })
        if (candidate) {
            throw Error("Такой пользователь уже существует")
        }
        const hashedPassword = await bcrypt.hash(user.password, 3)
        const newUser = await UserModel.create({...user, password: hashedPassword})
        return ({newUser})

    }

    async login(username, password) {
        const user = await UserModel.findOne({
            $or: [{email:username}, {username: username}]
        })
        if (!user) {
            throw new Error('Не корректные данные')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            throw new Error('Не корректные данные')
        }
        const userDto = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            })

        return {token:token, user: userDto}
    }

    async getUsers(req, res, next) {
        try {

        } catch (e) {

        }
    }
    
    async getUser(req, res ,next) {
        try{
            
        } catch (e) {
            
        }
    }

    async update(req,res,next) {
        try {

        } catch (e) {

        }
    }
    

    async delete(req,res,next) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new UserService()