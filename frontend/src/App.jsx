import React, { useState } from 'react';
import LoginScreen from './components/screens/LoginScreen';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/screens/Dashboard';
import { SignupScreen } from './components/screens/SignUpScreen';
export default function App() {



  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router> 
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" element={<SignupScreen />} />

      </Routes>
    </Router>
  );
}
