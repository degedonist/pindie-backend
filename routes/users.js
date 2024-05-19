const usersRouter = require('express').Router();

const {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyFields, checkIsUserExists, hashPassword} = require('../middlewares/users');
const {sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe} = require('../controllers/users');
const { checkAuth } = require('../middlewares/auth');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.get('/me', checkAuth, sendMe);
usersRouter.post("/users", findAllUsers, checkIsUserExists, checkEmptyFields, checkAuth, hashPassword, createUser, sendUserCreated);
usersRouter.put("/users/:id", findUserById, checkEmptyFields, checkAuth, updateUser, sendUserUpdated);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;