import React, { useState, useRef, useEffect, useMemo } from "react";
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'

import api from "../../features/auth/axiosInstance";
import io from 'socket.io-client';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";


const EmployeeChat = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_BASE_URL), []);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [users,setUsers] = useState([])
  const [currentUser,setCurrentUser] = useState(null)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  // --- NEW STATE FOR TYPING INDICATOR ---
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null); // Ref to store the typing timeout

  const { employee } = useSelector((state) => state.employeeAuth);
  console.log(employee.user);
  const sender = employee.user._id
  console.log('profile URL is here',employee.user.profileImageUrl);

  useEffect(() => {
    socket.emit('register', employee.user._id);
  }, [employee.user._id]);

  // Assuming you already have a socket instance

  useEffect(() => {
    // Listen for last message updates
    socket.on('update-last-message', (lastMessage) => {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user._id === lastMessage.sender || user._id === lastMessage.receiver) {
            return {
              ...user,
              lastMessage: lastMessage.content,
              lastMessageTime: lastMessage.timestamp,
            };
          }
          return user;
        });
  
        // Sort users based on lastMessageTime (most recent message at the top)
        return updatedUsers.sort((a, b) => {
          if (!a.lastMessageTime) return 1; // Users without lastMessageTime should be at the bottom
          if (!b.lastMessageTime) return -1;
          return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
        });
      });
    });
  
    return () => {
      socket.off('update-last-message');
    };
  }, []);
  

  
 

  useEffect(()=>{
    const fetchUser = async () =>{
        try {
            const response = await axiosInstance.get(`/admin/getusers`,{
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`,
              }
            });
            const allUsers = response.data.allUsers;

      // Set the filtered users list (excluding the current sender)
      const filteredUsers = allUsers.filter((user) => user._id !== sender);
      setUsers(filteredUsers);

      // If there are users, select a random user as the initial chat user
      if (filteredUsers.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredUsers.length);
        setCurrentUser(filteredUsers[randomIndex]);
      }
            
            

        } catch (error) {
            //
        }finally{
            // setLoading(false)
        }
    }

    fetchUser();
},[])



useEffect(() => {
  if (currentUser) {
    const fetchMessages = async () => {
      try {
        // Clear messages when changing user
        setMessages([]);
        const response = await axiosInstance.get(`/chat/messages/${sender}/${currentUser._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }
}, [currentUser]);


const sendMessage = (event) => {
  event.preventDefault();
  if (newMessage.trim() && currentUser) {
    const message = {
      sender,
      receiver: currentUser._id,
      content: newMessage,
       messageStatus:"delivered"
    };

    socket.emit('message', message);
    setNewMessage('');

    // Immediately clear typing indicator for self after sending message
    clearTimeout(typingTimeoutRef.current);
    socket.emit('stopped-typing', { senderId: sender, receiverId: currentUser._id });
  }
};

useEffect(() => {
  if (currentUser) {
    socket.emit('message-seen', {
      senderId: currentUser._id,  // The user who sent the messages
      receiverId: sender,         // The logged-in user (receiver of messages)
    });
  }
}, [messages,currentUser]);

useEffect(() => {
  // Listen for the 'messages-seen' event and update the local message state
  socket.on('messages-seen', ({ senderId }) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.sender === senderId ? { ...msg, messageStatus: 'seen' } : msg
      )
    );
  });

  // --- NEW SOCKET LISTENERS FOR TYPING INDICATOR ---
  socket.on('typing', ({ senderId }) => {
    if (currentUser && senderId === currentUser._id) {
      setIsTyping(true);
    }
  });

  socket.on('stopped-typing', ({ senderId }) => {
    if (currentUser && senderId === currentUser._id) {
      setIsTyping(false);
    }
  });
  // --- END NEW SOCKET LISTENERS ---


  return () => {
    socket.off('messages-seen');
    // --- CLEANUP TYPING LISTENERS ---
    socket.off('typing');
    socket.off('stopped-typing');
    // --- END CLEANUP ---
  };
}, [currentUser]);



useEffect(() => {
  socket.on("video-call-initiate", ({ senderId, roomId }) => {
    console.log(`Received video call notification from ${senderId}`);
    // Notify the user about the incoming video call
    if (
      window.confirm(
        `You have an incoming video call from ${senderId}. Would you like to join?`
      )
    ) {
      // If the user agrees, navigate them to the video call page
      navigate(`/chat/video-call/${roomId}/${senderId}`);
    }
  });

  return () => {
    socket.off("video-call-initiate");
  };
}, []);

const generateRoomId = () => {
  // Generate a random string of length 12
  return Math.random().toString(36).substring(2, 14);
};


  // Handle video call button click
  const handleVideoCall = async () => {
    const roomId = generateRoomId(); // Unique room ID for the video call
    
    try {
      await socket.emit('initiate-video-call', {
        senderId: sender,
        receiverId: currentUser._id,
        roomId,
      });
  
      navigate(`/chat/video-call/${roomId}/${sender}`);
    } catch (error) {
      console.error("Failed to initiate video call:", error);
    }
  };
  

const handleChange = (event) => {
  setNewMessage(event.target.value);

  // --- TYPING INDICATOR LOGIC (FRONTEND) ---
  if (currentUser) {
    // Emit 'typing' event
    socket.emit('typing', { senderId: sender, receiverId: currentUser._id });

    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to emit 'stopped-typing' after a delay (e.g., 2 seconds)
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stopped-typing', { senderId: sender, receiverId: currentUser._id });
    }, 2000); // Adjust delay as needed (e.g., 2000ms = 2 seconds)
  }
  // --- END TYPING INDICATOR LOGIC ---
};

