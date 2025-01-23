let express = require('express')
let router = express.Router()
let quizController = require('../controllers/quiz')
let admincontroller = require('../controllers/user')

router.post("/create",admincontroller.SECURE,quizController.create)
router.post("/addquestion/:id",admincontroller.SECURE,quizController.AddQuestion)
router.post("/submit/:id",quizController.submitQuiz)
router.get("/read",quizController.read)
router.patch("/update/:id",admincontroller.SECURE,quizController.update)
router.delete("/deletequiz/:id",admincontroller.SECURE,quizController.deleteQuiz)
router.delete("/deletequestion/:id",admincontroller.SECURE,quizController.deleteQuestion)
router.get("/playquiz/:id",quizController.playquiz)
module.exports = router;