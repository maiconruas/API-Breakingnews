import { Router } from 'express';
import newsController from '../controllers/news.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const route = Router();

route.post('/', authMiddleware, newsController.create);
route.get('/', newsController.findAll);
route.get('/top', newsController.topNews);

export default route;