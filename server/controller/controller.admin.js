const Users = require("../models/model.user");
const Companies = require("../models/model.company");
const userDetails = {
  firstName: 1,
  lastName: 1,
  picture: 1,
  field: 1,
  score: 1,
  country: 1,
};
const blockUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    user.isBlocked = true;
    await user.save();
    return res.status(200).json("blocked");
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};
const unblockUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    user.isBlocked = false;
    await user.save();
    return res.status(200).json("unblocked");
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};
const verfieCompany = async (req, res) => {
  try {
    const company = await Companies.findById(req.params.id).exec();
    company.verfied = true;
    await company.save();
    return res.status(200).json("verfied");
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};
const unverfieCompany = async (req, res) => {
  try {
    const company = await Companies.findById(req.params.id).exec();
    company.verfied = false;
    await company.save();
    return res.status(200).json("unverfied");
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};

const getBlokcedUser = async (req, res) => {
  try {
    const users = await Users.find({ isBlocked: true })
      .select(userDetails)
      .lean();
    if (users.length === 0) return res.status(204).json(users);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  blockUser,
  unblockUser,
  verfieCompany,
  getBlokcedUser,
  unverfieCompany,
};
