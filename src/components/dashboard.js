import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to fetch reminders from the API
  const fetchReminders = async () => {
    try {
      const response = await axios.get('https://us-central1-folkloric-clock-425119-c6.cloudfunctions.net/getReminder');
      console.log('API Response:', response.data);

      // const parsedBody = JSON.parse(response.data.body); // Properly parse the JSON body
      if (response.data.reminders) {
        setReminders(response.data.reminders);
      } else {
        setReminders([]); // Set to an empty array if no reminders are found
      }
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  // Fetch reminders when the component mounts
  useEffect(() => {
    fetchReminders();
  }, []);

  // Handle form submission for creating a reminder
  const handleCreateReminder = async (e) => {
    e.preventDefault();

    // Construct the request body
    const requestBody = {
      reminderText,
      dueDate,
      photoBase64, // Send base64 encoded image data
    };

    try {
      const response = await axios.post('https://us-central1-folkloric-clock-425119-c6.cloudfunctions.net/createReminder', requestBody);
      if (response.status === 201) {
        setMessage('Reminder created successfully!');
        setReminderText('');
        setDueDate('');
        setPhotoBase64('');
        // Re-fetch reminders after creating a new one
        await fetchReminders();
      }
    } catch (error) {
      setMessage('Error creating reminder. Please try again.');
      console.error('Error creating reminder:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Remove metadata and store only base64 string
      const base64String = reader.result.split(',')[1];
      setPhotoBase64(base64String);
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file as data URL
    }
  };

  // Handle logout action
  const handleLogout = () => {
    // Implement logout logic here if needed, e.g., clear tokens
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <div className="p-4 flex-grow">
        <form onSubmit={handleCreateReminder} className="mb-4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Add Reminder</h2>

          <input 
            type="text" 
            placeholder="Reminder Text" 
            value={reminderText} 
            onChange={(e) => setReminderText(e.target.value)} 
            required 
            className="w-full p-2 border rounded mb-2"
          />
          
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required 
            placeholder="Due date (yyyy-mm-dd)" 
            className="w-full p-2 border rounded mb-2"
          />

          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange} 
            className="mb-2"
          />

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Reminder
          </button>

          {message && <p className="mt-2 text-green-600">{message}</p>}
        </form>

        <ul className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Reminders</h2>

          {reminders.length > 0 ? (
            reminders.map((reminder) => (
              <li key={reminder.id} className="mb-2">
                <p className="font-bold">{reminder.reminderText}</p>
                <p>Due: {reminder.dueDate}</p>
                {reminder.photoKey && (
                  <img 
                    src={`https://storage.cloud.google.com/serverlesslab155/${reminder.photoKey}`} 
                    alt="Reminder" 
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
              </li>
            ))
          ) : (
            <p>No reminders available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;