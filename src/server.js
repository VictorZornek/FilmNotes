const express = require("express");  //importa o módulo do express

const routes = require('./routes')

const app = express();  // inicializa o app com express
app.use(express.json());

app.use(routes);

const PORT = 3000;  // define a porta para o servidor
app.listen(PORT, () => {    // iniciando o servidor na porta definida
    console.log(`Server is running on Port ${PORT}`)
});