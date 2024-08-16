const { Router } = require('express');

const TagsController = require('../controllers/TagsController');

const movieTagsRouter = Router();

const movieTagsController = new TagsController();

movieTagsRouter.get("/:user_id", movieTagsController.index)


module.exports = movieTagsRouter;