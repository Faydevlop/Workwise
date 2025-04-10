
import React from 'react';

const MeetingListTable = ({ listData }) => {
  return (
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
          {listData.map((list, index) => (
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
                  <p>Scheduled</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {listData.length === 0 && <p className="text-center m-2">No Meeting Schedules</p>}
    </div>
  );
};

export default MeetingListTable;
