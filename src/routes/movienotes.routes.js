const { Router } = require('express');

const MovieNotesController = require('../controllers/MovieNotesController');

const movieNotesRouter = Router();

const movieNotesController = new MovieNotesController();

movieNotesRouter.post("/:user_id", movieNotesController.create);
movieNotesRouter.put("/:user_id", movieNotesController.update);
movieNotesRouter.delete("/:id", movieNotesController.delete);
movieNotesRouter.get('/:id', movieNotesController.show);

movieNotesRouter.get("/:user_id", movieNotesController.index);

module.exports = movieNotesRouter;