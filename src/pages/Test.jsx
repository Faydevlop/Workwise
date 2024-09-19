import React, { useState, useRef, useEffect } from "react";

function TestPage() {


  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-background border-b px-4 md:px-6 flex items-center h-14">
    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 mr-4">
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
        className="w-6 h-6 text-muted-foreground"
      >
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
      </svg>
    </button>
    <a className="flex items-center" href="/">
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
        className="w-6 h-6 mr-2"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span className="font-medium text-muted-foreground">Workwise</span>
    </a>
  </header>
    <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 p-4 md:p-6">
      
      <div className="relative rounded-xl overflow-hidden aspect-video">
        <video className="w-full h-full object-cover" autoplay="" loop="">
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute bottom-4 left-4 bg-black/50 rounded-md p-2 flex items-center gap-2">
          <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 border-2 border-white">
            <img className="aspect-square h-full w-full" alt="User" src="https://tailwindui.com/placeholder-user.jpg"  />
          </span>
          <div className="text-white text-sm font-medium">John Doe</div>
        </div>
      </div>
      <div className="bg-muted rounded-xl overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 relative rounded-t-xl overflow-hidden">
            <video className="w-full h-full object-cover" autoplay="" loop="">
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute bottom-4 left-4 bg-black/50 rounded-md p-2 flex items-center gap-2">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 border-2 border-white">
                <img className="aspect-square h-full w-full" alt="User" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <div className="text-white text-sm font-medium">Jane Doe</div>
            </div>
          </div>
          <div className="bg-background  p-4 flex items-center justify-center gap-4">
            <button className="inline-flex hover:bg-gray-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                className="w-6 h-6 text-muted-foreground"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
            </button>
            <button className="inline-flex hover:bg-gray-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                className="w-6 h-6 text-muted-foreground"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </button>
            <button className="inline-flex hover:bg-gray-200 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                className="w-6 h-6 text-red-500"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
}

export default TestPage;
