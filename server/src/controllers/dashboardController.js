const JournalEntry = require("../models/JournalEntry");
const JournalEntryLine = require("../models/JournalEntryLine");

const getFinancialDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, accountId, type } = req.query;

    const matchEntry = {
      user: userId,
      status: "posted",
    };

    if (startDate || endDate) {
      matchEntry.entryDate = {};
      if (startDate) matchEntry.entryDate.$gte = new Date(startDate);
      if (endDate) matchEntry.entryDate.$lte = new Date(endDate);
    }

    const entries = await JournalEntry.find(matchEntry).select("_id");
    const entryIds = entries.map((entry) => entry._id);

    const lineMatch = { entry: { $in: entryIds } };
    if (accountId && accountId !== "all") lineMatch.account = accountId;

    const byType = await JournalEntryLine.aggregate([
      { $match: lineMatch },
      {
        $lookup: {
          from: "accounts",
          localField: "account",
          foreignField: "_id",
          as: "accountData",
        },
      },
      { $unwind: "$accountData" },
      {
        $match: type && type !== "all" ? { "accountData.type": type } : {},
      },
      {
        $group: {
          _id: "$accountData.type",
          totalDebit: { $sum: "$debit" },
          totalCredit: { $sum: "$credit" },
        },
      },
    ]);

    const balanceByAccount = await JournalEntryLine.aggregate([
      { $match: lineMatch },
      {
        $lookup: {
          from: "accounts",
          localField: "account",
          foreignField: "_id",
          as: "accountData",
        },
      },
      { $unwind: "$accountData" },
      {
        $group: {
          _id: "$account",
          name: { $first: "$accountData.name" },
          type: { $first: "$accountData.type" },
          debit: { $sum: "$debit" },
          credit: { $sum: "$credit" },
          net: { $sum: { $subtract: ["$debit", "$credit"] } },
        },
      },
      { $sort: { net: -1 } },
    ]);

    const monthlyTrend = await JournalEntry.aggregate([
      {
        $match: {
          ...matchEntry,
          entryDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          },
        },
      },
      {
        $project: {
          month: { $dateToString: { format: "%Y-%m", date: "$entryDate" } },
        },
      },
      {
        $group: {
          _id: "$month",
          entries: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      balanceByAccount,
      byType,
      monthlyTrend,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFinancialDashboard };
