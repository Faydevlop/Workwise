import React, { useState, useEffect } from 'react';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Backdrop from '@mui/material/Backdrop';
import { ScaleLoader } from 'react-spinners';
import NotificationBox from '../../components/notification/notificationBox';
import axiosInstance from '../../config/axiosConfig';
import { TextField, Pagination } from '@mui/material'; // Import TextField and Pagination

const HrMeetings = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [listdata, setListdata] = useState([]); // Main list of meetings
  const [listnext, setListnext] = useState([]); // Upcoming meetings for the sidebar
  const [loading, setLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(3); // For sidebar "Show More"

  // State for search and date filters (applied to both sections)
  const [searchTerm, setSearchTerm] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  // Pagination states for the main table (listdata)
  const [currentPage, setCurrentPage] = useState(1);
  const [meetingsPerPage] = useState(5); // 5 meetings per page for the main table

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  const fetchdata = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/meeting/listmeeting/${userId}`);
      setListdata(response.data.listData);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchnext = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/meeting/nextmeet`);
      setListnext(response.data.upcomingMeetings);
    } catch (error) {
      console.error("Error fetching next meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
    fetchnext();
  }, [userId]); // Add userId to dependency array

  const handledelete = async (meetingId) => {
    try {
      await axiosInstance.post(`/meeting/deletemeeting/${meetingId}`);
      toast.success("Meeting deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchdata(); // Re-fetch data after deletion
      fetchnext(); // Re-fetch upcoming meetings as well
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while deleting the meeting.";
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
  };

  // --- Filtering & Pagination Logic for Main Table (listdata) ---
  const filteredAndSortedMainMeetings = listdata
    .filter((meeting) => {
      const matchesSearch =
        meeting.meetingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.participants.some(
          (p) =>
            (p.firstName && p.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.lastName && p.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      const meetingDate = new Date(meeting.date);
      // Normalize dates to start of day for accurate range comparison
      const filterStartDate = startDateFilter ? new Date(startDateFilter + 'T00:00:00') : null;
      const filterEndDate = endDateFilter ? new Date(endDateFilter + 'T23:59:59') : null;


      const matchesStartDate = filterStartDate
        ? meetingDate >= filterStartDate
        : true;
      const matchesEndDate = filterEndDate
        ? meetingDate <= filterEndDate
        : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending (latest first)

  const totalPages = Math.ceil(filteredAndSortedMainMeetings.length / meetingsPerPage);
  const startIndex = (currentPage - 1) * meetingsPerPage;
  const paginatedMainMeetings = filteredAndSortedMainMeetings.slice(startIndex, startIndex + meetingsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // --- Filtering & Sorting Logic for Sidebar (listnext) ---
  const filteredAndSortedSidebarMeetings = [...listnext] // Use a copy to sort
    .filter((meeting) => {
      const matchesSearch =
        meeting.meetingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.topic.toLowerCase().includes(searchTerm.toLowerCase());

      const meetingDate = new Date(meeting.date);
      // Normalize dates to start of day for accurate range comparison
      const filterStartDate = startDateFilter ? new Date(startDateFilter + 'T00:00:00') : null;
      const filterEndDate = endDateFilter ? new Date(endDateFilter + 'T23:59:59') : null;

      const matchesStartDate = filterStartDate
        ? meetingDate >= filterStartDate
        : true;
      const matchesEndDate = filterEndDate
        ? meetingDate <= filterEndDate
        : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    })
    .sort((a, b) => { // Existing sort logic for sidebar (ongoing > scheduled > other statuses)
      if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
      if (a.status !== 'ongoing' && b.status === 'ongoing') return 1;
      if (a.status === 'scheduled' && b.status !== 'scheduled') return -1;
      if (a.status !== 'scheduled' && b.status === 'scheduled') return 1;
      return 0;
    });

  // Function to handle showing more meetings in the sidebar
  const showMoreMeetings = () => {
    setVisibleCount(filteredAndSortedSidebarMeetings.length); // Show all filtered meetings
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        <HrSidebar />
      </div>

      <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <ScaleLoader
            color="#ffffff"
            height={35}
            width={4}
            radius={2}
            margin={2}
          />
        </Backdrop>
        <div className="flex flex-col min-h-screen bg-muted/40">
          <header className="bg-background bg-[#2F3849] border-b px-4 md:px-6 flex items-center h-14 sm:h-16">
            <div className="flex-1 flex text-white items-center gap-4">
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
              <Link to={'/hr/meetings/addmeeting'}>
                <button className="px-4 py-2 rounded-full text-white hover:bg-white transition-colors duration-300 hover:text-slate-600 focus:outline-none focus:bg-blue-600">
                  Add Meeting
                </button>
              </Link>
            </div>
          </header>
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Scheduled Meetings</h1>
                <p className="text-muted-foreground">View and manage all your scheduled meetings.</p>
              </div>

              {/* Search and Date Filters for Main Table */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <TextField
                  label="Search Meetings"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on new search
                  }}
                  className="w-full sm:w-1/3"
                />
                <TextField
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                  value={startDateFilter}
                  onChange={(e) => {
                    setStartDateFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on new filter
                  }}
                  className="w-full sm:w-1/3"
                />
                <TextField
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                  value={endDateFilter}
                  onChange={(e) => {
                    setEndDateFilter(e.target.value);
                    setCurrentPage(1); // Reset to first page on new filter
                  }}
                  className="w-full sm:w-1/3"
                />
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
                    <ToastContainer />
                    <tbody className="[&_tr:last-child]:border-0">
                      {paginatedMainMeetings.length > 0 ? (
                        paginatedMainMeetings.map((meeting, index) => (
                          <tr
                            key={meeting._id} // Use meeting._id for unique key
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <div className={`bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium`}>
                                  {meeting.meetingName}
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">{meeting.topic}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{new Date(meeting.date).toLocaleDateString()}</td>
                            <td className="p-4 align-middle">{meeting.time}</td>
                            <td className="p-4 align-middle">
                              <div className="flex -space-x-2 overflow-hidden">
                                {meeting?.participants.map((user, i) => (
                                  <span key={user._id || i} className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 border-2 border-background">
                                    <img className="aspect-square h-full w-full" alt={`attendee ${i}`} src={
                                      user?.profileImageUrl
                                        ? user?.profileImageUrl
                                        : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                                    } />
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
                                      <Link to={`/hr/meetings/editmeeting/${meeting._id}`} >
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                          Edit Meeting
                                        </a>
                                      </Link>

                                      <a href="#" onClick={() => handledelete(meeting._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Delete Meeting
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="p-4 text-center">
                            No meetings found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Pagination Controls for Main Table */}
              {paginatedMainMeetings.length > 0 && (
                <div className="flex justify-center mt-4">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </div>
              )}
            </div>
            <div className="bg-background border rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold">Upcoming Meetings</h2>
                <p className="text-muted-foreground">Here are your upcoming scheduled meetings.</p>
              </div>
              {filteredAndSortedSidebarMeetings.length === 0 && <p>No Upcoming Meeting Scheduled</p>}

              {filteredAndSortedSidebarMeetings
                .slice(0, visibleCount)
                .map((meeting) => (
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
                        <span key={participant._id || index} className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border-2 border-background">
                          <img className="aspect-square h-full w-full" alt={`Participant ${index + 1}`} src={
                            participant?.profileImageUrl
                              ? participant?.profileImageUrl
                              : "https://i.pinimg.com/564x/00/80/ee/0080eeaeaa2f2fba77af3e1efeade565.jpg"
                          } />
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

              {visibleCount < filteredAndSortedSidebarMeetings.length && (
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
      <NotificationBox userId={userId} />
    </div>
  );
};

export default HrMeetings;
