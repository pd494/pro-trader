import React, { useState } from 'react';
import LoginScreen from './components/screens/LoginScreen';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router> 
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
