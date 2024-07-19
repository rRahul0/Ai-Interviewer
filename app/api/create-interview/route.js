import connectDB from "@/config/DbConfig";
import Interview from "@/model/Interview";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


export const POST = async (req) => {
  await connectDB();

  try {
    const { result, job, user } = await req.json();
    if (result) {
      const mockId = uuidv4();
      const res = await Interview.create({
        mockId,
        jsonMockResp: result,
        jobPosition: job.role,
        jobDescription: job.description,
        jobExperience: job.experience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
        userId: user.id,
      });

      if (!res) 
        return Response.json(
          { message: "Error Creating Interview" },
          { status: 400 }
        );
      
      return Response.json(
        { mockId, message: "Interview Created Successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
