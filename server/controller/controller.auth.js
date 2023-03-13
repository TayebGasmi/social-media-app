const { sendConfirmationEmail, sendRestEmail } = require("../utils/mail");
const Users = require("../models/model.user");
const activationToken = require("../models/model.activationToken");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const { AUTH_ROLES } = require("../middlewares/auth");
const signUp = (Model, Other) => async (req, res) => {
  try {
    const document = await Model.findOne({ email: req.body.email })
      .select({ email: 1 })
      .lean()
      .exec();
    const other = await Other.findOne({ email: req.body.email })
      .select({ email: 1 })
      .lean()
      .exec();
    if (document) {
      return res
        .status(400)
        .json({ error: { path: "email", msg: "email already registered" } });
    }
    if (other) {
      return res
        .status(400)
        .json({ error: { path: "email", msg: "email already registered" } });
    }
    const newDocument = new Model({ ...req.body });
    const newCode = new activationToken({
      owner: newDocument._id,
      ref: Model.collection.name,
    });
    await Promise.all([newDocument.save(), newCode.save()]);
    sendConfirmationEmail(newDocument);
    return res.status(200).json(newDocument);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const signInWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;
  try {
    if (!idToken)
      throw new res.status(500).json({
        message: "Missing Google login infos!",
      });
    let response = await client.verifyIdToken({
      idToken,
    });
    const { email_verified, email } = response.payload;
    if (!email_verified)
      res.status(400).json({
        message: "Google account not verified!",
      });
    let user = await Users.findOne({ email })
      .select({
        email: 1,
        password: 1,
        isActive: 1,
        isBlocked: 1,
      })
      .populate("friends")
      .lean();
    if (user) {
      const token = jwt.sign(
        { _id: user._id, role: AUTH_ROLES.USER },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d",
        }
      );
      return res.status(200).json({
        user,
        token,
      });
    } else {
      user = new Users({
        firstName: "yopex-FirstnameUser",
        lastName: "yopex-LastnameUser",
        email,
        password: email,
        birthDate: new Date(),
        country: "yopex-Country",
        gender: "male",
        isActive: true,
      });
      let googleUser = await user.save();
      const token = jwt.sign(
        { _id: googleUser._id, role: AUTH_ROLES.USER },
        process.env.JWT_SECRET,
        {
          expiresIn: "15d",
        }
      );
      return res.status(200).json({
        user,
        token,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const signIn = (Model) => async (req, res) => {
  try {
    const document = await Model.findOne({ email: req.body.email }).select({
      email: 1,
      password: 1,
      isActive: 1,
      isBlocked: 1,
    });
    if (!document) {
      return res.status(400).json({ error: "email unregistred" });
    }
    const match = await document.matchPassword(req.body.password);
    if (!match) {
      return res.status(400).json({ error: "wrong password or email" });
    }
    if (!document.isActive) {
      return res.status(400).json({ error: "inActive account " });
    }
    if (document.isBlocked) {
      return res.status(400).json({ error: "blocked account" });
    }
    const token = jwt.sign(
      { id: document._id, role: Model.collection.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    return res.status(200).json({ token, document });
  } catch (err) {
    return res
      .status(500)
      .json({ error: { path: "server", msg: err.message } });
  }
};
const confirmAccount = (Model, id) => async (req, res) => {
  try {
    var document = await Model.findById(req.params[id]);
    if (document.isActive) {
      await activationToken.deleteMany({ owner: req.params[id] });
      return res.status(400).json({ error: "already active" });
    }
    const token = activationToken
      .findOne({ owner: req.params[id], ref: Model.collection.name })
      .lean();
    if (!token) {
      return res.status(400).json({ error: "error" });
    }
    document.isActive = true;
    await Promise.all([
      activationToken.deleteMany({
        owner: req.params[id],
        ref: Model.collection.name,
      }),
      document.save(),
    ]);
    return res.status(200).json("active");
  } catch (err) {
    return res.status(500).json({ error: "server not work" });
  }
};
const restPasswordMail = (Model, id) => async (req, res) => {
  try {
    const document = await Model.findOne({ email: req.params.email })
      .select({ email: 1, isActive: 1, isBlocked: 1 })
      .lean();
    if (!document) return res.status(400).json({ error: "!invalid email" });
    if (!document.isActive)
      return res.status(400).json({ error: "!inactive account" });
    if (document.isBlocked)
      return res.status(400).json({ error: "!blocked account" });
    sendRestEmail(req.params[id]);
    return res.status(200).json("ok");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const restPasswordToken = (Model, id) => async (req, res) => {
  try {
    const token = jwt.verify(req.params[id], process.env.JWT_SECRET);
    if (!token) {
      return res.status(400).json({ error: "invalid params" });
    }
    const document = await Model.findOne({ email: token.email });
    if (!document) {
      return res.status(400).json({ error: "invalid email" });
    }
    document.password = req.body.password;
    await document.save();
    return res.status(200).json("password updated");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signUp,
  signIn,
  confirmAccount,
  restPasswordMail,
  restPasswordToken,
  signInWithGoogle,
};
