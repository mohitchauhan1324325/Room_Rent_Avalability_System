import RoomsPage from './pages/RoomsPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage.jsx'
import EditRoomsPage from './pages/EditRoomsPage.jsx'
import AddRoomsPage from './pages/AddRoomsPage.jsx'
import RoomDetailsPage from './pages/RoomDetailsPage.jsx'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserBookingPage from './pages/UserBookingPage.jsx'
import AdminPanelPage from './pages/AdminPanelPage.jsx'
import OwnerRoomsPage from './pages/OwnerRoomsPage.jsx'
import FavoriteRoomPage from './pages/FavoriteRoomPage.jsx'
import { useContext } from 'react'
import { AppContext } from './context/AppContext.jsx';
import OwnerBookingsPage from './pages/OwnerBookingPage.jsx'

const App = () => {
  const { darkMode } = useContext(AppContext);
  return (
    <div className={darkMode ? "dark" : ""}>

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
              path="/owner/bookings"
              element={
                <ProtectedRoute allowedRoles={["owner", "admin"]}>
                  <OwnerBookingsPage />
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

    </div>
  )
}

export default App;