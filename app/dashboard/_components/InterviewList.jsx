"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import InterviewItemCard from './InterviewItemCard';
import DbConnection from '@/config/DbConfig';
import Interview from '@/model/Interview';
import axios from 'axios';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([])
  useEffect(() => {
    user && getInterviewList()
  }, [user, interviewList]);
  const getInterviewList = async () => {
    try {
      
      //user?.primaryEmailAddress?.emailAddress
      const {data} = await axios.post("/api/list-interview", {
        emailAddress: user?.primaryEmailAddress?.emailAddress
      });
      setInterviewList(data.result)
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
