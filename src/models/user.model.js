import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema ( {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // from Cloudinary
        required: true
    },
    coverImage: {
        type: String, // from Cloudinary
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"

    }]
},
{timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    
        this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrerateAccesToken = function () {}



export const User = mongoose.model("User", userSchema)
