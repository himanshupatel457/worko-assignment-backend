


const userDao = require('../dao/user.dao.js');
const UserDTO = require('../dto/user.dto.js');

class UserService {
    async createUser(userData) {
        const user = await userDao.createUser(userData);
        return new UserDTO(user.id, user.email, user.name, user.age, user.city, user.zipCode);
    }

    async getUserById(userId) {
        const user = await userDao.getUserById(userId);
        if (user) {
            return new UserDTO(user.id, user.email, user.name, user.age, user.city, user.zipCode);
        }
        return null;
    }

    async getAllUsers() {
        const users = await userDao.getAllUsers();
        return users.map(user => new UserDTO(user.id, user.email, user.name, user.age, user.city, user.zipCode));
    }

    async updateUser(userId, userData) {
        const user = await userDao.updateUser(userId, userData);
        return new UserDTO(user.id, user.email, user.name, user.age, user.city, user.zipCode);
    }

    async softDeleteUser(userId) {
        await userDao.softDeleteUser(userId);
        return { message: 'User deleted successfully' };
    }
}

module.exports = new UserService();
