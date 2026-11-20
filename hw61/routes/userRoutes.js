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

router.use(basicAuth);

router.get('/', getUsers);
router.post('/', validateUserInput, postUser);
router.get('/:userId', getUserById);
router.put('/:userId', validateUserInput, putUser);
router.delete('/:userId', deleteUser);

export default router;
