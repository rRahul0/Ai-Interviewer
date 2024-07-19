import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/config/DbConfig';
import Interview from '@/model/Interview';
import { v4 as uuidv4 } from 'uuid';

//page.jsx in dashboard 
export const createInterview = async (req, res) => {
    await connectDB();

    try {
        const { result, job, user } = req.body;
        console.log("hello")
        if (result) {
            const res = await Interview.create({
                mockId: uuidv4(),
                jsonMockResp: result,
                jobPosition: job.role,
                jobDescription: job.description,
                jobExperience: job.experience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-YYYY'),
                userId: user.id
            }).select({ mockId });
        console.log("hii")
            console.log(res);
            return res.status(200).json({ res, message: 'Interview Created Successfully' });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}