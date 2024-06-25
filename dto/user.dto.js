// const Joi = require('joi');

// exports.createUserDTO = Joi.object({
//     email: Joi.string().email().required(),
//     name: Joi.string().required(),
//     age: Joi.number().integer().min(18).max(100).required(),
//     city: Joi.string().required(),
//     zipCode: Joi.string().required()
// });



// exports.updateUserDTO = Joi.object({
//     email: Joi.string().email(),
//     name: Joi.string().required(),
//     age: Joi.number().integer().min(18).max(100),
//     city: Joi.string(),
//     zipCode: Joi.string(),
// }).min(1);



class UserDTO {
    constructor(id, email, name, age, city, zipCode) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.city = city;
        this.zipCode = zipCode;
    }
}

module.exports = UserDTO;
