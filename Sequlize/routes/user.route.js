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
router.post("/setter", userController.setter);
router.get("/getter", userController.getter);
router.get("/rawQuery", userController.rawQuery);
router.get("/one-to-one", userController.oneToone);
router.get("/belongsTo", userController.belongsTo);
router.get("/one-to-many", userController.oneTomany);
router.get("/many-to-many", userController.manyTomany);

module.exports = router;
