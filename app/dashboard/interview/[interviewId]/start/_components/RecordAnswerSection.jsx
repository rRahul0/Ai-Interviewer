import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/AIModel';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import userAnswer from '@/model/userAnswer';

function RecordAnswerSection({ interviewQuestions, activeQuestion, interviewData }) {
    const { user } = useUser();
    const [userAnswer, setuserAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => (
            setuserAnswer(prevAnswer => prevAnswer + result?.transcript)
        ))
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            updateUserAnswer()
        }
    }, [userAnswer]);

    const StartStopRecording = async () => {
        if (isRecording) stopSpeechToText()
        else startSpeechToText()
    }

    const updateUserAnswer = async () => {
        try {
            setLoading(true)
            const feedbackPrompt = "Question: " + interviewQuestions[activeQuestion]?.question + "Answer: " + userAnswer + " , Dependes on question and use answer give rating for answer out of 10 and feedback as area of improvement if any " + "In just 3 to 5 lines to improve it in json format with rating field and feedback field"

            const result = (await chatSession.sendMessage(feedbackPrompt))
            const res = (result.response.text())
                .replace('```json', '')
                .replace('```', '');
           
            const jsonRes = JSON.parse(res);
            console.log(interviewData)
           
            //api record-answer
            
            if (dbRes) {
                toast('User answer saved successfully')
                setuserAnswer('')
                setResults([])
            }
            setuserAnswer('')
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-start justify-center flex-col ">
            <div className='flex justify-center items-center relative bg-black rounded-lg p-5 '>
                <Image
                    src={'/webcam.png'}
                    width={300}
                    height={300}
                    alt='web cam logo'
                    className={`absolute border rounded-2xl ${isRecording ? "hidden" : ""}`} />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 400,
                        width: 400,
                        zIndex: 10,
                    }}
                />
            </div>
            <div className='flex justify-around gap-5 w-full lg:w-9/12 my-4 '>
                <Button variant="outline" className="my-0  "
                    onClick={StartStopRecording}
                // disabled={loading}
                >
                    {isRecording ?
                        <h2 className='text-red-500 flex gap-2 items-center'><StopCircle />Stop Recording ...</h2>
                        : <h2 className='text-blue-500 flex gap-2 items-center'><Mic />Record Answer</h2>
                    }</Button>
                <Button
                    onClick={() => toast(userAnswer ? userAnswer + "..." : "Please record your answer first")}
                    disable={isRecording || loading}
                >Show Answer</Button>
            </div>

        </div>
    )
}
export default RecordAnswerSection
