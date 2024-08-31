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
            <img className="aspect-square h-full w-full" alt="John Doe" src="https://tailwindui.com/placeholder-user.jpg" />
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
        <img className="aspect-square h-full w-full" alt="Jane Smith" src="https://tailwindui.com/placeholder-user.jpg" />
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
              <div className="flex items-center space-x-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden ">{taskData.assignedTo ? `${taskData.assignedTo[0].firstName}${taskData.assignedTo[0].lastName}` : 'Not available'}</span>
              </div>
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
