const bcrypt = require('bcrypt');
const randToken = require('rand-token');
const authMethod = require('../methods/auth.methods');
const jwtVariable = require('../constants/jwtVariable');
const UserModel = require('../models/user.model');


const AuthController = {};

AuthController.profile = async(req, res) => {
  try {
    const users = await UserModel.findAll();
    console.log(users);
    return res.status(200).json(users)
  } catch(error) {
    console.log(error);
  }
  return res.status(400).json({error: 'error'})
};


AuthController.signup = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const checkUser = await UserModel.findOne({
      where: {
        userName
      }
    });
    if(checkUser) {
      return res
        .status(401)
        .json({error: 'Username is exist!'});
    }

    const data = {
      userName,
      password: hashedPassword
    }
    const user = await UserModel.create(data);
    if(!user) {
      return res
        .status(500)
        .json({error: 'Server error! Pls try again'});
    }
    
    return res
      .status(200)
      .json({message: 'Register success! Login now'});
  } catch (error) {
    next(error);
  }
};

AuthController.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({
      where: {
        userName,
      }
    })
    if(!user) {
      return res
        .status(401)
        .json({ error: 'Username not exist' });
    }
  
    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) {
      return res
        .status(401)
        .json({ error: 'Password is invalid' });
    }
  
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const dataForAccessToken = {
      userName: user.userName,
    }
    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    )
    if (!accessToken) {
      return res
        .status(500)
        .json({error: 'Server error! Pls try again'});
    }
    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); 
    if (!user.refreshToken) {
      // const updateRefreshToken = await UserModels.updateRefreshToken(user.userName, refreshToken);
      
      const updateRefreshToken = await UserModel.update({refreshToken}, {
        where: {
          userName: user.userName,
        }
      });

      if(!updateRefreshToken) {
        return res
          .status(500)
          .json({error: 'Server error! Pls try again'});
      }
    } else {
      refreshToken = user.refreshToken;
    }

    return res
      .status(200)
      .json({
        message: "Login success",
        user: {
          userName: user.userName,
          age: user.age,
          gender: user.gender,
          refreshToken,
        },
        accessToken: accessToken,
      });

  } catch(err) {
    return res.status(401).json({error: err});
  }
}


AuthController.refreshToken = async (req, res) => {
  const accessTokenFromHeader = req.headers.x_authorization;
  const refreshTokenFromBody = req.body.refreshToken;

  if(!accessTokenFromHeader) {
    return res.status(400).json({error: "Not found the access token"})
  }

  if(!refreshTokenFromBody) {
    return res.status(400).json({error: "Not found the refresh token"})
  }

  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

  const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);

  if (!decoded) {
		return res
      .status(400)
      .json({error: "Access token is invalid"});
	}

  const userName = decoded.payload.userName;

	const user = await UserModel.findOne({
    where: {
      userName
    }
  })
	if (!user) {
		return res
      .status(401)
      .json({error: "Username not exist"});
	}

	if (refreshTokenFromBody !== user.refreshtoken) {
		return res
      .status(400)
      .json({error:  "Refresh token is invalid"});
	}

	const dataForAccessToken = {
		userName,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(500)
			.json({error: "Server error. Pls try again"});
	}

  return res
    .status(200)
    .json({ data: {accessToken: accessToken} })

};

module.exports = AuthController;