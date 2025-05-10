import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../contexts/BookingContext'
import { useAuth } from '../../contexts/AuthContext'
import DateTimePicker from './DateTimePicker'
import './BookingForm.css'

function BookingForm({ service }) {
  const { t } = useTranslation()
  const { currentUser } = useAuth()
  const { updateBookingDetails } = useBooking()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    instructions: ''
  })
  
  const [dateTime, setDateTime] = useState(null)
  const [errors, setErrors] = useState({})
  const [formStep, setFormStep] = useState(1)
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleDateTimeSelect = (selectedDateTime) => {
    setDateTime(selectedDateTime)
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (formStep === 1) {
      if (!dateTime) {
        newErrors.dateTime = 'Please select a date and time'
      }
    } else if (formStep === 2) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      }
      
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleContinue = () => {
    if (validateForm()) {
      if (formStep === 1) {
        setFormStep(2)
      } else if (formStep === 2) {
        // Prepare booking details
        const bookingDetails = {
          ...formData,
          date: dateTime,
          time: dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          formattedDate: dateTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })
        }
        
        // Update booking context
        updateBookingDetails(bookingDetails)
        
        // Navigate to payment
        navigate('/payment')
      }
    }
  }

  const handleBack = () => {
    if (formStep === 2) {
      setFormStep(1)
    }
  }
  
  return (
    <div className="booking-form">
      <h2 className="booking-form-title">{t('booking.bookService')}</h2>
      
      {formStep === 1 && (
        <div className="booking-step date-time-step">
          <DateTimePicker 
            onSelectDateTime={handleDateTimeSelect}
            initialDate={dateTime}
          />
          {errors.dateTime && <p className="error-message">{errors.dateTime}</p>}
        </div>
      )}
      
      {formStep === 2 && (
        <div className="booking-step details-step">
          <h3>{t('booking.yourDetails')}</h3>
          
          <div className="form-group">
            <label htmlFor="fullName">{t('booking.fullName')}</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{t('booking.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">{t('booking.phone')}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">{t('booking.address')}</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="instructions">{t('booking.instructions')}</label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-control"
              rows="3"
              value={formData.instructions}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      )}
      
      <div className="booking-actions">
        {formStep === 2 && (
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleBack}
          >
            Back
          </button>
        )}
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={handleContinue}
        >
          {formStep === 1 ? t('booking.continue') : t('booking.proceedToPayment')}
        </button>
      </div>
    </div>
  )
}

export default BookingForm