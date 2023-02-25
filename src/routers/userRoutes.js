const router = require("express").Router()
const userController = require("../controllers/userController")
const validateToken = require("../middleware/validateToken")

router.post("/register", userController.register)

router.post("/login", userController.login)

router.get("/current", validateToken, userController.currentUser)

router.get("/logout", validateToken, userController.logout)

module.exports = router

//burdaki gibi sadece bazılarında varsa ayrıca koyarsın ama komple tüm hepsi için bvarsa conract routes gibi genl yapabilirsin