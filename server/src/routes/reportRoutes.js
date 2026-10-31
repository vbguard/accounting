const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { exportJournalEntries } = require("../controllers/reportController");

const router = express.Router();

router.use(authMiddleware);
router.get("/journal/export", exportJournalEntries);

module.exports = router;
