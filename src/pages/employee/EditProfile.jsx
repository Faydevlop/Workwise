import React, { useEffect, useState } from 'react';
import EmployeeSidebar from '../../components/Sidebar/EmployeeSidebar';
import { useNavigate, useParams } from 'react-router-dom';

// new code 4
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ScaleLoader } from 'react-spinners';
import axiosInstance from '../../config/axiosConfig';


const EditProfile = () => {
    const [loading, setLoading] = useState(true);

    const { userId } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
    const [emailError, setEmailError] = useState('');
    const [otpError, setOtpError] = useState(false); // Tracks whether there's an OTP error
    const [errorMessage, setErrorMessage] = useState(''); 
    
    // Modal state for handling email change
    const [openModal, setOpenModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newOtp,setNewOtp] = useState('')
    const [isbtn,setIsbtn] = useState(false)
    const [btnload,setBtnload] = useState(false)

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get(`/admin/getuser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const user = response.data;
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setDob(user.dob);
            setPhone(user.phone);
            setGender(user.gender);
            setAddress(user.address);
            setProfilePhotoPreview(user.profileImageUrl || ''); // Assuming URL is returned for current photo
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        
        fetchUser();
    }, [userId]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setProfilePhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
      
        formData.append('dob', dob);
        formData.append('phone', phone);
        formData.append('gender', gender);
        formData.append('address', address);
        if (profilePhoto) {
            formData.append('profilePhoto', profilePhoto);
        }

        try {
            await axiosInstance.put(`/employee/editprofile/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            toast.success('User updated successfully', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => navigate('/employee/profile')
            });
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        } finally {
            setLoading(false);
        }
    };

    // new code 3

    const handleChangeEmail = (e) => {
        e.preventDefault();
        setOpenModal(true); // Trigger modal open
    };

    const handleModalClose = () => {
        setOpenModal(false); // Close modal'
        setIsbtn(false)
    };

    const handleEmailSubmit = async() => {
        console.log("New Email:", newEmail);
        console.log("OTP:", otp);
        console.log('new Otp',newOtp);

        if (otp !== newOtp) {
            setOtpError(true); // Set error to true if OTP does not match
            setErrorMessage('Invalid OTP. Please try again.');
        } else {
            setOtpError(false); // Clear error if OTP is correct
            setErrorMessage('');

            const response = await axiosInstance.post(`/employee/updateEmail/${userId}`,{newEmail:newEmail})
            try {
                toast.success('Email updated successfully', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                   
                });
                fetchUser()
                setOtp('')
                setNewEmail('')
                setNewOtp('')

                
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(`Error: ${error.response.data.message}`); // Show the message from the backend
                } else {
                    toast.error('An error occurred while updating the email.'); // Fallback message
                }
            }
            
            // Proceed with email update logic
            console.log('OTP verified. Email will be updated.');
            setOpenModal(false);
        }


        
      
    };

    const handleSendOtp = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!newEmail || !emailRegex.test(newEmail)) {
            // If the email is empty or invalid, set the error message
            setEmailError('Please enter a valid email address.');
        } else {
            // Clear the error message if the email is valid
            setEmailError('');
            setBtnload(true);
    
            try {
                // Make the request inside the try block
                const response = await axiosInstance.post(`/employee/resetEmail/${userId}`, { newEmail });
                setNewOtp(response.data.otp);
    
                // Show success toast
                toast.success('OTP delivered successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } catch (error) {
                // Handle errors from the server
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(`Error: ${error.response.data.message}`);
                } else {
                    toast.error('An error occurred while updating the email.');
                }
            } finally {
                setBtnload(false);
                setIsbtn(true);
            }
        }
    };
    

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div className="hidden lg:block" style={{ width: '250px' }}>
                <EmployeeSidebar />
            </div>
            <div className="lg:hidden">
                <EmployeeSidebar />
            </div>

            <div style={{ flex: 1, padding: '20px', overflow: 'auto', marginLeft: '0' }}>
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-md">
                    <ToastContainer />
                    <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                    <hr />
                    <form >
                        {/* Profile Photo Section */}
                        <div className="mb-8 flex items-center">
                            <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
                                <img
                                    src={profilePhotoPreview || 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="mt-1 block w-full"
                                />
                            </div>
                        </div>

                        {/* Personal Details Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                    />
                                </div>
                                {/* new code 5 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="flex items-center mt-1">
                                        <input
                                            type="email"
                                            className="block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="john.doe@example.com"
                                        />
                                        {/* new code 2 */}
                                        <button
                                            className="ml-2 px-3 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                            onClick={(e) => handleChangeEmail(e)}
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={dob ? new Date(dob).toISOString().split('T')[0] : ''}
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="123 Main St, Springfield"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        {/* Email Change Modal */}
        {/* new code 1 */}
<Dialog open={openModal} onClose={handleModalClose}>
    <DialogTitle>Change Email</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Please enter your new email address and the OTP sent to your email for verification.
        </DialogContentText>

        {/* Email Input and Send OTP Button in the same line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
                autoFocus
                margin="dense"
                label="New Email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                fullWidth
                style={{ flexGrow: 1 }} 
                error={!!emailError}
                helperText={emailError} 
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendOtp} // Function to send OTP
                
            >
                  {btnload ? (
                <ScaleLoader
                color="#ffffff" // Adjust the spinner color
                height={35}     // Adjust the height
                width={4}       // Adjust the width
                radius={2}      // Adjust the radius
                margin={2}      // Adjust the margin between spinners
              />
            ) : 'Send OTP'}
                
            </Button>
        </div>

        {/* OTP Input */}
        <TextField
            margin="dense"
            label="OTP"
            type="text"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={otpError} // This will highlight the input field if there's an error
    helperText={otpError ? errorMessage : ''} 
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleModalClose} color="primary">
            Cancel
        </Button>
        {
            isbtn && ( <Button onClick={handleEmailSubmit} color="primary">
                Submit
            </Button>)
        }
       
    </DialogActions>
</Dialog>


            {loading && (
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
        </div>
    );
};

export default EditProfile;
