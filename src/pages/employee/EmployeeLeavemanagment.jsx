import React from 'react'
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar'

const EmployeeLeavemanagment = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <EmployeeSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <EmployeeSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
          {/* section 1 */}
         

        </div>
        
    
    </div>
   
  )
}

export default EmployeeLeavemanagment
