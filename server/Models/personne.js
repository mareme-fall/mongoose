let mongoose = require('mongoose')

const personneSchema = new mongoose.Schema({
    name: String ,
    age: Number,
    favoriteFoods: [String]
});
const PersonModel= mongoose.model('Person', personneSchema)

module.exports = PersonModel;
