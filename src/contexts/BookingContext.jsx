import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const BookingContext = createContext()

export function useBooking() {
  return useContext(BookingContext)
}

export function BookingProvider({ children }) {
  const [currentBooking, setCurrentBooking] = useState(null)
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // Load bookings from localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      const savedBookings = localStorage.getItem(`bookings_${currentUser.id}`)
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings))
      }
    } else {
      setBookings([])
    }
  }, [currentUser])

  const startBooking = (service) => {
    setCurrentBooking({
      service,
      date: null,
      time: null,
      totalPrice: service.price,
      status: 'pending'
    })
    navigate(`/booking/${service.id}`)
  }

  const updateBookingDetails = (details) => {
    setCurrentBooking(prev => ({
      ...prev,
      ...details
    }))
  }

  const confirmBooking = async () => {
    setIsLoading(true)
    
    try {
      if (!currentUser || !currentBooking) {
        throw new Error('User or booking details missing')
      }
      
      // Mock API call - would be replaced with actual API
      const newBooking = {
        ...currentBooking,
        id: `booking_${Date.now()}`,
        userId: currentUser.id,
        status: 'booked',
        bookedAt: new Date().toISOString()
      }
      
      // Save to localStorage (temporary storage)
      const updatedBookings = [...bookings, newBooking]
      localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(updatedBookings))
      
      setBookings(updatedBookings)
      
      return { success: true, booking: newBooking }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      // Find the booking to cancel
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      )
      
      localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(updatedBookings))
      setBookings(updatedBookings)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const completeBooking = async (bookingId) => {
    try {
      const updatedBookings = bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'completed' } 
          : booking
      )
      
      localStorage.setItem(`bookings_${currentUser.id}`, JSON.stringify(updatedBookings))
      setBookings(updatedBookings)
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const clearCurrentBooking = () => {
    setCurrentBooking(null)
  }

  const value = {
    currentBooking,
    bookings,
    isLoading,
    startBooking,
    updateBookingDetails,
    confirmBooking,
    cancelBooking,
    completeBooking,
    clearCurrentBooking
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}