import connectDB from '@/config/DbConfig';
import Interview from '@/model/Interview';

export const listInterview = async (req) => {
    try {
        await connectDB();
        const { emailAddress } = await req.json();
        const result = await Interview.find({
            createdBy: emailAddress
        }).sort({ createdAt: -1 })
        if (!result)
            return Response.json({ message: 'Error getting Interview details' }, { status: 400 });
        return Response.json({ result, message: 'Interview data fetched Successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}