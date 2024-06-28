"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import InterviewItemCard from './InterviewItemCard';
import DbConnection from '@/config/DbConfig';
import Interview from '@/model/Interview';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([])
  useEffect(() => {
    user && getInterviewList()
  }, [user, interviewList]);
  const getInterviewList = async () => {
    try {
      await DbConnection();
      // const result = await db.select().from(Interview)
      //   .where(eq(Interview.createdBy, user?.primaryEmailAddress?.emailAddress))
      //   .orderBy(desc(Interview.id))
      const result = await Interview.find({
        createdBy: user?.primaryEmailAddress?.emailAddress
      }).sort({ createdAt: -1 })
      setInterviewList(result)
    } catch (err) {
      console.log(err)
    }
  }
  if (interviewList.length) return (
    <div>
      <h2 className='font-medium text-xl '>Previous Mock Interviews</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  )
  else return null
}

export default InterviewList
