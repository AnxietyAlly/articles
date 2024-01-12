import express from 'express';
import cors from 'cors';
import {
  getAllArticles,
  getAllArticlesFromCategory,
  getSingleArticle,
  getAllCategories,
  getSingleCategory
} from '../controllers/articlesController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Hi, this is the articles microservice');
});

router.options('/articles', (req, res, next) => {
  try {
    //set header before response
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });
    //response
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

// get a collection of all the accounts, you can also use a query
router.get('/articles', cors(), getAllArticles);
router.get('/articles/:id', cors(), getSingleArticle);
router.get('/articles/getByCategory/:category_id', cors(), getAllArticlesFromCategory);
router.get('/articles/categories', cors(), getAllCategories);
router.get('/articles/categories/:id', cors(), getSingleCategory);



export default router;