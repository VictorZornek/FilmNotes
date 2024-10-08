const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieNotesController {
    async create(request, response) {
        const user_id = request.user.id;
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

    async update(request, response) {
        const user_id = request.user.id;
        const { description, rating, tags } = request.body;
        const { id } = request.query;

        const [note] = await knex('movie_notes').where({ user_id }).andWhere({ id });
        const tagsOnNote = await knex('movie_tags').select('name').where({user_id, note_id: id});

        if(!note){
            throw new AppError('Nota não foi encontrada!');
        }

        if(rating < 1 || rating > 5) {
            throw new AppError('Rating desse filme deve ser um número entre 1 e 5!');
        }

        const updatedNote = {
            description: description ?? note.description,
            rating: rating ?? note.rating,
        }

        await knex('movie_notes').where({user_id, id}).update(updatedNote);

        if(tags){
            const validTags = Array.isArray(tags) ? tags.filter(tag => tag && tag.trim()) : [];
            
            const checkNameOfTagsOnNote = tags.some(tag => tagsOnNote.some(tagOnNote => tagOnNote.name === tag));

            if(checkNameOfTagsOnNote) {
                throw new AppError('Uma ou mais tags adicionadas já estão cadastradas')
            }

            const tagsInsert = validTags.map(name => ({
                note_id: id,
                user_id,
                name
            }));

            await knex('movie_tags').insert(tagsInsert);
        }

        return response.json({ message: 'Nota atualizada com sucesso!' });
    }

    async delete(request, response) {
        const { id } = request.params;

        const note = await knex('movie_notes').where({ id });

        if(!note) {
            throw new AppError('Nota não foi encontrada!');
        }

        await knex('movie_notes').where({ id }).delete();

        return response.json({ message: 'Nota deletada com sucesso!' });
    }

    async show(request, response) {
        const { id } = request.params;

        const note = await knex('movie_notes').where({ id }).first()

        const tagsNote = await knex('movie_tags').select('name').where({ note_id: id }).first()

        return response.json({
            ...note,
            tags: tagsNote
        });
    }

    async index(request, response) {
        const user_id = request.user.id;

        const notes = await knex('movie_notes').where({ user_id });

        console.log(notes)

        return response.json()
    }
}

module.exports = MovieNotesController;