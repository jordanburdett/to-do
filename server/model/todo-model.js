const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    id: {type: Number, required: true },
    title: {type: String, required: true},
    content: {type: String, required: true},
    isCompleted: {type: Boolean, required: true}
});

module.exports = mongoose.model('Todo', todoSchema)




// const contactSchema = mongoose.Schema({
//     id: { type: String, required: true },
//     name: {type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     imageUrl: {
//         type: String,
//         required: true
//     },
//     group: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }], required: false }
// });

// module.exports = mongoose.model('Contact', contactSchema);