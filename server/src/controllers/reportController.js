const JournalEntry = require("../models/JournalEntry");

const exportJournalEntries = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, format = "csv" } = req.query;

    const match = {
      user: userId,
      status: "posted",
    };

    if (startDate || endDate) {
      match.entryDate = {};
      if (startDate) match.entryDate.$gte = new Date(startDate);
      if (endDate) match.entryDate.$lte = new Date(endDate);
    }

    const entries = await JournalEntry.find(match).sort({ entryDate: -1 }).lean();

    if (format === "json") {
      return res.status(200).json(entries);
    }

    const rows = [["reference", "entryDate", "memo", "status", "source"]];
    entries.forEach((entry) => {
      rows.push([
        entry.reference || "",
        new Date(entry.entryDate).toISOString().split("T")[0],
        entry.memo || "",
        entry.status,
        entry.source,
      ]);
    });

    const csv = rows.map((row) => row.join(",")).join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="journal-entries.csv"');
    return res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = { exportJournalEntries };
