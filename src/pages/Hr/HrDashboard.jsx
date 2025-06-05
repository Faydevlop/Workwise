import React from 'react';
import HrSidebar from '../../components/Sidebar/HrSidebar';
import { useSelector } from 'react-redux';
import NotificationBox from '../../components/notification/notificationBox';
import useHrDashboardData from '../../hooks/hr/useHrDashboardData';

const HrDashboard = () => {
  const { hr } = useSelector((state) => state.hrAuth);
  const userId = hr.hr._id;

  // Use the custom hook to get data
  const { meetings, jobs, leaves, error } = useHrDashboardData(userId);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar />
      </div>
      <div className="lg:hidden">
        {/* Mobile version of sidebar */}
        <HrSidebar />
      </div>

      <div style={{ flex: 1, overflow: 'auto', marginLeft: '0' }}>
        <header className="flex border bg-[#2F3849] mb-5 border-gray-200 pl-4 flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3">
          <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            <a className="flex-none font-semibold text-xl text-white focus:outline-none focus:opacity-80" href="/" aria-label="Brand">
              Dashboard and Overview
            </a>
          </nav>
        </header>

        <div className="flex flex-col w-full min-h-screen bg-muted/40">
          <header className="sticky mt-5 mb-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <nav aria-label="breadcrumb" className="hidden md:flex">
              <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                <li className="inline-flex items-center gap-1.5"></li>
                <li aria-hidden="true" className="[&>svg]:size-3.5" role="presentation">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <span aria-current="page" aria-disabled="true" className="font-normal text-foreground" role="link">
                    HR Dashboard
                  </span>
                </li>
              </ol>
            </nav>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Pending Job Vacancy Requests */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 bg-blue-100 p-6 px-7">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Pending Job Vacancy Requests</h3>
                  <p className="text-sm text-muted-foreground">Review and manage pending</p>
                </div>
                <div className="p-6">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Position</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Contact</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.length > 0 ? (
                          jobs.slice().reverse().map((job) => (
                            <tr key={job._id} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle font-medium">{job.name}</td>
                              <td className="p-4 align-middle">{job.email}</td>
                              <td className="p-4 align-middle">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                  {job.status}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" className="text-center">No Requests Here</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 bg-blue-100 p-6 px-7">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Upcoming Meetings</h3>
                  <p className="text-sm text-muted-foreground">View and manage your upcoming meetings.</p>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                    {meetings.length > 0 ? (
                      meetings.slice().reverse().map((meet, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="grid gap-1">
                            <p className="text-sm font-medium">{meet.meetingName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meet.date).toLocaleDateString()}, {meet.time}
                            </p>
                          </div>
                          <button className="inline-flex items-center justify-center text-sm font-medium bg-background hover:bg-accent h-9 rounded-md px-3">
                            {meet.status}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center">No Meetings Scheduled</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Pending Leave Approvals */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 bg-blue-100 p-6 px-7">
                  <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Pending Leave Approvals</h3>
                  <p className="text-sm text-muted-foreground">Review and approve pending leave requests.</p>
                </div>
                <div className="p-6">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Employee</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Leave Dates</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaves.length > 0 ? (
                          leaves.slice().reverse().map((leave, index) => (
                            <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle font-medium">
                                {leave.userId?.firstName} {leave.userId?.lastName}
                              </td>
                              <td className="p-4 align-middle">{new Date(leave.startDate).toLocaleDateString()}</td>
                              <td className="p-4 align-middle">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                  {leave.status}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" className="text-center">No Leave Requests</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <NotificationBox userId={userId} />
    </div>
  );
};

export default HrDashboard;
