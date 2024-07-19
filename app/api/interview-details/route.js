import connectDB from "@/config/DbConfig";
import Interview from "@/model/Interview";

export const POST = async (req) => {
    await connectDB();

    try {
        const { interviewId } = await req.json();
        console.log(interviewId)
        const result = await Interview.find({ mockId: interviewId });

        if (!result) 
            return Response.json(
                { message: "Error getting Interview details" },
                { status: 400 }
            );
        
        return Response.json(
            { result, message: "Interview data fetched Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
