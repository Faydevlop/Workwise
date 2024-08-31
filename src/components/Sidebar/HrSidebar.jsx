import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with the HR logo if different
import { useDispatch } from "react-redux";
import { persistor } from "../../app/store";
import { logout } from '../../features/hrAuthSlice'; // Assuming you have a separate slice for HR

export default function HRSidebar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsSideNavOpen(!isSideNavOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('[aria-label="Side navigation"]')) {
        setIsSideNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = () => {
    persistor.purge();
    dispatch(logout());
  }

  return (
    <>
      <button
        title="Side navigation"
        type="button"
        className="fixed left-6 top-6 z-40 block h-10 w-10 rounded bg-white lg:hidden flex items-center justify-center"
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-2"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 relative">
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-6 bg-slate-700 transition-transform duration-300 ${isSideNavOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
          ></span>
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-6 bg-slate-900 transition-opacity duration-300 ${isSideNavOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-6 bg-slate-900 transition-transform duration-300 ${isSideNavOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"}`}
          ></span>
        </div>
      </button>

      <aside
        id="nav-menu-2"
        aria-label="Side navigation"
        ref={sidebarRef}
        className={`fixed bg-white top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r bg-background px-4  transition-transform lg:translate-x-0 ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <a
          aria-label="HR logo"
          className="flex items-center gap-2 p-6 text-xl font-bold focus:outline-none"
          href="javascript:void(0)"
        >
          <img
            src='http://localhost:5173/src/assets/Screenshot%202024-08-04%20184513.png'
            className="w-10 h-10 rounded-full"
            alt="HR logo"
          />
          WorkWise
        </a>
        <nav className="mt-8 flex flex-col gap-4">
          <Link to='/hr/dashboard'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/dashboard' ? 'bg-muted text-foreground' : ''}`}
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
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
              Dashboard
            </a>
          </Link>
          <Link to='/hr/employeerecords'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/employees' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Employee Management
            </a>
          </Link>
          <Link to='/hr/recruitment'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/attendance' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              Recruitment Management
            </a>
          </Link>
          <Link to='/hr/payrollmanagement'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/payroll' ? 'bg-muted text-foreground' : ''}`}
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
              <line x1="12" x2="12" y1="2" y2="22"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
              Payroll Management
            </a>
          </Link>
          
          
          <Link to='/hr/meetings'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/profile' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"></path>
                <path d="M12 12L2 7l10 5 10-5-10 5z"></path>
                <path d="M12 12v10l10-5V7l-10 5z"></path>
              </svg>
            meetings
            </a>
          </Link>
          
          <Link to='/hr/leaves'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/profile' ? 'bg-muted text-foreground' : ''}`}
            >
              <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5"
      >
        <path d="M8 2v4"></path>
        <path d="M16 2v4"></path>
        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
        <path d="M3 10h18"></path>
        <path d="m9 16 2 2 4-4"></path>
      </svg>
              Leave Management
            </a>
          </Link>
          <Link to='/hr/profile'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/profile' ? 'bg-muted text-foreground' : ''}`}
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
              Profile
            </a>
          </Link>
          <Link to='/hr/chat'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/hr/profile' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"></path>
                <path d="M12 12L2 7l10 5 10-5-10 5z"></path>
                <path d="M12 12v10l10-5V7l-10 5z"></path>
              </svg>
              Chat
            </a>
          </Link>
        </nav>
        <div className="mt-auto">
          <button
            className="flex items-center gap-3 rounded-md px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
            onClick={handleLogOut}
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" x2="9" y1="12" y2="12"></line>
            </svg>
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
