"use client"

import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Link } from 'lucide-react'
import { Button } from '@/components/ui/button'


function FeedBack({ params }) {
    // console.log(params.interviewId)
    const [feedBack, setFeedBack] = useState([])
    useEffect(() => {
        getFeedBack()
    }, []);
    const getFeedBack = async () => {
        try{
        const {data} = await axios.get("/api/feedback-interview", {
            interviewId: params.interviewId
        });
        console.log(data)
        setFeedBack(result)
    } catch (err) {
        console.log(err)
    }
    }

    const rating = feedBack.reduce((acc, curr) => acc + parseInt(curr.rating), 0) / feedBack.length || 1
    return (
        <div className='p-10 space-y-10'>
            {feedBack.length === 0 ? <p className='font-bold text-gray-500 text-xl'>No feedback available</p>
                : <>
                    <h2 className='text-2xl font-bold text-green-500 '> Congratulation! </h2>
                    <p className='font-bold text-2xl '>Here is your Interview feedback</p>
                    <p className='text-blue-500 text-lg my-3'>Your overall interview rating: <strong>{rating}/10</strong></p>

                    <p className='text-sm text-gray-500'>Find below Interview question with correct answer, Your answer and feedback for improvement</p>

                    {feedBack.map((feedback, index) => (
                        <Collapsible key={index}>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full '>{feedback.question} <ChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2 '>
                                    <h2 className='text-red-500 border  p-2 rounded-lg'>
                                        <strong>Rating: </strong>{feedback.rating}
                                    </h2>
                                    <p className='p-2 border rounded-lg bg-red-50 text-sm text-red-800'>
                                        <strong>Your Answer: </strong>{feedback.userAns}</p>

                                    <p className='p-2 border rounded-lg bg-green-200 text-sm text-green-800'>
                                        <strong>Correct Answer: </strong>{feedback.correctAns}</p>

                                    <p className='p-2 border rounded-lg bg-blue-200 text-sm text-blue-800'>
                                        <strong>Feedback: </strong>{feedback.feedBack}</p>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>}

            <Link href='/dashboard'>
                <Button className="bg-blue-900">
                    Go Home
                </Button>
            </Link>
        </div>
    )
}

export default FeedBack
