import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/config/DbConfig';
import { Interview } from '@/model/Interview';

export const listInterview = async (req, res) => {
    try {
        await connectDB();
        const result = await Interview.find({
            createdBy: user?.primaryEmailAddress?.emailAddress
        }).sort({ createdAt: -1 })

        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}