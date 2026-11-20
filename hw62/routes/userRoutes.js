import { Router } from 'express';
import {
  getUsers,
  postUser,
  getUserById,
  putUser,
  deleteUser
} from '../controllers/userController.js';
import { basicAuth } from '../middlewares/authMiddleware.js';
import { validateUserInput } from '../middlewares/validationMiddleware.js';

const router = Router();

router.get('/', getUsers);
router.post('/', basicAuth, validateUserInput, postUser);
router.get('/:userId', getUserById);
router.put('/:userId', basicAuth, validateUserInput, putUser);
router.delete('/:userId', basicAuth, deleteUser);

export default router;
