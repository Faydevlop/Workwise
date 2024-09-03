import React, { useEffect, useState } from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Meetings = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [listdata,setListdata] = useState([])
  const [listnext,setListnext] = useState([])
  const [visibleCount, setVisibleCount] = useState(3);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const sortedMeetings = [...listnext].sort((a, b) => {
    if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
    if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
    if (a.status === 'scheduled' && b.status !== 'scheduled') return -1;
    if (a.status !== 'scheduled' && b.status === 'scheduled') return 1;
    return 0;
  });
  // Function to handle showing more meetings
  const showMoreMeetings = () => {
    setVisibleCount(listnext.length); // Show all meetings
  };

  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager.manager._id;

  const fetchdata = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/listmeeting/${userId}`)
      setListdata(response.data.listData)
      // console.log(response.data.listData);
      
    } catch (error) {
      
    }
  }
  const fetchnext = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/nextmeet`)
      setListnext(response.data.upcomingMeetings)
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(()=>{
   
    fetchdata()
    fetchnext()
  },[])

  const handledelete = async(meetingId)=>{
    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/deletemeeting/${meetingId}`)
      toast.success("Meeting deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       
      });
      fetchdata()
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the meeting."
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

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
          <div className="flex flex-col min-h-screen bg-muted/40">
   <header className="bg-background border-b px-4 md:px-6 flex items-center h-14 sm:h-16">
     <div className="flex-1 flex items-center gap-4">
       <a className="flex items-center gap-2 text-lg font-semibold" href="/">
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
           className="w-6 h-6"
         >
           <path d="M8 2v4"></path>
           <path d="M16 2v4"></path>
           <rect width="18" height="18" x="3" y="4" rx="2"></rect>
           <path d="M3 10h18"></path>
         </svg>
         <span className="sr-only">Acme Meetings</span>
       </a>
       <nav className="hidden md:flex gap-6 text-sm font-medium">
         <a className="text-muted-foreground hover:text-foreground" href="/">
           Meetings Management
         </a>
         
       </nav>
     </div>
     
     <div className="flex items-center gap-2 ">
      <Link to={'/manager/meetings/addmeeting'}>
       <button className="  inline-flex justify-center rounded-md border border-gray-300 bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Meeting
      
       </button>
       </Link>
     </div>
   </header>
   <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
     <div>
       <div className="mb-6">
         <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
         <p className="text-muted-foreground">View and manage your upcoming meetings.</p>
       </div>
       
       <div className="border rounded-lg shadow-sm overflow-hidden">
         <div className="relative w-full overflow-auto">
         <table className="w-full caption-bottom text-sm">
      <thead className="[&_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Meeting
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Date
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Time
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
            Attendees
          </th>
          <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
            Actions
          </th>
        </tr>
      </thead>
      <ToastContainer/>
      <tbody className="[&_tr:last-child]:border-0">
        
        {listdata.map((meeting, index) => (
          <tr
            key={index}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          >
            <td className="p-4 align-middle">
              <div className="flex items-center gap-3">
                <div className={`bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium`}>
                  {meeting.meetingName}
                </div>
                <div>
                  {/* <div className="font-medium">{meeting.meetingName}</div> */}
                  <div className="text-sm text-muted-foreground">{meeting.topic}</div>
                </div>
              </div>
            </td>
            <td className="p-4 align-middle">{new Date(meeting.date).toLocaleDateString()}</td>
            <td className="p-4 align-middle">{meeting.time}</td>
            <td className="p-4 align-middle">
              <div className="flex -space-x-2 overflow-hidden">
                {meeting.participants.map((_, i) => (
                  <span key={i} className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 border-2 border-background">
                    <img className="aspect-square h-full w-full" alt={`attendee ${i}`} src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?ct=jpeg" />
                  </span>
                ))}
              </div>
            </td>
            <td className="p-4 align-middle text-right">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Manage
                </button>

                {dropdownOpen === index && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                    style={{ backgroundColor: "white", zIndex: 1000 }}
                  >
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View Details
                      </a>
                      <Link to={`/manager/meetings/editmeeting/${meeting._id}`} >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Edit Meeting
                      </a>
                      </Link>
                      
                      <a href="#" onClick={()=>handledelete(meeting._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Delete Meeting
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
            </td>
            
          </tr>
        ))}
      </tbody>
      
    </table>
    {
          listdata.length == 0 ? (<p className='text-center'>No Meetings Scheduled</p>) : ''
        } 
         </div>
       </div>
     </div>
     <div className="bg-background border rounded-lg shadow-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Upcoming Meetings</h2>
        <p className="text-muted-foreground">Here are your upcoming scheduled meetings.</p>
      </div>
      {listnext.length === 0 ? (<p>No Meeting Scheduled</p>) : ''}

      {sortedMeetings.slice(0, visibleCount).map((meeting) => (
        <div key={meeting._id} className="mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium">
              {meeting.meetingName}
            </div>
            <div>
              <div className="font-medium">{meeting.topic}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(meeting.date).toLocaleDateString()} - {meeting.time}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {meeting.participants.map((participant, index) => (
              <span key={index} className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
                <img className="aspect-square h-full w-full" alt={`Participant ${index + 1}`} src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?ct=jpeg" />
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            {meeting.status === 'scheduled' && (
              <button
                className="inline-flex bg-black text-slate-50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                onClick={() => window.open(meeting.link, "_blank")}
              >
                scheduled
              </button>
            )}
            {meeting.status === 'completed' && (
              <button
                className="inline-flex bg-black text-slate-50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                onClick={() => window.open(meeting.link, "_blank")}
              >
                Meet completed
              </button>
            )}
            {meeting.status === 'ongoing' && (
              <button
                className="inline-flex bg-black text-slate-50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                onClick={() => window.open(meeting.link, "_blank")}
              >
                Join Meeting
              </button>
            )}
          </div>
          <br />
          <hr />
        </div>
      ))}

      {visibleCount < listnext.length && (
        <button
          className="mt-4 bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/80 transition-colors"
          onClick={showMoreMeetings}
        >
          Show More
        </button>
      )}
    </div>
   </main>
 </div>

        </div>
        
    
    </div>
   
  )
}

export default Meetings
