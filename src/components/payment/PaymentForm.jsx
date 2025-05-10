import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../../contexts/BookingContext'
import { FaLock, FaCreditCard } from 'react-icons/fa'
import './PaymentForm.css'

function PaymentForm() {
  const { t } = useTranslation()
  const { currentBooking, confirmBooking, clearCurrentBooking } = useBooking()
  const navigate = useNavigate()
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState({})
  
  // If no booking in progress, redirect to home
  if (!currentBooking || !currentBooking.service) {
    navigate('/')
    return null
  }
  
  const { service, formattedDate, time, totalPrice = service.price } = currentBooking
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardDetails({
      ...cardDetails,
      [name]: value
    })
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }
    
    if (!cardDetails.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required'
    }
    
    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Expiry date format must be MM/YY'
    }
    
    if (!cardDetails.cvv.trim()) {
      newErrors.cvv = 'CVV is required'
    } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsProcessing(true)
      
      try {
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Process booking
        const result = await confirmBooking()
        
        if (result.success) {
          // Clear current booking
          clearCurrentBooking()
          
          // Navigate to bookings page with success message
          navigate('/bookings', { 
            state: { 
              success: true, 
              message: t('booking.bookingSuccess'),
              details: t('booking.bookingConfirmed') 
            } 
          })
        } else {
          setErrors({ 
            form: result.error || t('payment.paymentError')
          })
        }
      } catch (error) {
        setErrors({ 
          form: error.message || t('payment.paymentError') 
        })
      } finally {
        setIsProcessing(false)
      }
    }
  }
  
  // Calculate prices
  const tax = parseFloat((totalPrice * 0.10).toFixed(2))
  const grandTotal = parseFloat((totalPrice + tax).toFixed(2))
  
  return (
    <div className="payment-form-container">
      <div className="payment-form">
        <h2 className="payment-title">{t('payment.paymentMethod')}</h2>
        
        {errors.form && (
          <div className="error-banner">
            {errors.form}
          </div>
        )}
        
        <div className="payment-summary">
          <h3>{t('booking.summary')}</h3>
          <div className="summary-item">
            <span className="summary-label">Service:</span>
            <span className="summary-value">{service.title}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Date:</span>
            <span className="summary-value">{formattedDate}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Time:</span>
            <span className="summary-value">{time}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-item">
            <span className="summary-label">{t('booking.total')}:</span>
            <span className="summary-value">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">{t('booking.tax')} (10%):</span>
            <span className="summary-value">${tax.toFixed(2)}</span>
          </div>
          <div className="summary-item total">
            <span className="summary-label">{t('booking.grandTotal')}:</span>
            <span className="summary-value">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="card-form">
          <h3>{t('payment.cardDetails')}</h3>
          
          <div className="form-group">
            <label htmlFor="cardNumber">{t('payment.cardNumber')}</label>
            <div className="input-with-icon">
              <FaCreditCard className="input-icon" />
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
              />
            </div>
            {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="cardName">{t('payment.cardName')}</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className="form-control"
              placeholder="John Doe"
              value={cardDetails.cardName}
              onChange={handleInputChange}
            />
            {errors.cardName && <p className="error-message">{errors.cardName}</p>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">{t('payment.expiryDate')}</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="form-control"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
              />
              {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">{t('payment.cvv')}</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className="form-control"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                maxLength="4"
              />
              {errors.cvv && <p className="error-message">{errors.cvv}</p>}
            </div>
          </div>
          
          <div className="secure-payment">
            <FaLock /> <span>Secure payment powered by Stripe</span>
          </div>
          
          <button 
            type="submit" 
            className="btn-payment"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="processing">
                <span className="spinner"></span>
                {t('payment.paymentProcessing')}
              </span>
            ) : (
              `${t('payment.pay')} $${grandTotal.toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm