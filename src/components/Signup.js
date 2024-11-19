import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making API requests

const SignUp = () => {
  // State variables for username, password, and feedback message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission for signup
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Create a request body to send to the API
    const requestBody = {
      username,
      password,
    };

    try {

      console.log(requestBody);
    
      const response = await axios.post(
        'https://us-central1-folkloric-clock-425119-c6.cloudfunctions.net/signup',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);
    
      // Check if the response is successful
      if (response.status === 201) {        
        setMessage(response.data.message); // Set the success message in the state
      } else {
        // Handle non-200 response statuses
        const responseBody = JSON.parse(response.data.body);
        setMessage('Error: ' + (responseBody.message || 'Something went wrong.')); // Set error message
      }
    } catch (error) {
      // Handle network or server errors
      if (error.response && error.response.data) {
        setMessage('Error: ' + error.response.data.error); // Display API-specific error
      } else {
        setMessage('Error signing up. Please try again.'); // General error message
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {/* Sign-up form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Username input field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state when input changes
              required // Make the input field required
            />
          </div>
          {/* Password input field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state when input changes
              required // Make the input field required
            />
          </div>
          {/* Submit button for signing up */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 py-2"
          >
            Sign Up
          </button>
        </form>
        {/* Display message if there's a success or error */}
        {message && (
          <p className="mt-4 text-center text-red-500">{message}</p>
        )}
        {/* Link to log in if the user already has an account */}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;