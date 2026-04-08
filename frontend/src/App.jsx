import Rooms from './pages/Rooms.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingForm from './pages/BookingForm.jsx'
import EditRooms from './pages/EditRooms.jsx'
import AddRooms from './pages/AddRooms.jsx'
import RoomDetails from './pages/RoomDetails.jsx'
import ManageBookings from './pages/ManageBookings.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
        />
      </BrowserRouter>
    </>
  )
}

export default App