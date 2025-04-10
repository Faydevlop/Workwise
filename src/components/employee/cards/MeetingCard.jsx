const MeetingCard = ({ meetings }) => {
    if (meetings.length === 0) return <p className="p-6">No Meetings Scheduled</p>;
  
    return (
      <div className="p-6 grid gap-2">
        {meetings.map((meet, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{meet.meetingName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(meet.date).toLocaleDateString()}, {meet.time}
              </p>
            </div>
            <button className="inline-flex h-9 rounded-md border bg-background px-3 text-sm font-medium hover:bg-accent">
              {meet.status}
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default MeetingCard;
  