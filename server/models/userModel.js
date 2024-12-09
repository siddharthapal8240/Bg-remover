import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unqiue: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    photo: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    creditBalance: {
        type: Number,
        default: 5
    }
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel;
