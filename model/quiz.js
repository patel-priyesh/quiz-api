let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let quizSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: [true, "Category is required"]
    },
    questions: [{
        question: {
            type: String,
            required: [true, "Question is required"]
        },
        options: [{
            type: String,
            required: [true, "Option is required"]
        }],
        answer: {
            type: String,
            required: [true, "Answer is required"]
        },
        lavel: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: [true, "Lavel is required please select lavel"]
        }
    }],
    createAt: {
        type: Date,
        default: Date.now()
    },
});

let QUIZ = mongoose.model("quiz", quizSchema)
module.exports = QUIZ;