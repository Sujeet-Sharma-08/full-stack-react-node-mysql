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

            <div className='flex-1 p-2 bg-white'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashBoard