// const express = require('express');
// const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
// const validateId = require('../middlewares/validateId');

// const router = express.Router();



// router.post('/', createUser);
// router.get('/', getAllUsers);
// router.get('/:id',validateId, getUserById);
// router.put('/:id',validateId, updateUser);
// router.delete('/:id',validateId, deleteUser);





// module.exports = router;



const express = require('express');
const userController = require('../controllers/user.controller.js');
const auth = require('../middlewares/basicAuth');
const validateId = require('../middlewares/validateId.js');

const router = express.Router();
router.use(auth);
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUser);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.softDeleteUser);

module.exports = router;
