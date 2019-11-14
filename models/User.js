const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    },
    online: {
        type: Boolean,
        required: true,
        default: false
    },
    barber: {
        type: Boolean,
        required: true,
        default: false
    }
});
var User = mongoose.model("User", UserSchema);

module.exports = User;