import { Router } from 'express';
import {
  getUsers,
  postUser,
  getUserById,
  putUser,
  deleteUser
} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.post('/', postUser);
router.get('/:userId', getUserById);
router.put('/:userId', putUser);
router.delete('/:userId', deleteUser);

export default router;
