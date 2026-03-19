import './App.css'
import Rooms from './pages/Rooms'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingForm from './pages/BookingForm'
import EditRooms from './pages/EditRooms'
import AddRooms from './pages/addRooms'
import RoomDetails from './pages/RoomDetails'

const App = () => {

  return (
    <>
      <header>
        <h1>
          <img src="transparent-logo.png" alt="logo" style={{ width: "70px", height: "80px" }} />
          StayNest
        </h1>
      </header>

      <main>
        <p>Smart Room Availability & Rent Booking Platform</p>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Rooms />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/EditRooms/:id" element={<EditRooms />} />
            <Route path="/AddRooms" element={<AddRooms />}/>
            <Route path="/RoomDetails/:id" element={<RoomDetails />}/>
          </Routes>
        </BrowserRouter>

      </main>

      <footer>
        <p>© 2026 StayNest. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App