// new code 1
useEffect(() => {
  socket.on("message", (data) => {
    // Update messages if the message is for the currently selected user
    if (data.sender === currentUser._id || data.receiver === currentUser._id) {
      setMessages((prevMessages) => [...prevMessages, data]);
    }

    // Update the user list to mark the user with a new message
     setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === data.sender && user._id !== sender // Mark only the sender in the user list as having a new message
          ? { ...user, hasNewMessage: true }
          : user
      )
    );
  });

  return () => {
    socket.off("message");
  };
}, [currentUser]);

// new code 2
const selectedUser = async (userId) => {
  const user = users.find((user) => user._id === userId);

  if (user) {
    setCurrentUser(user);

    // Mark this user as having no new messages
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u._id === userId ? { ...u, hasNewMessage: false } : u
      )
    );

    // Fetch messages and mark as seen
    try {
      await axiosInstance.post(`/chat/mark-as-seen`, {
        senderId: userId,
        receiverId: sender,
      });
    } catch (error) {
      console.error('Failed to mark messages as seen:', error);
    }
  }
};



  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
      </div>

        <div style={{ flex: 1, padding: '', overflow: 'auto', marginLeft: '0' }}>
        <div className="flex h-screen w-screeny overflow-hidden">
      {/* Sidebar */}
      <div ref={sidebarRef} className={`bg-white border-r w-full max-w-[300px] md:relative absolute inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-medium text-sm">Messenger</div>
          <div className="flex items-center space-x-2">
            <button  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span className="sr-only">Video Call</span>
            </button>
            <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="sr-only">Audio Call</span>
            </button>
          </div>
        </div>
        <div className="py-4 px-3">
          <form>
            <input
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </form>
        </div>
        {users
  .filter((user) => user._id !== sender) // Exclude the current sender/manager from the list
  .filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) // Filter users based on search input
  )
  .map((user) => (
    <div key={user._id} onClickCapture={() => selectedUser(user._id)} className="grid gap-2 px-3">
      <a className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted">
        <span className="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
          <img
            className="aspect-square h-full w-full"
            alt="Image"
            src={
              user.profileImageUrl ||
              'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'
            }
          />
        </span>
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">
            {user.firstName} {user.lastName}
          </p>
          <div className="flex justify-between items-center">
    {/* Display the last message */}
    <p className="text-xs text-muted-foreground flex-1">
      {user.lastMessage ? user.lastMessage : 'No New messages'}
    </p>
    
    {/* Display the time of the last message aligned to the right */}
    <p className="text-xs text-muted-foreground whitespace-nowrap">
      {user.lastMessageTime && new Date(user.lastMessageTime).toLocaleTimeString()}
    </p>
  </div>
        </div>
        {user.hasNewMessage && (
        <span className="text-xs font-semibold justify-start text-red-500">⦿ New Message</span>
      )}
      </a>
    </div>
  ))}



       

      </div>

      {
        currentUser !== null ? (
          <>{/* Main chat area */}
          <div className="flex flex-col flex-grow">
            {/* Header with user info */}
            <div className="p-3 flex border-b items-center">
              
              <div className="flex items-center gap-2">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
                  <img className="object-cover w-full h-full" alt="User" src={currentUser.profileImageUrl ? currentUser.profileImageUrl : 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg' } />
                </span>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">{currentUser.firstName}{currentUser.lastName}</p>
                  {/* --- TYPING INDICATOR DISPLAY --- */}
                      {isTyping && <p className="text-xs text-gray-500">Typing...</p>}
                      {/* --- END TYPING INDICATOR DISPLAY --- */}
                </div>
              </div>
              <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={toggleSidebar}
                className="md:hidden mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
                <button onClick={handleVideoCall} className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                  </svg>
                  <span className="sr-only">Video Call</span>
                </button>
                <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="sr-only">Audio Call</span>
                </button>
              </div>
            </div>
    
      

<div className="flex-1 overflow-y-auto p-3">
  <div className="flex flex-col gap-4">
    {messages.map((msg, index) => {
      // >>>>>>> START OF CHANGE <<<<<<<
      const messageDate = new Date(msg.timestamp);
      // Check if the date is invalid (e.g., msg.timestamp was null, undefined, or malformed)
      const isValidDate = !isNaN(messageDate.getTime());

      // Determine the time to display
      const displayTime = isValidDate
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'Just now'; // Or 'N/A', 'Unknown Time' as a fixed fallback
      // >>>>>>> END OF CHANGE <<<<<<<

      return (
        <div
          className={`flex items-start ${
            msg.sender === sender ? 'justify-end' : 'justify-start'
          } space-x-2`}
          key={index}
        >
          {msg.sender !== sender && (
            <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <img
                src={currentUser.profileImageUrl ? currentUser.profileImageUrl : 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === sender ? 'bg-gray-100' : 'bg-blue-100'
            }`}
          >
            <p className="font-bold">{msg.content}</p>
           {msg.sender === sender && msg.messageStatus && (
  <span className={`text-xs ml-1 ${msg.messageStatus === 'seen' ? 'text-green-500' : 'text-gray-500'}`}>
    {msg.messageStatus === 'seen' ? 'Seen' : 'Delivered'}
  </span>
)}  
            {/* >>>>>>> UPDATE THIS LINE <<<<<<< */}
            <p className="text-xs ">{displayTime}</p>
          </div>
          {msg.sender === sender && (
            <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
              <img
                src={ employee.user.profileImageUrl ? employee.user.profileImageUrl : 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg' }
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>


    
            <div className="border-t p-3">
              <form className="flex items-center space-x-2" onSubmit={sendMessage}>
              <input
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={handleChange}
                  />


    
                <button
                  type="submit"
                  className="inline-flex bg-black items-center justify-center p-2 text-gray-400 hover:bg-gray-200 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                >
                  <svg className="h-5 text-white w-5" xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18l18-9L3 3z" />
                  </svg>
                  <span className="sr-only">Send</span>
                </button>
              </form>
            </div>
          </div></>
        ) : ( <div className="flex flex-col flex-grow">
          {/* Header with user info */}
          <div className="p-3 flex border-b items-center">
            
            <div className="flex items-center gap-2">
             
              <div className="grid p-2 gap-0.5">
                <p className="text-sm font-medium leading-none"></p>
                {/* <p className="text-xs text-gray-500">Active 2h ago</p> */}
              </div>
            </div>
            <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={toggleSidebar}
              className="md:hidden mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
              
            </div>
          </div>
  
       
        </div>)
        
      }

    </div>
                 
         
        </div>
        
    
    </div>
   
  )
}

export default EmployeeChat;