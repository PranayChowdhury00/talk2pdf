import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // ✅ fixed typo: "require" ➝ "required"
    },
    email: {
      type: String,
      required: true,
      unique: true, // optional: prevent duplicate emails
    },
    password: {
      type: String,
      required: false, // ✅ make optional for Google users
    },
    image: {
      type: String, // ✅ store Google profile image
      required: false,
    },
  },
  { timestamps: true }
);

const User = models.user || mongoose.model("user", userSchema);
export default User;

// -------------------------------------------
// import mongoose, { models, Schema } from "mongoose";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       require: true,
//     },
//     email: {
//       type: String,
//       require: true,
//     },
//     password: {
//       type: String,
//       require: true,
//     },
//   },
//   { timestamps: true }
// );

// const User = models.user || mongoose.model("user", userSchema);
// export default User;
