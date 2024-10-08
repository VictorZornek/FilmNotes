const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MoviesTagsController {
    async index(request, response) {
        const user_id = request.user.id;

        const tags = await knex('movie_tags').where({ user_id })

        return response.json({
            tags: tags
        });
    }
}

module.exports = MoviesTagsController;