const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request payload too large" });
  }

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy violation" });
  }

  res.status(500).json({ error: "Internal server error" });
};

module.exports = { errorHandler };
