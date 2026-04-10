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
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/RoomDetails/:id" element={<RoomDetailsPage />} />

            {/* Protected Routes */}
            <Route 
              path="/booking" 
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/AddRooms" 
              element={
                <ProtectedRoute>
                  <AddRoomsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/EditRooms/:id" 
              element={
                <ProtectedRoute>
                  <EditRoomsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/ManageBookings" 
              element={
                <ProtectedRoute>
                  <ManageBookingsPage />
                </ProtectedRoute>
              } 
            />

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

export default App;