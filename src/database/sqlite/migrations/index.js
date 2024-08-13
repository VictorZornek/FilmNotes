const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers.js');

async function migrationsRun() {
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection().then(database => database.exec(schemas)).catch(error => console.log(error));
}


module.exports = migrationsRun;

// esse arquivo serve para automatizar o processo de criação de tabelas casos seja necessário.