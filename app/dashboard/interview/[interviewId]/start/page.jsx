"use client"

import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



function StartInterview({ params }) {
    const [interviewData, setInterviewData] = useState([])
    const [interviewQuestions, setInterviewQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        GetInterviewDetails()
    }, [])
    const GetInterviewDetails = async () => {
        try {
            setLoading(true)
            //set question 
            setInterviewQuestions(questions)
            setInterviewData(result[0])
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        loading ? <p className="h-full w-full text-2xl font-bold" >Loading ...</p> :
            <div >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>
                    <QuestionSection
                        interviewQuestions={interviewQuestions}
                        activeQuestion={activeQuestion} />

                    <RecordAnswerSection
                        interviewQuestions={interviewQuestions}
                        activeQuestion={activeQuestion}
                        interviewData={interviewData}
                    />
                </div>
                <div className='flex justify-end gap-6 w-10/12 '>
                    {activeQuestion > 0 &&
                        <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>Previous Question</Button>}
                    {activeQuestion < interviewQuestions?.length - 1 &&
                        <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>Next Question</Button>}
                    {activeQuestion == interviewQuestions?.length - 1 &&
                        <Link href={`/dashboard/interview/${interviewData?.mockId}/FeedBack`}>
                            <Button>End Interview</Button>
                        </Link>
                    }
                </div>
            </div>
    )
}

export default StartInterview
