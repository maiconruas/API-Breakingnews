import { Router } from 'express';
import newsController from '../controllers/news.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const route = Router();

route.post('/', authMiddleware, newsController.create);
route.get('/', newsController.findAll);
route.get('/top', newsController.topNews);
route.get('/search', newsController.searchByTitle);
route.get('/byUser', authMiddleware, newsController.byUser);

route.get('/:id', authMiddleware, newsController.findById);
route.patch('/:id', authMiddleware, newsController.update);
route.delete('/:id', authMiddleware, newsController.erase);
route.patch('/like/:id', authMiddleware, newsController.likeNews);
route.patch('/comment/:id', authMiddleware, newsController.addComment);
route.patch('/comment/:idNews/:idComment', authMiddleware, newsController.deleteComment);

export default route;