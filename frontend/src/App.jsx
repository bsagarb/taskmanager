import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div>
     <Header/>
     <main className="container">
        <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </main>
     <ToastContainer position="top-center" autoClose={2000} />
    </div>
  )
}

export default App
