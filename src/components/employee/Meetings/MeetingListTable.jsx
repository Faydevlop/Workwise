import React, { useState } from 'react';

const MeetingListTable = ({ listData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const reversedData = listData.slice().reverse();

  const filteredData = reversedData.filter((list) => {
    const searchMatch =
      list.meetingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.topic.toLowerCase().includes(searchTerm.toLowerCase());

    // Date range filtering logic
    const listDate = new Date(list.date);
    let dateMatch = true;

    if (startDateFilter) {
      const start = new Date(startDateFilter);
      start.setHours(0, 0, 0, 0); // Normalize to start of the day
      dateMatch = dateMatch && listDate >= start;
    }

    if (endDateFilter) {
      const end = new Date(endDateFilter);
      end.setHours(23, 59, 59, 999); // Normalize to end of the day
      dateMatch = dateMatch && listDate <= end;
    }

    return searchMatch && dateMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or topic"
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Date Range Inputs */}
        <input
          type="date"
          className="border p-2 rounded"
          value={startDateFilter}
          onChange={(e) => {
            setStartDateFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDateFilter}
          onChange={(e) => {
            setEndDateFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
        />
      </div>

      {/* Table */}
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Meeting Name</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Topic</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Time</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Attendees</th>
              <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((list, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4">{list.meetingName}</td>
                <td className="p-4">{list.topic}</td>
                <td className="p-4">{new Date(list.date).toLocaleDateString()}</td>
                <td className="p-4">{list.time}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {list.participants.map((_, idx) => (
                      <span key={idx} className="relative flex h-10 w-10 overflow-hidden rounded-full">
                        <img
                          className="aspect-square h-full w-full"
                          src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                          alt="Attendee"
                        />
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  {list.status === 'ongoing' ? (
                    <a className="inline-flex items-center gap-2 text-blue-500" href={list.link}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                        <rect x="2" y="6" width="14" height="12" rx="2" />
                      </svg>
                      Join
                    </a>
                  ) : (
                    <p>{list.status.charAt(0).toUpperCase() + list.status.slice(1)}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && <p className="text-center m-2">No Meeting Schedules</p>}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MeetingListTable;