const express = require("express");
const router = express.Router();
// router.use(bodyParser.json({ limit: "50mb" }));
// router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const userId = require("../process/userID");

router.post("/create", userId.CreateId);
router.post("/checkuser", userId.checkuser);
router.get("/getData", userId.getData);
router.post("/getDataById", userId.getDataById);
router.post("/updateId", userId.updateId);
router.post("/deleteId", userId.deleteId);
router.post("/acceptId", userId.acceptId);
router.post("/resetId", userId.resetId);

module.exports = router;
