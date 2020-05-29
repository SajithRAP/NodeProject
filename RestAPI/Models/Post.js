const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        title: String,
        description: String,
    }
)

module.exports = mongoose.model('Posts', PostSchema)

// Posts is the collections name shown in the mlab