



const User = require('../models/userModel.js');

class UserDao {
    async createUser(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async getUserById(id) {
        return await User.findById(id).where({ isDeleted: false });
    }

    async getAllUsers() {
        return await User.find({ isDeleted: false });
    }

    async updateUser(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true }).where({ isDeleted: false });
    }

    async softDeleteUser(id) {
        return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

module.exports = new UserDao();
