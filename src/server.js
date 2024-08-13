const express = require("express");  //importa o módulo do express

const app = express();  // inicializa o app com express

const PORT = 3000;  // define a porta para o servidor

app.get('/', (request, response) => {  // definindo uma rota simples
    response.send("Server funcionando!");
})

app.listen(PORT, () => {    // iniciando o servidor na porta definida
    console.log(`Server is running on Port ${PORT}`)
});