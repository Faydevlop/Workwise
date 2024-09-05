import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/Screenshot 2024-08-04 184513.png';
import { logout } from "../../features/employeeAuth";
import { useDispatch } from "react-redux";
import { persistor } from "../../app/store";

export default function EmployeeSidebar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  // Ref to the sidebar element
  const sidebarRef = useRef(null);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsSideNavOpen(!isSideNavOpen);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('[aria-label="Side navigation"]')) {
        setIsSideNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogOut = () =>{
   
    persistor.purge();
    dispatch(logout())
  }

  return (
    <>
      {/* Mobile trigger */}
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

      {/* Side Navigation */}
      <aside
        id="nav-menu-2"
        aria-label="Side navigation"
        ref={sidebarRef}
        className={`fixed bg-white top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r bg-background px-4 py-6 transition-transform lg:translate-x-0 ${isSideNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <a
          aria-label="WorkWise logo"
          className="flex items-center gap-2 p-6 text-xl font-bold focus:outline-none"
        >
          <img
            src={logo}
            className="w-10 h-10 rounded-full"
            alt="WorkWise logo"
          />
          WorkWise
        </a>
        <nav className="mt-8 flex flex-col gap-4">
          <Link to='/employee/dashboard'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/dashboard' ? 'bg-muted text-foreground' : ''}`}
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
          <Link to='/employee/tasks'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/tasks' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
              </svg>
              Tasks
            </a>
          </Link>
          <Link to='/employee/meetings'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/chat' ? 'bg-muted text-foreground' : ''}`}
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
              Meetings
            </a>
          </Link>
          <Link to='/employee/payroll'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/chat' ? 'bg-muted text-foreground' : ''}`}
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
        <line x1="12" x2="12" y1="2" y2="22"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
              Payroll Managment
            </a>
          </Link>
          <Link to='/employee/leave'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/leave' ? 'bg-muted text-foreground' : ''}`}
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
          <Link to='/employee/profile'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/profile' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Profile
            </a>
          </Link>
          
          <Link to='/employee/chat'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/chat' ? 'bg-muted text-foreground' : ''}`}
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
          <Link to='/employee/jobs'>
            <a
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${currentPath === '/employee/chat' ? 'bg-muted text-foreground' : ''}`}
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
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
              </svg>
              job Openings
            </a>
          </Link>
        </nav>
        <button
  className="mt-auto flex items-center gap-3 rounded-md px-3 py-2 text-red-600 hover:bg-red-100"
  onClick={handleLogOut} // This function will handle the logout logic
>
  
  Logout
</button>
      </aside>
      
    </>
  );
}
