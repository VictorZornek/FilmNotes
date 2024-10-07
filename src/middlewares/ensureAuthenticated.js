const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth")

function ensuredAuthenticated(request, response, next) {
    
}