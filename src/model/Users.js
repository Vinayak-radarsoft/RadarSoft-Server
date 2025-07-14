const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["admin", "super admin", "user"],
            default: "user",
        },
    },
    {
        strict: false,
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.index({ fullName: 1 });
UserSchema.index({ email: 1 });

const UserModel = model("User", UserSchema);

module.exports = UserModel;
