const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const companySchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 255, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["mega", "pe", "pme", "ge"],
    },
    fields: { type: [String], required: true },
    contacts: {
      type: [
        {
          code: { type: Number },
          number: { type: Number },
        },
      ],
    },
    password: { required: true, type: String, minLength: 8, maxLength: 1024 },
    email: { required: true, type: String, unique: true },
    country: { type: String, required: true },
    coverPhoto: { type: String },
    logo: { type: String },
    websiteUrl: { type: String },
    verified: { type: Boolean, default: false },
    description: { type: String },
    isBlocked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);
companySchema.pre("save", async function (nxt) {
  try {
    if (this.isModified("password"))
      this.password = await bcrypt.hash(this.password, 10);
    nxt();
  } catch (error) {
    throw error;
  }
});
companySchema.methods.matchPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    return match;
  } catch (err) {
    throw err;
  }
};
companySchema.plugin(mongooseLeanVirtuals);
const Companies = mongoose.model("company", companySchema, "company");
module.exports = Companies;
