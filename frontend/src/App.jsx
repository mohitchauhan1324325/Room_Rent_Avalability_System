import RoomsPage from './pages/RoomsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage'
import EditRoomsPage from './pages/EditRoomsPage'
import AddRoomsPage from './pages/AddRoomsPage'
import RoomDetailsPage from './pages/RoomDetailsPage'
import ManageBookingsPage from './pages/ManageBookingsPage'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import UserBookingPage from './pages/UserBookingPage'
import AdminPanelPage from './pages/AdminPanelPage'
import OwnerRoomsPage from './pages/OwnerRoomsPage'
import FavoriteRoomPage from './pages/FavoriteRoomPage'

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
                <ProtectedRoute allowedRoles={["user"]}>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
            path="/favorite"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <FavoriteRoomPage />
              </ProtectedRoute>
            }
            />
            
            <Route
              path="/AddRooms"
              element={
                <ProtectedRoute allowedRoles={["owner", "admin"]}>
                  <AddRoomsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/EditRooms/:id"
              element={
                <ProtectedRoute allowedRoles={["owner", "admin"]}>
                  <EditRoomsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/UserBooking"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <UserBookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ManageBookings"
              element={
                <ProtectedRoute allowedRoles={["admin", "owner"]}>
                  <ManageBookingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanelPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-rooms"
              element={
                <ProtectedRoute allowedRoles={["owner"]}>
                  <OwnerRoomsPage />
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