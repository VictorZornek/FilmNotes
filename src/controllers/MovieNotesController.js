const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        if(rating < 1 || rating > 5) {
            throw new AppError('Rating desse filme deve ser um número entre 1 e 5!');
        }

        const [note_id] = await knex('movie_notes').insert({
            title,
            description,
            rating,
            user_id,
        });

        const tagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex('movie_tags').insert(tagsInsert);

        return response.json();
    }
}

module.exports = MovieNotesController;