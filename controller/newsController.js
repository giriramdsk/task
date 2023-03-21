const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });

const getNews = async (req, res) => {
  try {
    const { data } = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        lang: 'en',
        token: process.env.NEWS_API_KEY,
        country: req.query.country || 'us',
        max: req.query.max || 10,
      },
    });
    res.json(data.articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getNewsByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const cachedData = cache.get(title);
    if (cachedData) {
      res.json(cachedData);
    } else {
      const { data } = await axios.get('https://gnews.io/api/v4/search', {
        params: {
          q: title,
          lang: 'en',
          token: process.env.NEWS_API_KEY,
        },
      });
      cache.set(title, data.articles);
      res.json(data.articles);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getNewsByAuthor = async (req, res) => {
  try {
    const author = req.params.author;
    const { data } = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        lang: 'en',
        token: process.env.NEWS_API_KEY,
        topic: author,
      },
    });
    res.json(data.articles);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
const searchNews = async (req, res) => {
    try {
      const query = req.params.query;
      const cachedData = cache.get(query);
      if (cachedData) {
        res.json(cachedData);
      } else {
        const { data } = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: query,
            lang: 'en',
            token: process.env.NEWS_API_KEY,
          },
        });
        cache.set(query, data.articles);
        res.json(data.articles);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };
  
  module.exports = { getNews, getNewsByTitle, getNewsByAuthor, searchNews };
  ``