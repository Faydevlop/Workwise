import React, { useState, useRef, useEffect } from "react";

function TestPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

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
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div ref={sidebarRef} className={`bg-white border-r w-full max-w-[300px] md:relative absolute inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="font-medium text-sm">Messenger</div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
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
            />
          </form>
        </div>
        <div className="grid gap-2 px-3">
        <a class="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted" href="#">
        <span class="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
          <img class="aspect-square h-full w-full" alt="Image" src="/placeholder-user.jpg" />
        </span>
        <div class="grid gap-0.5">
          <p class="text-sm font-medium leading-none">Sofia Davis</p>
          <p class="text-xs text-muted-foreground">hey what's going on? · 2h</p>
        </div>
      </a>

          {/* User list items */}
          {/* ... (previous user list items remain unchanged) ... */}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-grow">
        {/* Header with user info */}
        <div className="p-3 flex border-b items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="relative flex shrink-0 overflow-hidden rounded-full border w-10 h-10">
              <img className="object-cover w-full h-full" alt="User" src="https://tailwindui.com/placeholder-user.jpg" />
            </span>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-xs text-gray-500">Active 2h ago</p>
            </div>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-gray-200 rounded-full w-8 h-8">
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

        {/* Messages and input area */}
        <div className="flex-1 overflow-y-auto p-3">
          {/* Chat messages */}
          <div className="flex flex-col gap-4">
            {/* Message example */}
            <div className="flex items-start space-x-2">
              <div className="relative flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                <img src="https://tailwindui.com/placeholder-user.jpg" alt="User" className="object-cover w-full h-full" />
              </div>
              <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                <p className="text-sm">Hello, how are you?</p>
              </div>
            </div>
            {/* Add more messages as needed */}
          </div>
        </div>
        <div className="border-t p-3">
          <form className="flex items-center space-x-2">
            <input
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              placeholder="Type a message"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18l18-9L3 3z" />
              </svg>
              <span className="sr-only">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TestPage;
