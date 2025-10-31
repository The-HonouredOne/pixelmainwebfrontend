import React from 'react'
import Adminnav from './AdminNav'
import { Outlet, useLocation } from 'react-router-dom'
import { BsFillBellFill } from 'react-icons/bs'

const AdminDashboard = () => {

  const location = useLocation()


  const path = location.pathname.split('/')
  const mainpath = path[2]
  const subpath = path[3]


  return (
    <div className='flex '>
      <Adminnav />

      <div className="flex-1 ">
        <div className="bg-blue-200 min-h-screen h-full">
          <div className=" flex justify-between text-3xl  px-12 py-10 items-center">
            <h1 className="font-bold">PixelGenix</h1>
            <p>
              <BsFillBellFill className="text-gray-500 cursor-pointer hover:text-gray-600" />
            </p>
          </div>
          <div className="border-b-2 border-gray-400"></div>

          <div className="px-10 pt-12 pb-1">
            <h1 className="text-2xl text-orange-600 font-medium flex gap-2 items-center">
              {mainpath || 'Dashboard'}
              {subpath && <span className='text-orange-500 '> / {subpath}</span>}
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard