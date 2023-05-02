const express = require("express");
const router = express.Router();
const Controller = require("../Controllers/UsersController");

router.get("/", Controller.show);
router.post("/create", Controller.create);
router.put("/:id", Controller.update);
router.delete("/:id", Controller.remove);

module.exports = router;