const userService = require("../service/user-service")

class UserController{

    async registration(req, res, next) {

        try {
            const userData = await userService.registration(req.body)
            res.status(200).json(userData)

        } catch(e) {
            res.status(400).json({message: e.message})
        }

    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            console.log(req.body)
            console.log(username, password)
            const userData = await userService.login(username, password)
            res.status(200).json(userData)

        } catch(e) {
            console.log(e.message)
            res.status(400).json({message: e.message})
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers()
            return res.status(200).json(users)
        } catch (e) {
            console.log(e.message)
        }
    }
    
    async getById(req, res ,next) {
        try{
            const id = req.params.id
            const user = await userService.getById(id)
            return res.status(200).json(user)
        } catch (e) {
            console.log(e.message)
            return res.status(400).json(e.message)
        }
    }

    async update(req,res,next) {
        try {
            const id = req.params.id
            const user = await userService.update(id, req.body)
            return res.status(200).json(user)
        } catch (e) {
            console.log(e.message)
        }
    }
    

    async delete(req,res,next) {
        try {
            const id = req.params.id
            await userService.delete(id)
            return res.status(200).json({message: "успешно удален"})
        } catch (e) {
            console.log(e.message)
        }
    }
}

module.exports = new UserController()