const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
/*
1. Извлечь заголовок Authorization.
2. Разделить заголовок на 2 слова по пробелу.
3. Если первое слово не равно Bearer отправить 401 ошибку.
4. Если все ок, то проверить второе слово (токен) на валидность (
    было ли оно зашифровано секретным ключом
).
5. Взять из токена id и найти пользователя по этому id в базе данных.
6. Если такого пользователя нет, отправить 401 ошибку.
7. Прикрепить к объекту Request свойство user, равное найденном пользоваелю.
*/

const {User} = require("../models/user")

const {SECRET_KEY} = process.env;

const authenticate = async(req, res, next)=> {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer"){
        const error = new Unauthorized();
        next(error);
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token){
            const error = new Unauthorized();
            next(error);
        }
        req.user = user;
        next();
    }
    catch(error){
        error.status = 401;
        next(error);
    }
}

module.exports = authenticate;