import connectDB from '@/config/DbConfig';
import userAnswer from '@/model/userAnswer'

//start component record answer

export const recordsAnswers = async (req, res) => {
    await connectDB();

    try {
        const { interviewData, activeQuestion, userAns, interviewQuestions, jsonRes, createdAt} = await req.json();
        const dbRes = await userAnswer.create({
            mockIdRef: interviewData?.mockId,
            question: interviewQuestions[activeQuestion]?.question,
            correctAns: interviewQuestions[activeQuestion]?.answer,
            userAns,
            feedBack: jsonRes,
            rating: jsonRes.rating,
            createdAt,
        })
        if (!dbRes)
            return Response.status(400).json({ message: 'Error getting Interview details' });
        return Response.status(200).json({ dbRes, message: 'User answer saved successfully' });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}