import React, { useState, useRef, useEffect, useMemo } from "react";
import ManagerSidebar from "../../components/Sidebar/ManagerSidebar";
import axios from "axios";
import api from "../../features/auth/axiosInstance";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManagerChat = () => {
  const socket = useMemo(() => io("http://localhost:4000/"), []);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { manager } = useSelector((state) => state.managerAuth);
  const sender = manager.manager._id;

  useEffect(() => {
    socket.emit("register", manager.manager._id); // Register the manager's user ID with the socket
  }, [manager.manager._id]);

  const roomId = "12121212";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/admin/getusers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data.allUsers);
        console.log(response.data.allUsers);
      } catch (error) {
        //
      } finally {
        // setLoading(false)
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const checkForVideoCallNotification = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/notifications/${
            manager.manager._id
          }`
        );
        const notifications = response.data;

        const videoCallNotification = notifications.find(
          (notif) => notif.type === "video-call"
        );
        if (videoCallNotification) {
          if (
            window.confirm(
              "You have an incoming video call. Would you like to join?"
            )
          ) {
            navigate(`/chat/video-call/${videoCallNotification.roomId}`);
          }
        }
      } catch (error) {
        console.error("Failed to check for video call notifications:", error);
      }
    };

    // Poll every 10 seconds
    const intervalId = setInterval(checkForVideoCallNotification, 3000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const generateRoomId = () => {
    // Generate a random string of length 12
    return Math.random().toString(36).substring(2, 14);
  };

  // Handle video call button click
  const handleVideoCall = async () => {
    const roomId = generateRoomId(); // Unique room ID for the video call
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/notifications`, {
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
        senderId: currentUser._id,  // The user who sent the messages
        receiverId: sender,         // The logged-in user (receiver of messages)
      });
    }
  }, [currentUser]);

  useEffect(() => {
    // Listen for the 'messages-seen' event and update the local message state
    socket.on('messages-seen', ({ senderId }) => {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.sender === senderId ? { ...msg, seen: true } : msg
        )
      );
    });
  
    return () => {
      socket.off('messages-seen');
    };
  }, []);

  useEffect(() => {
    // Listen for incoming video call notifications
    socket.on("video-call-initiate", ({ senderId, roomId }) => {
      // Notify the user about the incoming video call
      if (
        window.confirm(
          "You have an incoming video call. Would you like to join?"
        )
      ) {
        // If the user agrees, navigate them to the video call page
        navigate(`/chat/video-call/${roomId}/${sender}`);
      }
    });

    return () => {
      socket.off("video-call-initiate");
    };
  }, [navigate]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Message recived", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchMessages = async () => {
        console.log(currentUser, sender);

        try {
          setMessages([]);
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/chat/messages/${sender}/${
              currentUser._id
            }`
          );
          console.log(response.data); // Ensure the correct data is fetched
          setMessages(response.data);
          console.log(response.data, "old messages are here");
        } catch (error) {
          console.error("Failed to fetch messages:", error);
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
      };

      socket.emit("message", message);
      setNewMessage("");
    }
  };

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  const selectedUser = async (userId) => {
    const user = users.find((user) => user._id === userId);

    // Set the found user as the currentUser, or null if not found
    if (user) {
      setCurrentUser(user);
      console.log("Selected User:", user);

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/chat/mark-as-seen`, {
          senderId: userId,
          receiverId: sender,
        });
  
        // Update message list to mark them as seen locally
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.sender === userId ? { ...msg, seen: true } : msg
          )
        );
      } catch (error) {
        console.error('Failed to mark messages as seen:', error);
      }
    } else {
      console.log(`User with ID ${userId} not found`);
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
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
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
                />
              </form>
            </div>
            {
  users
  .filter((user) => user._id !== sender)
  .map((user) => {
    const hasUnreadMessages = messages.some(msg => msg.sender === user._id && !msg.seen);
    
    return (
      <div onClickCapture={() => selectedUser(user._id)} className="grid gap-2 px-3">
        <a className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted">
          <span className="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
            <img className="aspect-square h-full w-full" alt="Image" src={user.profileImageUrl ? user.profileImageUrl : 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'} />
          </span>
          <div className="grid gap-0.5">
            <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-muted-foreground">{user.position}</p>
          </div>
          {hasUnreadMessages && <span className="text-red-500">● New Message</span>}
        </a>
      </div>
    );
  })
}

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
                      {/* <p className="text-xs text-gray-500">Active 2h ago</p> */}
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
                    {messages.map((msg, index) => (
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
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        {msg.sender === sender && (
                          <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                            <img
                              src={
                                sender.profileImageUrl
                                  ? currentUser.sender
                                  : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                              }
                              alt="User"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    ))}
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
            <div className="flex flex-col flex-grow">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerChat;
