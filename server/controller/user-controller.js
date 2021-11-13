const userService = require("../service/user-service")

class UserController{

    async registration(req, res, next) {
        try {
            const userData = await userService.registration(req.body)
            res.status(200).json(userData)

        } catch(e) {
            res.json({message: e.message})
        }

    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await userService.login(username, password)
            res.status(200).json(userData)

        } catch(e) {
            res.status(400).json({message: e.message})
        }
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

module.exports = new UserController()