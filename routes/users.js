const usersRouter = require('express').Router();
const {
  validateUserId,
  validateUpdateUser,
} = require('../middlewares/celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserById);
usersRouter.get('/:id', validateUserId, getUserById);
usersRouter.patch('/me', validateUpdateUser, updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
