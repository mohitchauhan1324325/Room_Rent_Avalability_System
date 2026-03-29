import './App.css'
import Rooms from './pages/Rooms'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingForm from './pages/BookingForm'
import EditRooms from './pages/EditRooms'
import AddRooms from './pages/addRooms'
import RoomDetails from './pages/RoomDetails'
import ManageBookings from './pages/ManageBookings'
import Layout from './components/Layout'
import Home from './pages/Home'

const App = () => {

  return (
    <>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/booking" element={<BookingForm />} />
              <Route path="/EditRooms/:id" element={<EditRooms />} />
              <Route path="/AddRooms" element={<AddRooms />} />
              <Route path="/RoomDetails/:id" element={<RoomDetails />} />
              <Route path="/ManageBookings" element={<ManageBookings />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </>
  )
}

export default App