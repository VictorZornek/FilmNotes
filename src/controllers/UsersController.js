const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();
        const userExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userExists) {
            throw new AppError("Este email já está em uso.");
        }

        return response.status(201).json();
    }
}

module.exports = UsersController;