const PayrollCard = ({ data }) => {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center gap-4">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <img className="aspect-square h-full w-full" alt="Employee Avatar" src="/placeholder.svg" />
            </span>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{data ? `${data.firstName} ${data.lastName}` : 'Not available'}</h2>
              <p className="text-muted-foreground">{data ? `${data.position}` : 'Not available'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PayrollCard;
  