const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
var Barber = mongoose.model("Barber", BarberSchema);

module.exports = Barber;