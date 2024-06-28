import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {
    const router = useRouter()
    const onStart = () => {
        router.push(`/dashboard/interview/${interview?.mockId}`)
    }
    const onFeedback = () => {
        router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
    }
    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
            <h2 className='font-bold text-gray-600'>{interview?.jobExperience}</h2>
            <p className='text-xs text-gray-400'>Created At: {interview.createdAt}</p>

            <div className='flex justify-between mt-2 gap-8 '>
                <Button size="sm" varient="outline" className='bg-blue-900 w-full '
                    onClick={onFeedback}
                >Feedback</Button>
                <Button size="sm" className="w-full"
                    onClick={onStart}
                >Start</Button>
            </div>
        </div>
    )
}

export default InterviewItemCard
