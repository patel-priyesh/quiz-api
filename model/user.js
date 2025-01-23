let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name:
    {
        type: String,
        required: [true, "name is required please enter a name"]
    },
    email:
    {
        type: String,
        required: [true, "email is required please enter a email"]
    },
    password:
    {
        type: String,
        required: [true, "password is required please enter a password"]
    },
    role:
    {
        type: String,
        enum: ["admin", "user"], default: "user",
        required: [true, "role is required please enter a role"]
    },
});

let USER = mongoose.model("user", userSchema)
module.exports = USER;