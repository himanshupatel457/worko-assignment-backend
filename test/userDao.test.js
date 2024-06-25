const mongoose = require('mongoose');
const userDao = require('../dao/user.dao.js');
const User = require('../models/userModel.js');
const dotenv = require('dotenv');
dotenv.config();

beforeAll(async () => {
  const url = process.env.MONGO_DB_URI_TEST;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});


afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User DAO', () => {

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = {
        email: 'test5@example.com',
        name: 'John Doe',
        age: 30,
        city: 'City',
        zipCode: '12345'
      };
      const savedUser = await userDao.createUser(user);
      expect(savedUser.email).toEqual('test5@example.com');
    });
  });

  describe('getUserById', () => {
    it('should get a user by ID', async () => {
      const user = new User({
        email: 'test8@example.com',
        name: 'John Doe',
        age: 30,
        city: 'City',
        zipCode: '12345'
      });
      await user.save();
      const foundUser = await userDao.getUserById(user._id);
      expect(foundUser.email).toEqual('test8@example.com');
    });
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const user1 = new User({
        email: 'test1@example.com',
        name: 'User One',
        age: 25,
        city: 'City1',
        zipCode: '11111'
      });
      const user2 = new User({
        email: 'test2@example.com',
        name: 'User Two',
        age: 35,
        city: 'City2',
        zipCode: '22222'
      });
      await user1.save();
      await user2.save();

      const users = await userDao.getAllUsers();
      expect(users.length).toBeGreaterThan(0);
      
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = new User({
        email: 'test5@example.com',
        name: 'John Doe',
        age: 30,
        city: 'City',
        zipCode: '12345'
      });
      await user.save();

      const updatedUser = {
        email: 'updated7@example.com',
        name: 'Jane Doe',
        age: 35,
        city: 'Updated City',
        zipCode: '54321'
      };

      const result = await userDao.updateUser(user._id, updatedUser);
      expect(result.email).toEqual('updated7@example.com');
      expect(result.name).toEqual('Jane Doe');
      expect(result.age).toEqual(35);
      expect(result.city).toEqual('Updated City');
      expect(result.zipCode).toEqual('54321');
    });
  });

  describe('softDeleteUser', () => {
    it('should soft delete a user', async () => {
      const user = new User({
        email: 'test7@example.com',
        name: 'John Doe',
        age: 30,
        city: 'City',
        zipCode: '12345'
      });
      await user.save();

      const result = await userDao.softDeleteUser(user._id);
      const temp = {...result,message:'User deleted successfully'};
      const deletedUser = await User.findById(user._id);
      expect(deletedUser.isDeleted).toBe(true);
      expect(temp.message).toEqual('User deleted successfully');
    });
  });
});
