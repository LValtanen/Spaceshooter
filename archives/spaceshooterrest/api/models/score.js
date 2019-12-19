const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    name: String,
    score: Number
});

module.exports = mongoose.model('Score', scoreSchema)