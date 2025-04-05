// src/pages/VideoCallPage.jsx
import {  ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../config/axiosConfig';




const VideoCallPage = () => {

  const {roomId} = useParams()
  const {userId} = useParams()
  const [user,setUser] = useState({})

  const fetchData = async()=>{
    try {
      const response = await axiosInstance.get(`/employee/userdata/${userId}`)
      setUser(response.data.userdata)
      console.log(response.data.userdata);
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchData()
  }, [userId, user])

  const myMeeting = async(element)=>{
    if (!user.firstName || !user.lastName) {
      
      return;
    }
    const appID = 276969115;
    const serverSecret = "e53f30a0a0f8dcc60a1327f48a669fe2";
    const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),`${user.firstName}${user.lastName}`)
    const zc = ZegoUIKitPrebuilt.create(kittoken)
    zc.joinRoom({
      container:element,
      scenario:{
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton:false,
      sharedLinks:[
       {
        name:'Copy Link',
        url:`http://localhost:3000/chat/video-call.${roomId}`
       }
      ]
    })

  }

 

  return (
   <>
   <div ref={myMeeting} />
   </>

  );
};

export default VideoCallPage;
