// src/pages/VideoCallPage.jsx
import {  ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';




const VideoCallPage = () => {

  const {roomId} = useParams()

  const myMeeting = async(element)=>{
    const appID = 276969115;
    const serverSecret = "e53f30a0a0f8dcc60a1327f48a669fe2";
    const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),' Username')
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
