import connectDB from '@/config/DbConfig';
import userAnswer from '@/model/userAnswer';
// feedback interview

export const GET = async (req) => {
    await connectDB();

    try {
        const { interviewId } = await req.json();
        const result = await userAnswer.find({
            mockIdRef: interviewId
        }).sort({ createdAt: -1 });

        if (!result)
            return Response.json({ message: 'Error getting Interview details' }, { status: 400 });
        return Response.json({ result, message: 'Interview data fetched Successfully' }, { status: 200 });

    } catch (error) {
        console.log(error);
        return Response.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}