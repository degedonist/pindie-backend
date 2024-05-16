const usersRouter = require('express').Router();

const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyFields, checkIsUserExists, hashPassword} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted} = require('../controllers/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post("/users", findAllUsers, checkIsUserExists, checkEmptyFields, hashPassword, createUser, sendUserCreated);
usersRouter.put("/users/:id", findUserById, checkEmptyFields, updateUser, sendUserUpdated);
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);

module.exports = usersRouter;