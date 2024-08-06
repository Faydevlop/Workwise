import React from 'react'
import AdminSidebar from '../../components/Sidebar/AdminSidebar'
import AddUserForm from '../../components/forms/AddUserForm';

const AddUser = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <div className="hidden lg:block" style={{ width: '250px' }}>
     <AdminSidebar/>
     </div>
      <div className="lg:hidden">
     {/* You can create a mobile version of the sidebar or a toggle button to show/hide it */}
     <AdminSidebar />
   </div>

     <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
              
       {/* section 1 */}
       <AddUserForm/>
       </div>
       
    
     
 
 </div>
  )
}

export default AddUser;
