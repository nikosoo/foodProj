import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).send("Not authorized: admin only");
  }
  next();
};