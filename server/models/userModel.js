import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    },
    creditBalance: {
        type: Number,
        required: true,
        default: 5
    },
})

const userModel = mongoose.models.user || mongoose.model('User', userSchema)

export default userModel;