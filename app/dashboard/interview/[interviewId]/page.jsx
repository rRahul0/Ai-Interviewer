'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { db } from "@/utils/db"
import { Lightbulb, WebcamIcon } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import Webcam from "react-webcam"
import { eq } from 'drizzle-orm'
import Interview  from '@/model/Interview'

function InterviewPage({ params }) {
    const [interviewData, setInterviewData] = useState(null)
    const [webCamEnabled, setWebCamEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        setLoading(true)
        const result = await db.select().from(Interview)
            .where(eq(Interview.mockId, params.interviewId))
            .execute()
        // console.log(result)
        setInterviewData(result[0])
        setLoading(false)
    }

    return (
        <div className="my-10 ">
            <h2 className="font-bold text-2xl">Let`s Get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="flex flex-col my-5 gap-5 ">
                    <div className=" flex flex-col p-5 rounded-lg border gap-5">
                        {loading ? <p className="h-full w-full text-2xl font-bold" >Loading ...</p> :
                            <>
                                <h2 className="text-lg"><strong>Job Role / Position : </strong>{interviewData?.jobPosition}</h2>
                                <h2 className="text-lg"><strong>Job Description / Tech Stack : </strong>{interviewData?.jobDescription}</h2>
                                <h2 className="text-lg"><strong>Experience(In Year) : </strong>{interviewData?.jobExperience}</h2>
                            </>}
                    </div>
                    <div className="p-5 border roundede-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500"><Lightbulb /><strong>Information</strong></h2>
                        <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div>
                    {
                        webCamEnabled ? <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 400,
                                width: 400,
                            }}
                        /> :
                            <>
                                <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border"
                                    onClick={() => setWebCamEnabled(true)}
                                />
                                <button variant='ghost' onClick={() => setWebCamEnabled(true)}>
                                    Enable Web Cam & Microphone</button>
                            </>
                    }

                </div>

            </div>
            <div className="flex justify-end items-end">
                <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                    <Button>Start Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewPage
