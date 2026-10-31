const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getFinancialDashboard } = require("../controllers/dashboardController");

const router = express.Router();

router.use(authMiddleware);
router.get("/financial", getFinancialDashboard);

module.exports = router;
