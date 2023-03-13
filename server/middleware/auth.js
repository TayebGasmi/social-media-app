const jwt = require("jsonwebtoken");
const UserModel = require("../models/model.user");
const CompanyModel = require("../models/model.company");
//Models is an objects of models
//roles is an array of roles
exports.authorizeAdmin = async (req, res, next) => {
  let token = req.header("x-auth-token") || req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  token = token.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = decoded;
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send("Invalid token.");
    }
    if (!user.isAdmin) {
      return res.status(403).send("Access denied.");
    }
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
exports.AUTH_ROLES = {
  USER: "USER",
  COMPANY: "COMPANY",
  EXPERT: "EXPERT",
};
exports.authorize = (roles) => {
  return async (req, res, next) => {
    let token = req.header("x-auth-token") || req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    token = token.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { email } = decoded;
      const user = await UserModel.findOne({ email });
      const company = await CompanyModel.findOne({ email });
      if (!user || !company) {
        return res.status(400).send("Invalid token.");
      }
      if (company && roles.includes("COMPANY")) {
        next();
      }
      if (user && roles.includes("USER")) {
        next();
      }
      if (user && roles.includes("EXPERT") && user.isExpert) {
        next();
      }
      return res.status(403).send("Access denied.");
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};
