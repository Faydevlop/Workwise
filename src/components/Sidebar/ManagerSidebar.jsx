import React, { useState } from "react"
import { useLocation,Link } from 'react-router-dom';
import logo from '../../assets/Screenshot 2024-08-04 184513.png'



export default function ManagerSidebar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const path = useLocation()
  console.log(path.pathname);
  const location = useLocation();
  const currentPath = location.pathname;
  

  return (
    <>
      {/*  <!-- Component: Basic side navigation menu --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? " true" : "false"}
        aria-controls="nav-menu-1"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-65 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <a
  aria-label="WorkWise logo"
  className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
  href="javascript:void(0)"
>
  <img
    src={logo}
    className="w-10 h-10 rounded-full"
    alt="WorkWise logo"
  />
  WorkWise
</a>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">

            <Link to={'/manager/dashboard'}>
            <li className="px-3">
              
            <a
             
              
             className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
              currentPath === '/manager/dashboard' ? 'bg-blue-200 text-emerald-500' : ''
            }`}
            >
              
              <div className="flex items-center self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6 w-6"
                  aria-label="Dashboard icon"
                  role="graphics-symbol"
                >
                  <path d="M280.4 148.3L96 300.1V464a16 16 0 0 0 16 16l112.1-.3a16 16 0 0 0 15.9-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.6a16 16 0 0 0 16 16.1L464 480a16 16 0 0 0 16-16V300L295.7 148.3a12.2 12.2 0 0 0 -15.3 0zM571.6 251.5L488 182.6V44.1a12 12 0 0 0 -12-12h-56a12 12 0 0 0 -12 12v72.6L318.5 43a48 48 0 0 0 -61 0L4.3 251.5a12 12 0 0 0 -1.6 16.9l25.5 31A12 12 0 0 0 45.2 301l235.2-193.7a12.2 12.2 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0 -1.7-16.9z"/>
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                Dashboard
              </div>
            </a>
          </li>
          </Link>
          <Link to={'/manager/usermanagement'}>

              <li className="px-3">
              <a
              
              className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
                currentPath === '/manager/usermanagement' ? 'bg-blue-200 text-emerald-500' : ''
              }`}
            >
                  <div className="flex items-center self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-6 w-6"
                    >
                      <path d="M384 320H256c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zM192 32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32v128c0 17.7 14.3 32 32 32h95.7l73.2 128C212 301 232.4 288 256 288h.3L192 175.5V128h224V64H192V32zM608 0H480c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32z"/>
                    </svg>
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    User management
                  </div>
                </a>
              </li>
              </Link>
              <Link to={'/manager/leavemanagement'}>
              <li className="px-3">
              <a
            
            className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
              currentPath === '/manager/leavemanagement' ? 'bg-blue-200 text-emerald-500' : ''
            }`}
            >
                <div className="flex items-center self-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="h-6 w-6"
                    aria-label="Leave Management icon"
                    role="graphics-symbol"
                  >
                    <path d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384h384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2 .1l41.3 41.6 95.2-94.4c4.2-4.2 11-4.2 15.2 .1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2z"/>
                  </svg>    
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                 Leave Management
                </div>
              </a>
            </li>
            </Link>
            <Link to={'/manager/tasksmanagement'}>
            <li className="px-3">
            <a
             
             className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
              currentPath === '/manager/tasksmanagement' ? 'bg-blue-200 text-emerald-500' : ''
            }`}
            >
              <div className="flex items-center self-center">
              <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      className="h-6 w-6"
                    >
                      <path d="M384 320H256c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32zM192 32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32v128c0 17.7 14.3 32 32 32h95.7l73.2 128C212 301 232.4 288 256 288h.3L192 175.5V128h224V64H192V32zM608 0H480c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32z"/>
                    </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                task Management
              </div>
            </a>
          </li>
          </Link>
          <Link to={'/manager/meetings'}>
              <li className="px-3">
              <a
             
             className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
              currentPath === '/manager/meetings' ? 'bg-blue-200 text-emerald-500' : ''
            }`}
            >
                <div className="flex items-center self-center">
                 
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Department Management icon"
                    role="graphics-symbol"
                    viewBox="0 0 448 512"
                    className="h-6 w-6"
                  >
                    <path d="M436 480h-20V24c0-13.3-10.7-24-24-24H56C42.7 0 32 10.7 32 24v456H12c-6.6 0-12 5.4-12 12v20h448v-20c0-6.6-5.4-12-12-12zM128 76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76zm0 96c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm52 148h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm76 160h-64v-84c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84zm64-172c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"/>
                  </svg>
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                Meeting Schedules
                                </div>
              </a>
              </li>
              </Link>



          

              

              

            
          
              <Link to={'/manager/profile'}>

              <li className="px-3">
              <a
             
             className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
              currentPath === '/manager/profile' ? 'bg-blue-200 text-emerald-500' : ''
            }`}
            >
                <div className="flex items-center self-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    className="h-6 w-6"
                    aria-label="Profile icon"
                    role="graphics-symbol"
                  >
                    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8 .4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/>
                  </svg>
                </div>
                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                  Profile
                </div>
                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2 text-xs text-emerald-500">
                  <span className="sr-only">new notifications</span>
                </span>
              </a>
            </li>
            </Link>

            <Link to={'/manager/chat'}>

            <li className="px-3">
            <a
              
              className={`flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-blue-200  focus:bg-emerald-50 ${
                currentPath === '/manager/chat' ? 'bg-blue-200 text-emerald-500' : ''
              }`}
            >
              <div className="flex items-center self-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-6 w-6"
                  aria-label="Chat icon"
                  role="graphics-symbol"
                >
                  <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
                </svg>
              </div>
              <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                Chat
              </div>
            </a>
          </li>
          </Link>

            </ul>
          </div>
        </nav>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Basic side navigation menu --> */}
    </>
  )
}