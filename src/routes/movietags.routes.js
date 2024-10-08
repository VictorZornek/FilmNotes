const { Router } = require('express');

const TagsController = require('../controllers/TagsController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieTagsRoutes = Router();

const movieTagsController = new TagsController();

movieTagsRoutes.get("/", ensureAuthenticated, movieTagsController.index)

module.exports = movieTagsRoutes;