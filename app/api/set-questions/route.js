import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/DbConfig';
import { Interview } from '@/model/Interview';
//page.jsx in start

export const setQuestions = async (req, res) => {
    try {
        await connectDB();
        const result = await Interview.findOne({ mockId: params.interviewId });
        const questions = JSON.parse(result[0].jsonMockResp)
        console.log(questions);
        return res.status(200).json({ questions, message: 'Interview Created Successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}