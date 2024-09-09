import React, { useState } from "react";




function TestPage() {
  
  return (
   <>
   <div className="w-full min-h-screen bg-background text-foreground">
  <header className="flex items-center justify-between px-6 py-4 border-b">
    <h1 className="text-2xl font-bold">All Projects</h1>
    <div className="flex items-center gap-4">
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
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
          className="w-4 h-4 mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        New Project
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
          className="w-5 h-5"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    </div>
  </header>
  
  <div className="container mx-auto py-8 px-6">
  <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border bg-card text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Total Projects</h3>
            <div className="text-2xl font-bold">12</div>
          </div>
          <p className="text-sm text-muted-foreground">The tot</p>
        </div>
        <div className="border bg-card text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Compl</h3>
            <div className="text-2xl font-bold">8</div>
          </div>
          <p className="text-sm text-muted-foreground">The nu</p>
        </div>
        <div className="border bg-card text-card-foreground shadow-lg rounded-xl p-6" data-v0-t="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">In Progress</h3>
            <div className="text-2xl font-bold">4</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="border bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden" data-v0-t="card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Project Alpha</h2>
            <div
              className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              data-v0-t="badge"
            >
              Completed
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            A comprehensive web application for managing customer data and generating reports.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6">
                <img className="aspect-square h-full w-full" alt="User 1" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6">
                <img className="aspect-square h-full w-full" alt="User 2" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6">
                <img className="aspect-square h-full w-full" alt="User 3" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
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
                className="w-4 h-4 mr-1 inline-block"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="M8 14h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 18h.01"></path>
                <path d="M12 18h.01"></path>
                <path d="M16 18h.01"></path>
              </svg>
              2 months ago
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
   
  </div>
</div></>
  );
}

export default TestPage;
