const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reference: {
      type: String,
      trim: true,
    },
    entryDate: {
      type: Date,
      required: true,
    },
    memo: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "posted", "reversed"],
      default: "draft",
    },
    source: {
      type: String,
      enum: ["manual", "invoice", "payment", "expense", "purchase", "adjustment"],
      default: "manual",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
