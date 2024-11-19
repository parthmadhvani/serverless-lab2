import React, { useState } from 'react'; // Import necessary React hooks and libraries
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation between routes
import axios from 'axios'; // Import axios for making API requests

function Login() {
  // Initialize state variables for username, password, error message, and navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook to redirect users after successful login

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page on submit
    
    try {
      // Make a POST request to your API with the username and password
      const response = await axios.post('https://us-central1-folkloric-clock-425119-c6.cloudfunctions.net/login', {
        username,
        password
      });

      console.log('API response:', response); // Log the API response for debugging

      // Check if login was successful
      if (response.status === 200 && response.data.message === 'Login successful') {
        navigate('/dashboard'); // Navigate to the dashboard on successful login
      } else {
        setError('Invalid username or password'); // Set error message if login failed
      }
    } catch (error) {
      console.error('Error:', error); // Log error to the console
      setError('An error occurred during login. Please try again.'); // Set error message for network/API issues
    }
  };

  // Function to redirect user to the signup page
  const handleRedirectToSignUp = () => {
    navigate('/signup'); // Navigate to the signup page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Login form */}
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {/* Display error message if there's any */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        {/* Username input field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state when input changes
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your username" 
            required // Input validation: required field
          />
        </div>
        
        {/* Password input field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state when input changes
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your password" 
            required // Input validation: required field
          />
        </div>
        
        {/* Submit button for login */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
        
        {/* Redirect link to the signup page */}
        <p className="mt-4 text-center">
          Don't have an account? 
          <button 
            onClick={handleRedirectToSignUp} // Handle redirect to sign-up on button click
            className="text-blue-500 hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;