const router = require("express").Router();
const contactController = require("../controllers/contactController")
const validateToken = require("../middleware/validateToken")


router.use(validateToken)

router.get("/", contactController.getAllContacts)

router.get("/:id", contactController.getContact)

router.post("/", contactController.createContact)

router.put("/:id", contactController.updateContact)

router.delete("/:id", contactController.deleteContact)

module.exports = router