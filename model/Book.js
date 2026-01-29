const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    authorid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }
});

module.exports = mongoose.model("Book", BookSchema);