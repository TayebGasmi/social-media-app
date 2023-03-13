const jwt = require("jsonwebtoken");
const UserModel = require("../models/model.user");
const CompanyModel = require("../models/model.company");

exports.AUTH_ROLES = {
  NO_TOKEN: "no token",
  USER: "user",
  COMPANY: "company",
};
exports.authorize =
  (...roles) =>
  async (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers.authorization;
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      if (roles.length === 0 || roles.includes("no token")) {
        return next();
      }
      return res
        .status(401)
        .json({ message: "you are not authorized to do this!" });
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      if ("role" in data) {
        if (data.role == "user") {
          const user = await UserModel.findOne({ _id: data.id || data._id })
            .populate("friends")
            .lean();
          req.user = user;
          req.role = "user";
        } else if (data.role == "company") {
          const company = await CompanyModel.findOne({
            _id: data.id || data._id,
          }).lean();
          req.company = company;
          req.role = "company";
        } else return res.status(404).json({ message: "Not found!" });
      } else {
        const [user, company] = await Promise.all([
          UserModel.findById(data.id || data._id),
          CompanyModel.findById(data.id || data._id),
        ]);
        if (user) {
          req.user = user;
          req.role = "user";
        } else if (company) {
          req.company = company;
          req.role = "company";
        } else
          return res
            .status(404)
            .json({ message: "verify your informations! " });
      }
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "you are not authorized to do this!" });
    }
  };
