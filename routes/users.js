const usersRouter = require('express').Router();
const { getUsers, getUserById, postUsers } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', postUsers);

module.exports = usersRouter;
