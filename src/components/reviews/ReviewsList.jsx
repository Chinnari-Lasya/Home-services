import { useTranslation } from 'react-i18next'
import { FaStar, FaUser } from 'react-icons/fa'
import './ReviewsList.css'

function ReviewsList({ reviews = [] }) {
  const { t } = useTranslation()

  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  // Format review date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <div className="reviewer-info">
              {review.userImage ? (
                <img 
                  src={review.userImage} 
                  alt={review.userName} 
                  className="reviewer-avatar" 
                />
              ) : (
                <div className="reviewer-avatar-placeholder">
                  <FaUser />
                </div>
              )}
              <div className="reviewer-details">
                <h4 className="reviewer-name">{review.userName}</h4>
                <span className="review-date">{formatDate(review.date)}</span>
              </div>
            </div>
            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={`star ${i < review.rating ? 'filled' : ''}`} 
                />
              ))}
            </div>
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewsList