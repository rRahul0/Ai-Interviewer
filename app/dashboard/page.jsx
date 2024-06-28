"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import AddInterview from "./_components/AddInterview";
import Interview from "@/model/Interview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/AIModel";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import InterviewList from "./_components/InterviewList";
import { useRouter } from "next/navigation";
import DbConnection from "@/config/DbConfig";

const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const {user} = useUser()
    console.log(user)
    const router = useRouter()
    const [job, setJob] = useState({
        role: '',
        description: '',
        experience: 0
    })
    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(user.user)
        // console.log(job);
        setLoading(true);
        const InputPrompt = `job position : ${job.role}, job description: ${job.description}, year of experience: ${job.experience} depend on this data give ${process.env.NEXT_PUBLIC_NO_OF_QUESTIONS} interview questions with answers in json format, give question answer in file as JSON`

        const result = (await chatSession.sendMessage(InputPrompt))
            .response.text()
            .replace('```json', '')
            .replace('```', '');
        console.log(JSON.parse(result));
        setResponse(result);
        try {
            if (result) {
                await DbConnection();
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
            
                // const res = await db.insert(Interview)
                //     .values({
                //         mockId: uuidv4(),
                //         jsonMockResp: result,
                //         jobPosition: job.role,
                //         jobDescription: job.description,
                //         jobExperience: job.experience,
                //         createdBy: user?.primaryEmailAddress?.emailAddress,
                //         createdAt: moment().format('DD-MM-YYYY'),
                //     }).returning({ mockId: Interview.mockId }).execute();
                // console.log(res);
                if (res) {
                    setDialogOpen(false);
                    router.push(`/dashboard/interview/${res[0].mockId}`);
                }
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    return (
        <div className="p-10">
            <h2 className="font-bold text-2xl">Dashboard</h2>
            <h2 className="text-gray-600">Create and Start Your Mock Interview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 my-5"
                onClick={() => setDialogOpen(true)}
            >
                <AddInterview />
            </div>

            {/* Previous Interview List */}
            <InterviewList />




            <Dialog open={dialogOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Tell Us more about Job you are interviewing</DialogTitle>
                        <DialogDescription>
                            Add details about job position , your skill and year of experience
                        </DialogDescription>
                        <form onSubmit={onSubmit}>
                            <div className="mt-7 my-3 ">
                                <label className="font-semibold"> Job Role / Position </label>
                                <Input placeholder="EX. MERN Stack Developer" required
                                    onChange={(e) => setJob({ ...job, role: e.target.value })}
                                />
                            </div>
                            <div className="my-3">
                                <label className="font-semibold">Job Description / Tech Stack(In Short)</label>
                                <Textarea placeholder="Ex. React, Node, MongoDB" required
                                    onChange={(e) => setJob({ ...job, description: e.target.value })}
                                />
                            </div>
                            <div className=" my-3 ">
                                <label className="font-semibold"> Experience in Year </label>
                                <Input placeholder="5" min='0' max='50' type="number" required
                                    onChange={(e) => setJob({ ...job, experience: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-5 justify-end mt-10">
                                <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
                                <Button type='submit' disabled={loading}>
                                    {loading ?
                                        <>
                                            <LoaderCircle className="animate-spin" />Generating from AI
                                        </> : 'Start Interview'}
                                </Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Dashboard;