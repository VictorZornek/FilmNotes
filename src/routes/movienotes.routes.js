const { Router } = require('express');

const MovieNotesController = require('../controllers/MovieNotesController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthenticated)

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.put("/", movieNotesController.update);
movieNotesRoutes.delete("/:id", movieNotesController.delete);
movieNotesRoutes.get('/:id', movieNotesController.show);

movieNotesRoutes.get("/", movieNotesController.index);

module.exports = movieNotesRoutes;