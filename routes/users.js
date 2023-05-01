const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  postUsers,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', postUsers);
usersRouter.patch('/me', updateUser);

module.exports = usersRouter;
