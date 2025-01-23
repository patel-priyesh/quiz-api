let QUIZ = require('../model/quiz');
// let Category = require('../model/category');
const CATEGORY = require('../model/category');

exports.create = async (req, res, next) => {

    try {

        let { title, description, questions, category } = req.body;
        let quiz = await QUIZ.create({
            title,
            description,
            questions,
            category
        })

        res.status(201).json({
            status: "Success",
            message: "Quiz created successfully",
            data: quiz
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Quiz create failed",
            data: error.message
        })
    }

}

exports.read = async (req, res, next) => {
    try {
        let findquiz;

        if (req.query.search) {
            const categories = await CATEGORY.find({
                name: { $regex: req.query.search, $options: 'i' }
            });

            const categoryIds = categories.map(category => category._id);

            findquiz = await QUIZ.find({
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { category: { $in: categoryIds } }
                ]
            }).populate('category');
        } else {
            findquiz = await QUIZ.find().populate('category');
        }

        res.status(200).json({
            status: "Success",
            message: "Quiz read successfully",
            data: findquiz
        });
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Quiz read failed",
            data: error.message
        });
    }
};

exports.update = async (req, res, next) => {
    try {
        let quizId = req.params.id;
        // console.log(`Updating quiz with ID: ${quizId}`);

        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz not found");

        // Assuming req.body contains the question ID and the updated question data
        let { questionId, updatedQuestion } = req.body;

        let questionIndex = quiz.questions.findIndex(q => q._id.toString() === questionId);
        if (questionIndex !== -1) {
            quiz.questions[questionIndex] = updatedQuestion;
        } else {
            throw new Error("Question not found");
        }

        let updatedQuiz = await quiz.save();

        res.status(200).json({
            status: "Success",
            message: "Quiz updated successfully",
            data: updatedQuiz
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Error",
            message: error.message
        });
    }
};

exports.deleteQuiz = async (req, res, next) => {

    try {

        let quizdelete = await QUIZ.findById(req.params.id)
        // console.log(quizdelete);

        if (!quizdelete) throw new Error("Quiz not found");

        await QUIZ.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "Quiz delete successfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Quiz delete failed",
            data: error.message
        })
    }

}

exports.deleteQuestion = async (req, res, next) => {
    try {
        const quizId = req.params.id;

        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz not found");

        let { questionId } = req.body
        if (!questionId) throw new Error("Question ID is required");

        const questionIndex = quiz.questions.findIndex(q => q._id.toString() === questionId);
        if (questionIndex !== -1) {
            quiz.questions.splice(questionIndex, 1);
        } else {
            throw new Error("Question not found");
        }

        await quiz.save();

        res.status(200).json({
            status: "Success",
            message: "Question deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Error",
            message: error.message
        });
    }
};

exports.AddQuestion = async (req, res, next) => {

    try {
        let quizId = req.params.id;

        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz not found");

        let { newQuestion } = req.body;
        if (!newQuestion) throw new Error("Question is required");

        quiz.questions.push(newQuestion);

        let data = await quiz.save();

        res.status(200).json({
            status: "Success",
            message: "Question added successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Question add failed",
            data: error.message
        })
    }
};

exports.playquiz = async (req, res, next) => {
    try {
        const quizId = req.params.id;

        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz not found");

        if (quiz.questions.length === 0) throw new Error("No questions available");

        const shuffledQuestions = quiz.questions.sort(() => Math.random() - 0.5);

        res.status(200).json({
            status: "Success",
            message: "Quiz play successful",
            data: shuffledQuestions
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Error",
            message: error.message
        });
    }
};

exports.submitQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.id;
        const userAnswers = req.body.answers;
        let quiz = await QUIZ.findById(quizId);
        if (!quiz) throw new Error("Quiz not found");

        if (quiz.questions.length === 0) throw new Error("No questions available");

        let score = 0;

        userAnswers.forEach(userAnswer => {
            let question = quiz.questions.find(ans => ans._id.toString() === userAnswer.questionId)
            if (question && question.answer === userAnswer.answer) {
                score++;
            }
        });

        res.status(200).json({
            status: "Success",
            message: "Quiz submitted successfully",
            score,
            totalQuestions: quiz.questions.length
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: "Error",
            message: error.message
        });
    }
};