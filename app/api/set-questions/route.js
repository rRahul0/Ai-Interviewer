import connectDB from '@/config/DbConfig';
import Interview from '@/model/Interview';

export const GET = async (req, res) => {
    await connectDB();

    try {
        const { interviewId } = await req.json();
        console.log(interviewId)
        const result = await Interview.find({ mockId: interviewId });
        const questions = JSON.parse(result[0].jsonMockResp)
        console.log(questions);
        if (!questions)
            return Response.json(
                { message: 'Error getting Interview details' }, { status: 400 }
            );
        return Response.json(
            { questions, message: "Interview data fetched Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);
        return Response.json(
            { message: 'Internal Server Error' }, { status: 500 }
        );
    }
}