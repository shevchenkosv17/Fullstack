import { Router } from 'express';
import {
  getArticles,
  postArticle,
  getArticleById,
  putArticle,
  deleteArticle
} from '../controllers/articleController.js';
import { checkArticleAccess } from '../middlewares/roleMiddleware.js';

const router = Router();

router.use(checkArticleAccess);

router.get('/', getArticles);
router.post('/', postArticle);
router.get('/:articleId', getArticleById);
router.put('/:articleId', putArticle);
router.delete('/:articleId', deleteArticle);

export default router;
