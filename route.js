const express = require('express');
const router = express.Router();
const newsController = require('./controller/newsController');

router.get('/news', newsController.getNews);
router.get('/news/:title', newsController.getNewsByTitle);
router.get('/news/author/:author', newsController.getNewsByAuthor);
router.get('/news/search/:query', newsController.searchNews);

module.exports = router;
