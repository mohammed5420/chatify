module.exports = function (req, res, next) {
  if (req.user == null) {
    console.log("not found");
    return res.status(403).json({ message: "forbidden" });
  }
  return next();
};
