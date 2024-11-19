import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing necessary components from react-router-dom
import './App.css'; // Importing the CSS file for styling
import Dashboard from './components/dashboard'; // Importing the Dashboard component
import Login from './components/Login'; // Importing the Login component
import SignUp from './components/Signup'; // Importing the Signup component

function App() {
  return (
    // Router provides the routing functionality for the application
    <Router>
      <div className="App">
        {/* Routes component is used to define all the routes in the app */}
        <Routes>
          {/* Route for the Dashboard page, accessible via "/dashboard" */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Route for the Login page, set as the default route "/" */}
          <Route path="/" element={<Login />} />
          
          {/* Route for the Signup page, accessible via "/signup" */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;