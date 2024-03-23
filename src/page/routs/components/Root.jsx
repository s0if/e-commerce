import React from 'react'

import Footer from '../../../components/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../../../components/Navbar'

function Root() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Root
