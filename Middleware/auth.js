import jwt from "jsonwebtoken";

async function auth(req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    //decodes token id
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export default auth;
