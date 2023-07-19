const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/add-user", userController.addUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.delete("/truncat-user", userController.trancate);
router.post("/bulk-insert", userController.bulkInsert);
router.get("/users", userController.getUsers);
router.get("/query", userController.queries);
router.get("/finder", userController.finders);

module.exports = router;
