import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ManagerSidebar from '../../../components/Sidebar/ManagerSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMeeting = () => {
  // State variables for each input field
  const [meetingName, setMeetingName] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState([]);
  const [meetingLink, setMeetingLink] = useState('');
  const [topic, setTopic] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  const [listingUser, setListingUser] = useState([]);
  const navigate = useNavigate();

  const { manager } = useSelector((state) => state.managerAuth);
  const userId = manager?.manager?._id;

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!meetingName.trim()) newErrors.meetingName = "Meeting name is required.";
    if (!date.trim()) newErrors.date = "Date is required.";
    if (!time.trim()) newErrors.time = "time is required.";
    if (participants.length === 0) newErrors.participants = "At least one participant must be selected.";
    if (!meetingLink.trim()) newErrors.meetingLink = "Meeting link is required.";
    if (!topic.trim()) newErrors.topic = "Meeting topic is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleMeeting = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log(meetingName, date, participants, meetingLink, topic);

      // Make an API request to save the meeting details
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/addmeeting/${userId}`, {
        meetingName,
        date,
        participants,
        meetingLink,
        topic,
        time
      });

      toast.success("Meeting Scheduled successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose:()=>navigate('/manager/meetings')
       
      });
      
    } catch (error) {
    
      console.error('Error saving the meeting:', errorMessage);
      const errorMessage = error.response?.data?.message || "An error occurred while shcheduling the meeting."
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/listuser/${userId}`);
        setListingUser(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar />
      </div>
      <div className="lg:hidden">
        <ManagerSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <div className="w-full px-4 md:px-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Add Meeting</h3>
              <p className="text-sm text-muted-foreground">Fill out the details for your upcoming meeting.</p>
            </div>
            <div className="p-6">
              <form className="grid gap-4" onSubmit={handleMeeting}>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                    Meeting Name
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                      errors.meetingName ? 'border-red-500' : 'border-input'
                    }`}
                    id="name"
                    placeholder="Enter meeting name"
                    value={meetingName}
                    onChange={(e) => setMeetingName(e.target.value)}
                  />
                  {errors.meetingName && <p className="text-red-500 text-sm mt-1">{errors.meetingName}</p>}
                </div>
                <ToastContainer/>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="date">
                    Date
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                      errors.date ? 'border-red-500' : 'border-input'
                    }`}
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                      errors.time ? 'border-red-500' : 'border-input'
                    }`}
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    
                  />
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="participants">
                    Participants
                  </label>
                  <select
                    id="participants"
                    multiple
                    className={`flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                      errors.participants ? 'border-red-500' : 'border-input'
                    }`}
                    value={participants}
                    onChange={(e) => setParticipants([...e.target.selectedOptions].map(option => option.value))}
                  >
                    {listingUser.map((user, index) => (
                      <option key={index} value={user._id}>{user.firstName}{user.lastName}</option>
                    ))}
                  </select>
                  {errors.participants && <p className="text-red-500 text-sm mt-1">{errors.participants}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="meetingLink">
                    Meeting Link
                  </label>
                  <input
                    className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                      errors.meetingLink ? 'border-red-500' : 'border-input'
                    }`}
                    id="meetingLink"
                    placeholder="Enter Meeting Link"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                  />
                  {errors.meetingLink && <p className="text-red-500 text-sm mt-1">{errors.meetingLink}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="topic">
                    Topic
                  </label>
                  <textarea
                    className={`flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 min-h-[100px] ${
                      errors.topic ? 'border-red-500' : 'border-input'
                    }`}
                    id="topic"
                    placeholder="Describe the meeting topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  ></textarea>
                  {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                </div>
                <div className="flex items-center p-6">
                  <button
                    type="submit"
                    className="inline-flex items-center bg-black text-white hover:bg-gray-800 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto"
                  >
                    {loading ? <ScaleLoader color="#fff" height={15} /> : 'Save Meeting'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <br />

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 text-center items-center justify-between">
          <p className="text-sm leading-loose text-muted-foreground">
            Copyright © 2023
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AddMeeting;
