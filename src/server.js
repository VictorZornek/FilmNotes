require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations'); // importação banco de dados
const AppError = require('./utils/AppError');

const uploadConfig = require("./configs/upload");

const express = require("express");  //importa o módulo do express
const database = require("./database/sqlite");

const routes = require('./routes')

const app = express();  // inicializa o app com express
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);

migrationsRun();

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})


const PORT = 3000;  // define a porta para o servidor
app.listen(PORT, () => {    // iniciando o servidor na porta definida
    console.log(`Server is running on Port ${PORT}`)
});