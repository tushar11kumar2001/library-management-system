import React from 'react'
import Header from '../component/Header'
import { Outlet } from 'react-router-dom'

const AdminDashBoard = () => {
  
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  )
}

export default AdminDashBoard
