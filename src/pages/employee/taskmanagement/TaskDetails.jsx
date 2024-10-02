import React, { useEffect, useState } from 'react'
import EmployeeSidebar from '../../../components/Sidebar/EmployeeSidebar'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'

const TaskDetails = () => {
    const {taskId} = useParams()
    const [taskData,setTaskData] = useState([])
    const [comment,setComment] = useState('');
    const [listcomments,setListcomments] = useState([])
    
    const { employee } = useSelector((state) => state.employeeAuth);
 
  const userId = employee.user._id
  
    const fetchdata = async ()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/taskdetails/${taskId}`);
        setTaskData(response.data.task)
        console.log('the task details is here',response.data);
   
  
      } catch (error) {
        
      }
    }
  
  
    const fetchComments = async ()=>{
      try {
  
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comment/listcomments/${taskId}`);
  
        setListcomments(response.data.comments)
        
        
        
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
        setComment('')
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
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
       
<div className="container mx-auto py-8 px-4 md:px-6">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-card rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{taskData.name}</h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-primary text-primary-foreground text-sm font-medium">{taskData.priority}</span>
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-sm font-medium">Bug</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Due Date</p>
            <p className="text-base font-medium">{(new Date(taskData.dueDate).toLocaleDateString())}</p>
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
                className="mb-2 bg-blue-200"
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
                className="mb-2 bg-blue-200"
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
                className="mb-2 bg-blue-200"
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
              value={taskData.name}
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
              type="text"
              value={(new Date(taskData.dueDate).toLocaleDateString())}
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
              {taskData?.assignedTo?.map((user)=>(
                 <span style={{pointerEvents: "none"}}>{user.firstName}{user.lastName}</span>
                 
              ))
            
              }
                {
                taskData?.assignedTo?.length === 0 ? (  <span style={{pointerEvents: "none"}}>No Users Assigned</span>) : ''
 
              }
             
             
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
              <span style={{pointerEvents: "none"}}>{taskData.status}</span>
             
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
              <span style={{pointerEvents: "none"}}>{taskData.priority}</span>
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
           
              value={taskData.description}
              
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
  <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
  <div className="col-span-2 flex flex-col space-y-6">

  <div className="bg-white rounded-lg shadow-md p-6">
    <h1 className="text-2xl font-bold mb-4">{taskData.name}</h1>
    <p className="text-gray-600 mb-6">{taskData.description}</p>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Due Date</h3>
        <p className="text-gray-600">{(new Date(taskData.dueDate).toLocaleDateString())}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Assigned To</h3>
        <div className="flex items-center space-x-2">
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full" alt="John Doe" src={ taskData.assignedTo ? taskData.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} />
          </span>
          <p className="text-gray-600">{taskData.assignedTo ? `${taskData.assignedTo[0].firstName}${taskData.assignedTo[0].lastName}` : 'Not available'}</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Status</h3>
        <div
          className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-100 text-yellow-600"
        >
          {taskData.status}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Priority</h3>
        <div
          className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-100 text-red-600"
        >
         {taskData.priority}
        </div>
      </div>
    </div>
  </div>
  <ToastContainer/>

  
  <div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold mb-4">Comments</h2>
  <div className="max-h-[300px] overflow-y-auto space-y-4 mb-6">
    
  {
    listcomments.map((list)=>(<div className="flex items-start space-x-4">
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <img className="aspect-square h-full w-full" alt="Jane Smith"  src={ list.commentedBy.profileImageUrl? list.commentedBy.profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} />
      </span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium">{list.commentedBy ? `${list.commentedBy.firstName}${list.commentedBy.lastName}`:"Not available" }</p>
          <p className="text-gray-500 text-sm">{dayjs(list.createdAt).fromNow()}</p>
        </div>
        <p className="text-gray-600">{list.comment}</p>
      </div>
    </div>))
  }
    
  </div>
  <div className="bg-gray-100 h-[1px] w-full my-6"></div>
  <div>
    <h3 className="text-lg font-medium mb-2">Add Comment</h3>
    <textarea
      className="flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
      placeholder="Write your comment here..."
      rows="3"
      value={comment}
      onChange={(e)=>setComment(e.target.value)}
    ></textarea>
    <div className="flex justify-end mt-4">
      <button onClick={handlSubmit} className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
        Submit
      </button>
    </div>
  </div>
</div>

</div>

    <div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Task Details</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">
               {taskData.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Due Date</h3>
              <p className="text-gray-600">{new Date(taskData.dueDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Assigned To</h3>
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img className="aspect-square h-full w-full" alt="John Doe" src={ taskData.assignedTo ? taskData.assignedTo[0].profileImageUrl : `https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg`} />
          </span>
            </div>
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

export default TaskDetails
