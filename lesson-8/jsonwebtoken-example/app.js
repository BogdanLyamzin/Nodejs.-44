const jwt = require("jsonwebtoken");

const SECRET_KEY = "2refaasdfhgsdg313fd";

const payload = {
    id: "61ddd782ec0f300053327bfc"
};

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
// console.log(token);

const decodeToken = jwt.decode(token);
console.log(decodeToken);

try {
    const verifyToken = jwt.verify(`${token}2`, SECRET_KEY);
    console.log(verifyToken)
} catch (error) {
    console.log(error.message)
}



