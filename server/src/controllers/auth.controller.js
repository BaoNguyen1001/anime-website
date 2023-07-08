const bcrypt = require("bcrypt");
const randToken = require("rand-token");
const authMethod = require("../methods/auth.methods");
const jwtVariable = require("../constants/jwtVariable");
const UserModel = require("../models/user.model");
const response = require("../constants/response");

const AuthController = {};

AuthController.signup = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUser = await UserModel.findOne({
      where: {
        userName,
      },
    });
    if (checkUser) {
      return response(res, 401, {}, "Username is exist!");
    }

    const data = {
      userName,
      password: hashedPassword,
    };
    const user = await UserModel.create(data);
    if (!user) {
      return response(res, 500, {}, "Server error! Pls try again");
    }

    return response(res, 200, { message: "Register success! Login now" });
  } catch (error) {
    next(error);
  }
};

AuthController.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({
      attributes: ["userName", "refreshToken", "password"],
      where: {
        userName,
      },
    });
    if (!user) {
      return response(res, 401, {}, "Username not exist");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return response(res, 401, {}, "Password is invalid");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const dataForAccessToken = {
      userName: user.userName,
    };
    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife
    );
    if (!accessToken) {
      return response(res, 500, {}, "Server error! Pls try again");
    }
    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
    if (!user.refreshToken) {
      // const updateRefreshToken = await UserModels.updateRefreshToken(user.userName, refreshToken);

      const updateRefreshToken = await UserModel.update(
        { refreshToken },
        {
          where: {
            userName: user.userName,
          },
        }
      );

      if (!updateRefreshToken) {
        return response(res, 500, {}, "Server error! Pls try again");
      }
    } else {
      refreshToken = user.refreshToken;
    }
    const result = {
      user: {
        userName: user.userName,
        refreshToken,
      },
      accessToken: accessToken,
    };
    return response(res, 200, result);
  } catch (err) {
    return response(res, 401, {}, err);
  }
};

AuthController.refreshToken = async (req, res) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  const refreshTokenFromBody = req.body.refreshToken;

  if (!accessTokenFromHeader) {
    return response(res, 400, {}, "Not found the access token");
  }

  if (!refreshTokenFromBody) {
    return response(res, 400, {}, "Not found the refresh token");
  }

  const accessTokenSecret =
    process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  const accessTokenLife =
    process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

  const decoded = await authMethod.decodeToken(
    accessTokenFromHeader,
    accessTokenSecret
  );

  if (!decoded) {
    return response(res, 400, {}, "Access token is invalid");
  }

  const userName = decoded.payload.userName;

  const user = await UserModel.findOne({
    where: {
      userName,
    },
  });
  if (!user) {
    return response(res, 401, {}, "Username not exist");
  }

  if (refreshTokenFromBody !== user.refreshToken) {
    return response(res, 401, {}, "Refresh token is invalid");
  }

  const dataForAccessToken = {
    userName,
  };

  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return response(res, 500, {}, "Server error! Pls try again");
  }

  return response(res, 200, { accessToken: accessToken });
};

AuthController.profile = async (req, res) => {
  const { id } = req.user;
  try {
    const userProfile = await UserModel.findOne({
      where: {
        id,
      },
    });

    if (userProfile) {
      const formatUserProfile = {
        id: userProfile.id,
        userName: userProfile.userName,
        fullName: userProfile.fullName,
        age: userProfile.age,
        gender: userProfile.gender,
      };
      return response(res, 200, { userProfile: formatUserProfile });
    }

    return response(res, 200, {}, "User not found");
  } catch (err) {
    return response(res, 500, {}, "Server error! Pls try again");
  }
};

AuthController.updateProfile = async (req, res) => {
  const { id } = req.user;
  const { profile } = req.body;
  try {
    const user = await UserModel.findByPk(id);

    if (!user) {
      return response(res, 200, {}, "User not found");
    }

    user.fullName = profile.fullName;
    user.age = profile.age;
    user.gender = profile.gender;

    await user.save();

    return response(res, 200, { message: "Update profile success!" });
  } catch (err) {
    return response(res, 500, {}, "Server error! Pls try again");
  }
};

module.exports = AuthController;
