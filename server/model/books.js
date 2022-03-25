const mongoose = require('mongoose');

const Books = new mongoose.Schema(
    {
        isbn : {type: String},
        title: {type: String},
        author: {type: String},
        price: {type: Number},

    },
    {collection: 'books'}
);

const model = mongoose.model('Books', Books);

module.exports = model;