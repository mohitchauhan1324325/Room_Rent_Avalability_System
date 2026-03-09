import React from 'react'
import Navbar from '../components/Navbar'
import RoomsPage from './RoomsPage'
import Footer from '../components/Footer'
import "../styles/home.css"

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <RoomsPage />
      <Footer /> 
    </div>
  )
}

export default HomePage
