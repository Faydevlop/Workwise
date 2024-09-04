import React, { useState } from "react";




function TestPage() {
  
  return (
   <>
   <header
  class="bg-background border-b px-4 md:px-6 flex items-center h-16 shrink-0 justify-between"
  id="c13eo4kwptn"
>
  <h1 class="text-xl font-bold">Recruiter Management</h1>
  <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
    Add Job Post
  </button>
</header>
<br />
   <div className="rounded-lg m-4 border bg-card text-card-foreground shadow-sm" id="j9xdchv8lq" data-v0-t="card">
   <div className="relative w-full overflow-auto">
     <table className="w-full caption-bottom text-sm">
       <thead className="[&_tr]:border-b">
         <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
           <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
             Applicant
           </th>
           <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
             Position
           </th>
           <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
             Date
           </th>
           <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
             Status
           </th>
           <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 text-right">
             Actions
           </th>
         </tr>
       </thead>
       <tbody className="[&_tr:last-child]:border-0">
         <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div className="font-medium">John Doe</div>
             <div className="text-sm text-muted-foreground">Software Engineer</div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">Software Engineer</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-04-15</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div
               className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-500 text-yellow-900"
               data-v0-t="badge"
             >
               Pending
             </div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               View
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               Approve
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-red-500">
               Reject
             </button>
           </td>
         </tr>
         <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div className="font-medium">Jane Smith</div>
             <div className="text-sm text-muted-foreground">Product Manager</div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">Product Manager</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-04-12</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div
               className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-500 text-yellow-900"
               data-v0-t="badge"
             >
               Pending
             </div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               View
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               Approve
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-red-500">
               Reject
             </button>
           </td>
         </tr>
         <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div className="font-medium">Michael Johnson</div>
             <div className="text-sm text-muted-foreground">UI/UX Designer</div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">UI/UX Designer</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">2023-04-10</td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
             <div
               className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-500 text-yellow-900"
               data-v0-t="badge"
             >
               Pending
             </div>
           </td>
           <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               View
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-2">
               Approve
             </button>
             <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-red-500">
               Reject
             </button>
           </td>
         </tr>
       </tbody>
     </table>
   </div>
 </div></>
  );
}

export default TestPage;
