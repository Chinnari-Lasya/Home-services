import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ServiceDetails from './pages/ServiceDetails'
import BookingPage from './pages/BookingPage'
import PaymentPage from './pages/PaymentPage'
import ProfilePage from './pages/ProfilePage'
import MyBookings from './pages/MyBookings'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/common/PrivateRoute'
import { useAuth } from './contexts/AuthContext'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const { i18n } = useTranslation()
  const { isLoading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="app" dir={i18n.dir()}>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/booking/:serviceId" 
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App