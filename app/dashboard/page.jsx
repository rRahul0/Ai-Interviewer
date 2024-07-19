"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import AddInterview from "./_components/AddInterview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/AIModel";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import InterviewList from "./_components/InterviewList";
import { useRouter } from "next/navigation";
import { apiConnector } from "@/config/apiConnector";

const Dashboard = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const { user } = useUser()
    // console.log(user)
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
        const InputPrompt = `job position : ${job.role}, job description: ${job.description}, year of experience: ${job.experience} depend on this data give ${process.env.NEXT_PUBLIC_NO_OF_QUESTIONS} interview questions with answers in json format, give us question answer in file as JSON only question answer array nothing else we need.`

        const result = (await chatSession.sendMessage(InputPrompt))
            .response.text()
            .replace('```json', '')
            .replace('```', '');
// console.log(result);
        console.log(JSON.parse(result));

        setResponse(result);
        const response = await apiConnector('/api/create-interview','POST', {
            result,
            job,
            user
        })
        console.log(response)
        if (response) {
            console.log(response);
            setDialogOpen(false);
            router.push(`/dashboard/interview/${response[0].mockId}`);
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