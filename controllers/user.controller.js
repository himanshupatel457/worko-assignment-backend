// const Joi = require('joi');
// const UserService = require('../services/user.services.js');
// const userDTO = require('../dto/user.dto.js');


// exports.createUser = async (req, res) => {
//     try {
//         const validateUser = await userDTO.createUserDTO.validateAsync(req.body);

//         const newUser = await UserService.createUser(validateUser);
//         res.status(201).json(newUser);

//     } catch (error) {
//         console.log('error in creating user : ', error.message);
//         res.status(400).json({ error: error.message });
//     }
// }



// exports.getAllUsers = async (req, res) => {
//     try {
//         const allUsers = await UserService.getAllUsers();
//         res.status(200).json(allUsers);
//     } catch (error) {
//         console.log('error in fetching all users : ', error.message);
//         res.status(400).json({error : error.message });
//     }
// }



// exports.getUserById = async (req,res) =>{
//     const userId = req.params.id;
//     try {
//         const user = await UserService.getUserById(userId);
//         if(!user){
//             console.log('User not existing');
//             res.status(404).json('user not existing');
//         }
//         res.json(user);

//     } catch (error) {
//         console.log('error in fetching user with id : ', error.message);
//         res.status(400).json({error : error.message });
//     }
// }




// exports.updateUser = async (req,res)=>{
//     const userId = req.params.id;
//     const userData = req.body;
//     try {
//         const validateUser = await userDTO.updateUserDTO.validateAsync(userData);
//         const updatedUser = await UserService.updateUser(userId,validateUser);
//         if(!updatedUser){
//             return res.status(404).json({ message: 'User not found' });
//         }  
//         res.json(updatedUser);
//     } catch (error) {
//         console.log('error in updating user with id : ', error.message);
//         res.status(400).json({error : error.message });
//     }
// }  


// exports.deleteUser = async(req,res) =>{
//     const userId = req.params.id;
//     try {
//         const user = await UserService.deleteUser(userId);
//         if(!user){
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({user,message : 'user deleted successfully'});
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// };







const userService = require('../services/user.services.js');
const userSchema = require('../validators/userValidator.js');

class UserController {
    async createUser(req, res) {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await userService.createUser(req.body);
        res.status(201).send(user);
    }

    async getUser(req, res) {
        const user = await userService.getUserById(req.params.userId);
        if (!user) return res.status(404).send('User not found');

        res.send(user);
    }

    async getAllUsers(req, res) {
        const users = await userService.getAllUsers();
        res.send(users);
    }

    async updateUser(req, res) {
        const { error } = userSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await userService.updateUser(req.params.userId, req.body);
        if (!user) return res.status(404).send('User not found');

        res.send(user);
    }

    async softDeleteUser(req, res) {
        const result = await userService.softDeleteUser(req.params.userId);
        res.send(result);
    }
}

module.exports = new UserController();
