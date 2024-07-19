import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/DbConfig';
import { userAnswer } from '@/model/userAnswer'

//start component record answer

export const recordsAnswers = async (req, res) => {
    try {
        await connectDB();
        const dbRes = await userAnswer.create({
            mockIdRef: interviewData?.mockId,
            question: interviewQuestions[activeQuestion]?.question,
            correctAns: interviewQuestions[activeQuestion]?.answer,
            userAns: userAnswer,
            feedBack: jsonRes,
            rating: jsonRes.rating,
            createdAt: moment().format("MMM Do YY"),
        })
        return res.status(200).json({ dbRes, message: 'User answer saved successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}