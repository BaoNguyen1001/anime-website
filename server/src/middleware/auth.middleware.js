const UserModel = require("../models/user.model");

const AuthMethod = require("../methods/auth.methods");

const AuthMiddleware = {};

AuthMiddleware.isAuth = async (req, res, next) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  // Lấy access token từ header
  if (!accessTokenFromHeader) {
    return res.status(401).json({ error: "Please login to use this feature" });
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const verified = await AuthMethod.verifyToken(
    accessTokenFromHeader,
    accessTokenSecret
  );
  if (!verified) {
    return res.status(403).json({ error: "The access token is expired" });
  }

  const user = await UserModel.findOne({
    attributes: ["id"],
    where: {
      userName: verified.payload.userName,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Username not exist" });
  }
  req.user = user;

  return next();
};

AuthMiddleware.isRating = async (req, res, next) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  if (
    !accessTokenFromHeader ||
    accessTokenFromHeader === undefined ||
    accessTokenFromHeader === ""
  ) {
    return res.status(200).json({ rating: 0 });
  }
  next();
};

module.exports = AuthMiddleware;
