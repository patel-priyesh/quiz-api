let express = require('express')
let router = express.Router()
let categoryController = require('../controllers/category')

router.post("/create",categoryController.create)
router.get("/read",categoryController.read)
router.patch("/update/:id",categoryController.update)
router.delete("/delete/:id",categoryController.delete)

module.exports = router;