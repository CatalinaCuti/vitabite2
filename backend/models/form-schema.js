const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true},
    email: {type: String, unique: true, required: true, trim : true, lowercase : true},
    mensaje: { type: String, required: true}
});

module.exports = mongoose.model('Form', formSchema);