const bcrypt = require("bcryptjs");

const password = "123456";

const hashPassword = async(value)=> {
    const salt = await bcrypt.genSalt(10);
    // console.log("salt", salt);
    const result = await bcrypt.hash(value, salt);
    // console.log("hashPassword", result);

    const compareResult = await bcrypt.compare("123456", result);
    // console.log(compareResult)
    const compareResult2 = await bcrypt.compare("123457", result);
    console.log(compareResult2);
};

hashPassword(password);
