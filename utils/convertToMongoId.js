const {ObjectId} = require("mongodb");

const mongoId = (id) => {
    const userId = new ObjectId(toString(id));
    return userId;
    
}

module.exports = mongoId;