const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            enum: ['Mr', 'Mrs', 'Miss'],
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            // maxlength: 15
        },
        address: {
            street: { type: String, trim: true },
            city: { type: String, trim: true },
            pincode: { type: String, trim: true }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model("user", userSchema);

module.exports = User;