const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserById);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
