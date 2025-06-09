import React, { useState, useRef, useEffect, useMemo } from "react";
import ManagerSidebar from "../../components/Sidebar/ManagerSidebar";

import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

const ManagerChat = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_BASE_URL), []);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [incomingCall, setIncomingCall] = useState(null); // Keep this if you plan to use it for incoming call UI notifications
  // New state for typing indicator
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState({}); // Stores {userId: true/false} for typing status

  const { manager } = useSelector((state) => state.managerAuth);
  const sender = manager?.manager?._id;

  // Ref to keep track of the typing timeout
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.emit("register", manager.manager._id); // Register the manager's user ID with the socket
  }, [manager.manager._id]);

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

    // --- TYPING INDICATOR LISTENERS ---
    socket.on('typing', ({ senderId }) => {
      setTypingUsers((prev) => ({ ...prev, [senderId]: true }));
    });

    socket.on('stopped-typing', ({ senderId }) => {
      setTypingUsers((prev) => ({ ...prev, [senderId]: false }));
    });
    // --- END TYPING INDICATOR LISTENERS ---


    return () => {
      socket.off('update-last-message');
      socket.off('typing'); // Cleanup typing listener
      socket.off('stopped-typing'); // Cleanup stopped-typing listener
    };
  }, [socket]); // Added socket to dependency array to ensure listeners are correctly re-attached if socket changes

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/admin/getusers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
        console.error("Error fetching users:", error);
      } finally {
        // setLoading(false)
      }
    };

    fetchUser();
  }, [sender]); // Added sender to dependency array

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
  }, [socket, navigate]); // Added socket and navigate to dependency array


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


  useEffect(() => {
    if (currentUser) {
      socket.emit('message-seen', {
        senderId: currentUser._id,   // The user who sent the messages
        receiverId: sender,         // The logged-in user (receiver of messages)
      });
    }
  }, [messages, currentUser, sender, socket]); // Added sender and socket to dependency array

  useEffect(() => {
  socket.on('messages-seen', ({ senderId: messageOriginalSenderId, receiverId: messageSeenByUserId }) => {

    if (currentUser && messageOriginalSenderId === sender && messageSeenByUserId === currentUser._id) {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
       
          msg.sender === sender && msg.receiver === currentUser._id && msg.messageStatus !== 'seen'
            ? { ...msg, messageStatus: 'seen' }
            : msg
        )
      );
    }
  });

  return () => {
    socket.off('messages-seen');
  };
}, [currentUser, sender, socket]); // Ensure all dependencies are included // Added currentUser, sender, socket to dependency array


  useEffect(() => {
    socket.on("message", (data) => {
      // Update messages if the message is for the currently selected user
      if (currentUser && (data.sender === currentUser._id || data.receiver === currentUser._id)) {
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
  }, [currentUser, sender, socket]); // Added currentUser, sender, socket to dependency array


  useEffect(() => {
    if (currentUser) {
      const fetchMessages = async () => {
        try {
          setMessages([]);
          const response = await axiosInstance.get(
            `/chat/messages/${sender}/${
            currentUser._id
            }`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [currentUser, sender]); // Added sender to dependency array


  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() && currentUser) {
      const message = {
        sender,
        receiver: currentUser._id,
        content: newMessage,
        messageStatus: "delivered"
      };

      socket.emit("message", message);
      setNewMessage("");
      // Immediately stop typing after sending a message
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
      socket.emit('stopped-typing', { senderId: sender, receiverId: currentUser._id });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewMessage(value);

    // Typing indicator logic
    if (currentUser) {
      if (!isTyping && value.length > 0) {
        setIsTyping(true);
        socket.emit('typing', { senderId: sender, receiverId: currentUser._id });
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        socket.emit('stopped-typing', { senderId: sender, receiverId: currentUser._id });
      }, 3000); // Send 'stopped-typing' after 3 seconds of no typing
    }
  };

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

      // Clear typing indicator for the newly selected user
      setTypingUsers((prev) => ({ ...prev, [userId]: false }));

      // Emit 'stopped-typing' for the sender if they were typing to the previous user
      if (isTyping && currentUser) {
        socket.emit('stopped-typing', { senderId: sender, receiverId: currentUser._id });
        setIsTyping(false);
      }
      // Clear any pending typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div className="hidden lg:block" style={{ width: "250px" }}>
        <ManagerSidebar />
      </div>
      <div className="lg:hidden">
        <ManagerSidebar />
      </div>

      <div style={{ flex: 1, padding: "", overflow: "auto", marginLeft: "0" }}>
        <div className="flex h-screen w-screeny overflow-hidden">
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className={`bg-white border-r w-full max-w-[300px] md:relative absolute inset-y-0 left-0 transform ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition duration-200 ease-in-out z-30`}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-medium text-sm">Messenger</div>
              <div className="flex items-center space-x-2"></div>
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

          {currentUser !== null ? (
            <>
              {/* Main chat area */}
              <div className="flex flex-col flex-grow">
                {/* Header with user info */}
                <div className="p-3 flex border-b items-center">
                  <div className="flex items-center gap-2">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
                      <img
                        className="object-cover w-full h-full"
                        alt="User"
                        src={
                          currentUser.profileImageUrl
                            ? currentUser.profileImageUrl
                            : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                        }
                      />
                    </span>
                    <div className="grid gap-0.5">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.firstName}
                        {currentUser.lastName}
                      </p>
                      {/* Typing indicator display for the current chat user */}
                      {typingUsers[currentUser._id] && (
                        <p className="text-xs text-gray-500">Typing...</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      onClick={toggleSidebar}
                      className="md:hidden mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleVideoCall}
                      className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                      </svg>
                      <span className="sr-only">Video Call</span>
                    </button>
                    <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="sr-only">Audio Call</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg, index) => {
                      const messageDate = new Date(msg.timestamp);
                      const isValidDate = !isNaN(messageDate.getTime());

                      const now = new Date();

                      const displayTime = isValidDate
                        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                      return (
                        <div
                          className={`flex items-start ${
                            msg.sender === sender
                              ? "justify-end"
                              : "justify-start"
                          } space-x-2`}
                          key={index}
                        >
                          {msg.sender !== sender && (
                            <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={
                                  currentUser.profileImageUrl
                                    ? currentUser.profileImageUrl
                                    : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                                }
                                alt="User"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div
                            className={`p-2 rounded-lg max-w-xs ${
                              msg.sender === sender
                                ? "bg-gray-100"
                                : "bg-blue-100"
                            }`}
                          >
                            <p className="font-bold">{msg.content}</p>
                             {msg.sender === sender && msg.messageStatus && (
  <span className={`text-xs ml-1 ${msg.messageStatus === 'seen' ? 'text-green-500' : 'text-gray-500'}`}>
    {msg.messageStatus === 'seen' ? 'Seen' : 'Delivered'}
  </span>
)}  
                            <p className="text-xs ">{displayTime}</p>
                          </div>
                          {msg.sender === sender && (
                            <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                              <img
                                src={
                                  manager.manager.profileImageUrl // Use manager's own profile image
                                    ? manager.manager.profileImageUrl
                                    : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                                }
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
                  <form
                    className="flex items-center space-x-2"
                    onSubmit={sendMessage}
                  >
                    <input
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      placeholder="Type a message"
                      value={newMessage}
                      onChange={handleChange}
                    />

                    <button
                      type="submit"
                      className="inline-flex bg-black items-center justify-center p-2 text-gray-400 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                      <svg
                        className="h-5 text-white w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3v18l18-9L3 3z"
                        />
                      </svg>
                      <span className="sr-only">Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center h-full">
              <p className="text-gray-500 text-lg">Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerChat;