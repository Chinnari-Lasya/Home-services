import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'
import './ReviewForm.css'

function ReviewForm({ serviceId, onSubmitReview }) {
  const { t } = useTranslation()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [hoveredRating, setHoveredRating] = useState(0)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating)
  }
  
  const handleRatingHover = (hoveredValue) => {
    setHoveredRating(hoveredValue)
  }
  
  const handleRatingLeave = () => {
    setHoveredRating(0)
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating'
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Please enter a comment'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      try {
        // Mock API call for submitting review
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const reviewData = {
          serviceId,
          rating,
          comment,
          date: new Date().toISOString(),
          id: `review_${Date.now()}`
        }
        
        if (typeof onSubmitReview === 'function') {
          onSubmitReview(reviewData)
        }
        
        // Reset form
        setRating(0)
        setComment('')
        setSubmitSuccess(true)
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 3000)
      } catch (error) {
        setErrors({ form: t('reviews.reviewError') })
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  return (
    <div className="review-form">
      <h3 className="review-form-title">{t('reviews.writeReview')}</h3>
      
      {submitSuccess && (
        <div className="success-message">
          {t('reviews.reviewSuccess')}
        </div>
      )}
      
      {errors.form && (
        <div className="error-message">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('reviews.rating')}</label>
          <div 
            className="star-rating"
            onMouseLeave={handleRatingLeave}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`star ${(hoveredRating || rating) >= star ? 'filled' : ''}`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
              />
            ))}
          </div>
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">{t('reviews.comment')}</label>
          <textarea
            id="comment"
            className="form-control"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {errors.comment && <p className="error-message">{errors.comment}</p>}
        </div>
        
        <button 
          type="submit" 
          className="submit-review-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="spinner-text">
              <span className="spinner"></span>
              Submitting...
            </span>
          ) : (
            t('reviews.submit')
          )}
        </button>
      </form>
    </div>
  )
}

export default ReviewForm