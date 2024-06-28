import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

function QuestionSection({ interviewQuestions, activeQuestion }) {
    // const textToSpeach = (text) => {
    //     const synth = window.speechSynthesis;
    //     const utterThis = new SpeechSynthesisUtterance(text);
    //     synth.speak(utterThis);
    // }
    const textToSpeach = (text) => {
        if ('speechSynthesis' in window) {
            const speach = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speach);
        } else {
            <Alert variant="destructive">
                {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
                <AlertTitle>Sorry</AlertTitle>
                <AlertDescription>
                    Your browser not support text to speech
                </AlertDescription>
            </Alert>
        }
    }
    return (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
                {interviewQuestions && interviewQuestions.map((question, index) => (
                    <div key={index} className=' gap-5'>
                        <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestion == index ? "bg-blue-600 text-white":"bg-secondary"}
            `}>Question #{index + 1}</h2>

                    </div>
                ))}
            </div>
            <h2 className='my-5 text-md md:text-lg'>{interviewQuestions[activeQuestion]?.question}</h2>
            <Volume2 onClick={() => { textToSpeach(interviewQuestions[activeQuestion]?.question) }} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-800'>
                    <Lightbulb size={100}/><strong>Note: </strong>
                    {process.env.NEXT_PUBLIC_INFORMATION}
                </h2>
                <h2 className='text-sm text-primary my-2'></h2>
            </div>
        </div >
    )
}

export default QuestionSection
