import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import ManagerSidebar from '../../../components/Sidebar/ManagerSidebar'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TaskDetail = () => {
  const {taskId} = useParams()
  const [taskData,setTaskData] = useState([])
  const [comment,setComment] = useState('');
  const [listcomments,setListcomments] = useState([])
  
  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager.manager._id;

  const fetchdata = async ()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/taskdetails/${taskId}`);
      setTaskData(response.data.task)
  // console.log(response.data.task);

    } catch (error) {
      
    }
  }


  const fetchComments = async ()=>{
    try {

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/listcomments/${taskId}`);

      setListcomments(response.data.comments)
      console.log(response.data.comments);
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchdata()
    fetchComments()
  },[])

  const handlSubmit = async()=>{
    const commentData = {
      comment:comment,
      commentedBy:userId
      
    }

    


    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comment/addcomment/${taskId}`,commentData)
      toast.success("Comment added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
       
      });
      fetchComments()
    } catch (error) {
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div className='bg-blue-50'  style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          
<ToastContainer/>

<div className="grid gap-8 px-4 py-6 mx-auto max-w-6xl sm:px-6 lg:px-8">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <h1 className="text-2xl font-bold">Task Details</h1>
      <div
        className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
        data-v0-t="badge"
      >
        In Progress
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div
        aria-valuemax="100"
        aria-valuemin="0"
        role="progressbar"
        data-state="indeterminate"
        data-max="100"
        className="relative overflow-hidden w-full h-2 rounded-full bg-muted"
      >
        <div
          data-state="indeterminate"
          data-max="100"
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{transform: "translateX(-100%)"}}
        ></div>
      </div>
    </div>
  </div>
  <div className="grid gap-8 md:grid-cols-[1fr_300px]">
    <div className='bg-white'>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Project Details</h3>
        </div>
        <div className="p-6 grid gap-4">
          <div className="grid gap-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="task-name"
            >
              Task Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="task-name"
              type="text"
              value={taskData.name}
             />
          </div>
          <div className="grid gap-1">
            <label
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="task-description"
            >
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="task-description"
              rows="3"
              value={taskData.description}
            >
              
            </textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-status"
              >
                Status
              </label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r3a:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span style={{pointerEvents: "none"}}>{taskData.status}</span>
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
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-due-date"
              >
                Due Date
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="task-due-date"
                type="text"
                value={new Date(taskData.dueDate).toLocaleDateString()}
               />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-assigned-to"
              >
                Assigned To
              </label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r3b:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span style={{pointerEvents: "none"}}>{taskData.assignedTo && taskData.assignedTo.length > 0 ? `${taskData.assignedTo[0].firstName}${taskData.assignedTo[0].lastName}` : 'Not available'}
                </span>
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
            <div className="grid gap-1">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="task-created-at"
              >
                Created At
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="task-created-at"
                readonly=""
                type="text"
                value={new Date(taskData.createdAt).toLocaleDateString()}
               />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-white ' style={{ width: '350px' }}>
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
    <div className="flex flex-col space-y-1.5 p-6">
      <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Comments</h3>
    </div>
    <div className="p-6 grid gap-4">
      <div className="grid gap-4 h-60 overflow-y-scroll"> {/* Adjust height as needed */}
        
        {
          listcomments.map((list)=>(
            <div className="flex items-start gap-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img className="aspect-square h-full w-full" alt="Jane Smith" src="https://tailwindui.com/placeholder-user.jpg" />
            </span>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{list.commentedBy ? `${list.commentedBy.firstName}${list.commentedBy.lastName}`:"Not available" }</div>
                <div className="text-xs text-muted-foreground">{dayjs(list.createdAt).fromNow()}</div>
              </div>
              <p className="text-muted-foreground">
                {list.comment}
              </p>
            </div>
          </div>
          ))
        }
       
        

      </div>
      <div className="grid gap-2">
        <label
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="new-comment"
        >
          Add a comment
        </label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          id="new-comment"
          rows="3"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
        ></textarea>
        <button onClick={handlSubmit} className="inline-flex bg-black text-white hover:bg-gray-700 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
          Submit
        </button>
      </div>
    </div>
  </div>
</div>

  </div>
</div>


        </div>
        
    
    </div>
   
  )
}

export default TaskDetail
