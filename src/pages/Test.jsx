import React, { useState, useRef, useEffect } from "react";

function TestPage() {


  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-card rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Implement new login flow</h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground text-sm font-medium">High</span>
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-sm font-medium">Bug</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Due Date</p>
            <p className="text-base font-medium">2023-06-30</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Assigned To</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt="@username" src="https://tailwindui.com/placeholder-user.jpg"  />
              </span>
              <p className="text-base font-medium">John Doe</p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Status</p>
            <p className="text-base font-medium">In Progress</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Priority</p>
            <p className="text-base font-medium">High</p>
          </div>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Attachments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center">
              <img
                alt="Attachment"
                width="100"
                height="100"
                className="mb-2"
                src="https://tailwindui.com/placeholder.svg"
                style={{aspectRatio: "100 / 100", objectFit: "cover"}}
               />
              <p className="text-sm font-medium">design.sketch</p>
              <div className="flex items-center gap-2 mt-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center">
              <img
                alt="Attachment"
                width="100"
                height="100"
                className="mb-2"
                src="https://tailwindui.com/placeholder.svg"
                style={{aspectRatio: "100 / 100", objectFit: "cover"}}
               />
              <p className="text-sm font-medium">requirements.pdf</p>
              <div className="flex items-center gap-2 mt-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center">
              <img
                alt="Attachment"
                width="100"
                height="100"
                className="mb-2"
                src="https://tailwindui.com/placeholder.svg"
                style={{aspectRatio: "100 / 100", objectFit: "cover"}}
               />
              <p className="text-sm font-medium">wireframes.fig</p>
              <div className="flex items-center gap-2 mt-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
                    className="h-4 w-4"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
        <div>
          <h2 className="text-xl font-bold mb-4">Task History</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
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
                  className="h-4 w-4 text-muted-foreground"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Task created by John Doe on 2023-05-15</p>
                <p className="text-muted-foreground text-sm">Initial task setup and requirements gathering.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
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
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Task updated by Jane Smith on 2023-05-20</p>
                <p className="text-muted-foreground text-sm">Adjusted priority to High and assigned to John Doe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
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
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Attachment added by John Doe on 2023-05-25</p>
                <p className="text-muted-foreground text-sm">Uploaded design.sketch file.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Task Details</h2>
        <div className="space-y-4">
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="task-name"
            >
              Task Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              id="task-name"
              value="Implement new login flow"
             />
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="due-date"
            >
              Due Date
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              id="due-date"
              type="date"
              value="2023-06-30"
             />
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="assigned-to"
            >
              Assigned To
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:r1:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span style={{pointerEvents: "none"}}>John Doe</span>
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
                className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="status">
              Status
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:r5:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span style={{pointerEvents: "none"}}>In Progress</span>
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
                className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="priority"
            >
              Priority
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:r9:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span style={{pointerEvents: "none"}}>High</span>
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
                className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="task-type"
            >
              Task Type
            </label>
            <button
              type="button"
              role="combobox"
              aria-controls="radix-:re:"
              aria-expanded="false"
              aria-autocomplete="none"
              dir="ltr"
              data-state="closed"
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span style={{pointerEvents: "none"}}>Bug</span>
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
                className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <div>
            <label
              className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              id="description"
              placeholder="Enter task description"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mr-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default TestPage;
