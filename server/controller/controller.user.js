const Users = require("../models/model.user");
const updatePassword = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id);
    const match = await user.matchPassword(req.body.password);
    if (!match) return res.status(400).json({ error: "wrong password" });
    user.password = req.body.newPassword;
    await user.save();
    return res.status(200).json("password updated");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.params.email })
      .select({ email: 1 })
      .lean();

    if (user) {
      return res.status(200).json({ exist: true });
    }
    return res.status(200).json({ exist: false });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateProfil = async (req, res) => {
  Users.findByIdAndUpdate(req.user._id, req.body)
    .then(() => res.status(200).json("profil updated"))
    .catch((err) => res.status(400).json(err));
};
const currentUser = async (req, res) => {
  const { user } = req;
  try {
    const user = await Users.findById(req.user._id)
      .populate("friends")
      .populate("invitations")
      .populate({
        path: "savedPost",
        populate: { path: "owner", select: ownerDetails },
      })
      .lean();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10, name = null } = req.query;
    limit = isNaN(limit) ? 10 : parseInt(limit);
    page = isNaN(page) ? 1 : parseInt(page);
    const users = await Users.find()
      .select(userDetails)
      .lean({ virtuals: true })
      .exec();
    if (users.length === 0) return res.status(204).json(users);
    const data = users.filter((e) => nameMatch(e.firstName, e.lastName, name));
    const count = data.length;
    const totalPages = Math.ceil(count / limit);
    if (count === 0) return res.status(204).json(data);
    if (page > totalPages) return res.status(204).json(data);
    return res.status(200).json({
      data: data.slice((page - 1) * limit, page * limit),
      currentPage: page,
      perviousPage: page - 1 || null,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  updatePassword,
  getUserByEmail,
  updateProfil,
  currentUser,
  getAllUsers,
};
