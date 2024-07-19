import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/DbConfig';
import { userAnswer } from '@/model/userAnswer';
// feedback interview

export const feedbackInterview = async (req, res) => {
    try {
        await connectDB();
        const result = await userAnswer.find({
            mockIdRef: params.interviewId
        }).sort({ createdAt: -1 });

        return res.status(200).json({ result, message: 'User answer saved successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}