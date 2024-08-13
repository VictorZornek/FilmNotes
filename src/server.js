require('express-async-errors')

const AppError = require('./utils/AppError');
const express = require("express");  //importa o módulo do express

const routes = require('./routes')

const app = express();  // inicializa o app com express
app.use(express.json());

app.use(routes);

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