import mongoose from "mongoose";
const userAnswer = new mongoose.Schema({
    mockIdRef: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    correctAns: {
        type: String,
    },
    userAns: {
        type: String,
    },
    feedBack: {
        type: String,
    },
    rating: {
        type: String,
    },
    // userEmail: {
    //     type: String,
    // },
    createdAt: {
        type: String,
        required: true,
        notNull:true,
    },
    });
export default mongoose.models.userAnswer || mongoose.model("userAnswer", userAnswer);