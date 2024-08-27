import React, { useState } from "react";

function TestPage() {
  return (
    <>
   <div className="flex min-h-screen w-full flex-col bg-muted/40">
  <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    <a className="flex items-center gap-2" href="/">
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
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span className="sr-only">Acme Inc</span>
    </a>
    <nav className="ml-auto hidden gap-4 sm:flex">
      <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
        Tasks
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
        Projects
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
        Team
      </a>
      <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
        Calendar
      </a>
    </nav>
  </header>
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-todo-x-chunk="dashboard-06-chunk-0"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Tasks</h3>
          <p className="text-sm text-muted-foreground">Manage your tasks and track your progress.</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1">
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
                className="lucide lucide-search absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <input
                className="flex h-10 border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                placeholder="Search tasks..."
                type="search"
               />
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-8 gap-1">
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
                  className="lucide lucide-plus h-3.5 w-3.5"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                <span className="sr-only sm:not-sr-only">New Task</span>
              </button>
            </div>
          </div>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Task
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Description
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Due Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    Finish quarterly report
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    Compile and submit the Q4 financial report.
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-12-31</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div
                      className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                      data-v0-t="badge"
                    >
                      To-do
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    Implement new feature
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    Add the requested feature to the product roadmap.
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-11-15</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div
                      className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      data-v0-t="badge"
                    >
                      In Progress
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    Attend team meeting
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    Discuss the latest project updates with the team.
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-11-10</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div
                      className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      data-v0-t="badge"
                    >
                      Completed
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                    Update website content
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    Refresh the homepage and product pages with new information.
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-12-01</td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    <div
                      className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                      data-v0-t="badge"
                    >
                      To-do
                    </div>
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center p-6">
          <div className="text-xs text-muted-foreground"></div>
        </div>
      </div>
    </div>
  </main>
</div>

    </>
  );
}

export default TestPage;
