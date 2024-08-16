const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
    async create(request, response) {
        const { user_id } = request.params;
        const { title, description, rating, tags } = request.body;

        if(rating < 1 || rating > 5) {
            throw new AppError('Rating desse filme deve ser um número entre 1 e 5!');
        }

        const checkTitle = await knex('movie_notes').where({ title });

        if(checkTitle) {
            throw new AppError('Este título já está cadastrado!')
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

    async update(request, response) {
        const { user_id } = request.params;
        const { description, rating, tags } = request.body;
        const { id } = request.query;

        const [note] = await knex('movie_notes').where({ user_id }).andWhere({ id });

        if(!note){
            throw new AppError('Nota não foi encontrada!');
        }

        if(rating < 1 || rating > 5) {
            throw new AppError('Rating desse filme deve ser um número entre 1 e 5!');
        }

        const updatedNote = {
            description: description ?? note.description,
            rating: rating ?? note.rating
        }

        await knex('movie_notes').where({user_id, id}).update(updatedNote)

        return response.json({ message: 'Nota atualizada com sucesso!' });
    }
}

module.exports = MovieNotesController;