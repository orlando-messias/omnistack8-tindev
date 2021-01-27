const express = require('express');

const devController = require('./controllers/devController');
const likesController = require('./controllers/likeController');
const dislikeController = require('./controllers/dislikeController');

const routes = express.Router();

// list only devs whose logged dev didn't like or dilike yet
routes.get('/devs/', devController.list);

// create a new dev
routes.post('/devs', devController.create);

// register a new like
routes.post('/devs/:devId/likes', likesController.create);

// register a new dislike
routes.post('/devs/:devId/dislikes', dislikeController.create);

module.exports = routes;