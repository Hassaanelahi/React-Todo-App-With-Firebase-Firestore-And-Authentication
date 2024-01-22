import React from 'react'
import './App.css'
import Login from "./Pages/Login"
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import { Route, Routes } from 'react-router-dom'
import AuthRoutes from './Routes/AuthRoutes'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        {/* <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route element={<AuthRoutes />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>


      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
        />
    </>
  )
}

export default App
