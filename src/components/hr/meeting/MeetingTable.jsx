import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MeetingTable = ({ listData, handleDelete, toggleDropdown, dropdownOpen }) => {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Meeting</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Attendees</th>
              <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <ToastContainer />
          <tbody className="[&_tr:last-child]:border-0">
            {listData.map((meeting, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50">
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
                    {meeting.participants.map((_, i) => (
                      <span key={i} className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 border-2 border-background">
                        <img className="aspect-square h-full w-full" alt={`attendee ${i}`} src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?ct=jpeg" />
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 align-middle text-right">
                  <div className="relative inline-block text-left">
                    <button onClick={() => toggleDropdown(index)} className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Manage
                    </button>
                    {dropdownOpen === index && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Details</a>
                          <Link to={`/hr/meetings/editmeeting/${meeting._id}`}>
                            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Meeting</a>
                          </Link>
                          <a onClick={() => handleDelete(meeting._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete Meeting</a>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {listData.length === 0 && <p className="text-center">No Meetings Scheduled</p>}
      </div>
    </div>
  );
};

export default MeetingTable;
