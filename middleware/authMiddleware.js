import jwt from "jsonwebtoken";


export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token missing" });

  console.log("token ", token)

  jwt.verify(token, "secretKey", (err, user) => {
    console.log("decoded token :", user)
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}
