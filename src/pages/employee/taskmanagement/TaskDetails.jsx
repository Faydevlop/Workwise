import React, { useEffect, useRef, useState } from 'react'
import EmployeeSidebar from '../../../components/Sidebar/EmployeeSidebar'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";

  

dayjs.extend(relativeTime);

const TaskDetails = () => {
    const {taskId} = useParams()
    const [taskData,setTaskData] = useState([])
    const [comment,setComment] = useState('');
    const [listcomments,setListcomments] = useState([])
    const [attach,setAttach] = useState([])
    
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

    const fetchattach = async()=>{
      try {

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/attach/${taskId}`)
        setAttach(response.data.attachments)
        
      } catch (error) {
        console.error("Error fetching attachments:", error);
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
      fetchattach()
    },[])

    // photo upload detatails - code 
    const fileInputRef = useRef(null);

    // Function to trigger the hidden file input when the plus icon is clicked
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    // Function to handle the file change event

    const handleDownload = async (fileUrl, fileName) => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Network response was not ok');
    
        const blob = await response.blob(); // Get the file as a Blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = fileName; // Specify the filename for download
        document.body.appendChild(link); // Append link to body
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove link after download
        window.URL.revokeObjectURL(link.href); // Free up memory
      } catch (error) {
        console.error('Download failed:', error);
      }
    };
    
  
    
    
    
    
    const handleFileChange = async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        console.log("Selected file:", selectedFile.name);
    
        // Create a FormData object and append the selected file
        const formData = new FormData();
        formData.append('attachments', selectedFile);
    
        // Integrate toast.promise to show upload progress
        toast.promise(
          axios.post(`${import.meta.env.VITE_BASE_URL}/task/attachments/${taskId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }),
          {
            pending: 'Uploading file...',
            success: 'File uploaded successfully!',
            error: 'Error uploading file',
          }
        );
      }
      fetchattach()
    };
    
    // phot upload code - end
  
    const handlSubmit = async()=>{
      const commentData = {
        comment:comment,
        commentedBy:userId
        
      }
  
      
  
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comment/addcomment/${taskId}`,commentData)
        toast.success("Comment added successfully!", {
          position: "top-center",
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
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-sm font-medium">{taskData.cat}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Due Date</p>
            <p className="text-base font-medium">{(new Date(taskData.dueDate).toLocaleDateString())}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Assigned To</p>
            
            
            {taskData?.assignedTo?.map((user)=>(
              <>
              <div className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt="@username" src={user.profileImageUrl || 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'}  />
              </span>

                 <span style={{pointerEvents: "none"}}>{user.firstName}{user.lastName}</span>
                 
                 </div>
              </>

              
                 
              ))}
             
              
            
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Status</p>
            <p className="text-base font-medium">{taskData.status}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mb-1">Priority</p>
            <p className="text-base font-medium">{taskData.priority}</p>
          </div>
        </div>
        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
        <div className="mb-6">
  <h2 className="text-xl font-bold mb-4">Attachments</h2>

  {/* Add Attachment Button */}
  <div className="mb-4">
      {/* Plus icon button to trigger file upload */}
      <button
        type="button"
        onClick={handleButtonClick}
        className="inline-flex items-center justify-center rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          className="h-5 w-5"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
 

  {/* Existing Attachment Grid */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Map through the attach array and render each attachment */}
      {attach.length > 0 ? (
        attach.map((attachment, index) => (
          <div
            key={index}
            className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <img
              alt={attachment.fileName}
              width="100"
              height="100"
              className="mb-2 bg-blue-200"
              src={attachment.fileUrl || "https://tailwindui.com/placeholder.svg"}
              style={{ aspectRatio: "100 / 100", objectFit: "cover" }}
            />
            <p className="text-sm font-medium">{attachment.fileName || "No name"}</p>
            <div className="flex items-center gap-2 mt-2">
              <a target='_blank' href={attachment.fileUrl}>
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
              </a>
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
              <button  onClick={() => handleDownload(attachment.fileUrl, attachment.fileName)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
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
    <path d="M12 5v14"></path>
    <path d="M19 12l-7 7-7-7"></path>
    <path d="M5 19h14"></path>
  </svg>
</button>

            </div>
          </div>
        ))
      ) : (
        <p>No attachments found.</p>
      )}
    </div>

</div>

        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
        
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
         
        </div>
      </div>
    </div>
    
    
    <ToastContainer position="top-center"/>
  </div>
  <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
  <div className="col-span-2 flex flex-col space-y-6">

 
  

  
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
              {taskData?.assignedTo?.map((user)=>(
              <>
              <div className="flex items-center gap-2">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img className="aspect-square h-full w-full" alt="@username" src={user.profileImageUrl || 'https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg'}  />
              </span>

                 <span style={{pointerEvents: "none"}}>{user.firstName}{user.lastName}</span>
                 
                 </div>
              </>

              
                 
              ))}
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
