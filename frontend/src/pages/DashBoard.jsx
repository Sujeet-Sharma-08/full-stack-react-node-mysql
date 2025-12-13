import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
  return (
    <div>
        <div className='flex min-h-screen'>
            <div>
                <Sidebar/>
            </div>

            <div className='flex-1 p-6 bg-gray-50'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard