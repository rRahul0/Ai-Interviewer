import mongoose from "mongoose";
const Interview = new mongoose.Schema({
    jsonMockResp: {
        type: String,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    jobExperience: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    mockId: {
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    }
    });
export default mongoose.model.Interview || mongoose.model("Interview", Interview);