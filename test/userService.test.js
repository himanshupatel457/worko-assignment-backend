const userService = require('../services/user.services.js');
const userDao = require('../dao/user.dao.js');

jest.mock('../dao/user.dao.js');


describe('User Service', () => {
    it('should create a user', async () => {
        const user = {
            id: '4',
            email: 'test4@example.com',
            name: 'John Doe',
            age: 30,
            city: 'City',
            zipCode: '12345'
        };
        userDao.createUser.mockResolvedValue(user);
        const result = await userService.createUser(user);
        expect(result).toEqual(user);
    });

    it('should get a user by ID', async () => {
        const user = {
            id: '4',
            email: 'test4@example.com',
            name: 'John Doe',
            age: 30,
            city: 'City',
            zipCode: '12345'
        };
        userDao.getUserById.mockResolvedValue(user);
        const result = await userService.getUserById('4');
        expect(result).toEqual(user);
    });

    it('should get all users', async () => {
        const users = [
            {
                id: '4',
                email: 'test4@example.com',
                name: 'John Doe',
                age: 30,
                city: 'JBP',
                zipCode: '12345'
            }
        ];
        userDao.getAllUsers.mockResolvedValue(users);
        const result = await userService.getAllUsers();
        expect(result).toEqual(users);
    });

    it('should update a user', async () => {
        const user = {
            id: '4',
            email: 'test4@example.com',
            name: 'Jane Doe',
            age: 25,
            city: 'New City',
            zipCode: '54321'
        };
        userDao.updateUser.mockResolvedValue(user);
        const result = await userService.updateUser('4', user);
        expect(result).toEqual(user);
    });

    it('should soft delete a user', async () => {
        userDao.softDeleteUser.mockResolvedValue({});
        const result = await userService.softDeleteUser('1');
        expect(result.message).toEqual('User deleted successfully');
    });

});



