const express = require("express");
const router = express.Router();
const procurementListController = require("../controller/procurementListController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add-procurement-list", authMiddleware, procurementListController.addProcurement);
router.get("/get-procurement-list/:id", procurementListController.getProcurement);
router.get("/get-all-procurement-list", procurementListController.getAllProcurement);
router.get("/get-all-procurement-list-user",authMiddleware, procurementListController.getAllProcurementUser);

module.exports = router;