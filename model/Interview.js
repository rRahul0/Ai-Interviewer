import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
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
    userId: {
        type: String,
        required: true,
    }
});

const Interview = mongoose.models?.Interview || mongoose.model('Interview', interviewSchema);
export default Interview;