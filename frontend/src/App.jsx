import RoomsPage from './pages/RoomsPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage.jsx'
import EditRoomsPage from './pages/EditRoomsPage.jsx'
import AddRoomsPage from './pages/AddRoomsPage.jsx'
import RoomDetailsPage from './pages/RoomDetailsPage.jsx'
import ManageBookingsPage from './pages/ManageBookingsPage.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/EditRooms/:id" element={<EditRoomsPage />} />
            <Route path="/AddRooms" element={<AddRoomsPage />} />
            <Route path="/RoomDetails/:id" element={<RoomDetailsPage />} />
            <Route path="/ManageBookings" element={<ManageBookingsPage />} />
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