import React from 'react'

import ManagerSidebar from '../../components/Sidebar/ManagerSidebar'

const Meetings = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <ManagerSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <ManagerSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}


        </div>
        
    
    </div>
   
  )
}

export default Meetings
