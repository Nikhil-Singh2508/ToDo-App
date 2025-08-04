import { lazy, useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import MainContent from './components/MainContent'
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <MainContent/>
          </ProtectedRoute>
        }/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
