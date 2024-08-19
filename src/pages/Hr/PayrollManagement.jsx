import React from 'react'
import HrSidebar from '../../components/Sidebar/HrSidebar'

const PayrollManagement = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
       <div className="hidden lg:block" style={{ width: '250px' }}>
        <HrSidebar/>
        </div>
         <div className="lg:hidden">
        {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
        <HrSidebar />
      </div>

        <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                 
         

        </div>
        
    
    </div>
   
  )
}

export default PayrollManagement
