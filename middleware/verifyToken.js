import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authenticateToken = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        const user = await User.findOne({ _id: decoded._id, token: token });
        if (!user) {
          return res.status(401).json({ error: "Invalid token." });
        }
        req.user = user;
        next();
      }
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token expired. Please log in again");
        return res
          .status(401)
          .json({ error: "Token expired. Please log in again" });
      } else {
        console.log("Not Authorized. Please log in again");
        return res
          .status(401)
          .json({ error: "Not Authorized. Please log in again" });
      }
    }
  } else {
    console.log("There is no token attached to the header");
    return res
      .status(401)
      .json({ error: "Access denied. Token not provided." });
  }
};
