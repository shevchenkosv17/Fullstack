import { Router } from 'express';
import {
  getArticles,
  postArticle,
  getArticleById,
  putArticle,
  deleteArticle
} from '../controllers/articleController.js';

const router = Router();

router.get('/', getArticles);
router.post('/', postArticle);
router.get('/:articleId', getArticleById);
router.put('/:articleId', putArticle);
router.delete('/:articleId', deleteArticle);

export default router;
