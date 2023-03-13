const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    firstName: { required: true, type: String, maxLength: 255, trim: true },
    lastName: { required: true, type: String, maxLength: 255, trim: true },
    password: { required: true, type: String, minLength: 8, maxLength: 1024 },
    email: { required: true, type: String, unique: true },
    birthDate: { required: true, type: Date },
    gender: { required: true, type: String, enum: ["female", "male"] },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    invitations: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    picture: { type: String },
    coverPhoto: { type: String },
    studyCarrier: {
      type: [
        {
          university: {
            type: String,
          },
          startDate: { type: Date },
          EndDate: { type: Date },
        },
      ],
    },
    workCarrier: {
      type: [
        {
          company: {
            type: String,
          },
          startDate: { type: Date },
          EndDate: { type: Date },
        },
      ],
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    skills: [{ name: { type: String }, level: { type: Number, default: 0 } }],
    isExpert: { type: Boolean, default: false },
    certificates: [
      { name: { type: String }, date: { type: Date }, file: { type: String } },
    ],
  },
  { timestamps: true }
);
userSchema.methods.matchPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (err) {
    throw err;
  }
};
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
userSchema.virtual("nbrFriend").get(function () {
  if (this.friends) {
    return this.friends.length;
  }
  return 0;
});
userSchema.pre("save", async function (nxt) {
  try {
    if (!this.isModified("password")) return nxt();
    this.password = await bcrypt.hash(this.password, 10);
    return nxt();
  } catch (err) {
    throw err;
  }
});
userSchema.query.paginate = function (page, limit) {
  try {
    this.skip((page - 1) * limit).limit(limit);
  } catch (err) {}
};
userSchema.plugin(mongooseLeanVirtuals);
const Users = mongoose.model("user", userSchema, "user");
module.exports = Users;
