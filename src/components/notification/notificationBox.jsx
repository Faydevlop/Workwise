import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';
import { io } from 'socket.io-client';

const NotificationBox = ({ userId }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socket = useMemo(() => io('http://localhost:4000/'), []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications/getnotify/${userId}`);
      setNotifications(response.data.notifications);
      console.log('res',response.data);
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    socket.emit('register', userId);

    socket.on('newNotification', (notification) => {
        
      setNotifications((prevNotifications) => [notification, ...prevNotifications]); // Add new notification at the top
    });

    return () => {
        socket.off('newNotification');
        socket.disconnect();
    };
  }, [userId]);

  return (
    <div>
      {/* Notification Button */}
      <button
        onClick={toggleNotifications}
        className="fixed right-4 bottom-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        <FaBell />
      </button>

      {/* Notification Box */}
      {showNotifications && (
  <div className="absolute right-4 bottom-16 w-64 h-48 bg-white border border-gray-300 rounded-lg shadow-lg p-4 overflow-y-auto">
    <h3 className="text-lg font-semibold mb-2">Notifications</h3>
    <ul>
      {notifications.length > 0 ? (
        notifications
           // Create a copy of the array to avoid mutating the original one
          .reverse() // Reverse the copied array
          .map((notification, index) => (
            <li key={index} className="mb-2 bg-gray-100 p-1 border">
              {notification.message}
            </li>
          ))
      ) : (
        <li className="mb-2">No notifications available.</li>
      )}
    </ul>
  </div>
)}


    </div>
  );
};

export default NotificationBox;
