import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import './ServiceCard.css'

function ServiceCard({ service }) {
  const { t } = useTranslation()
  
  return (
    <div className="service-card">
      <div className="service-image">
        <img src={service.image} alt={service.title} />
        <span className="service-category">{service.category}</span>
      </div>
      <div className="service-content">
        <h3 className="service-title">{service.title}</h3>
        <div className="provider-info">
          <span className="provider-name">{service.provider.name}</span>
        </div>
        <div className="service-location">
          <FaMapMarkerAlt />
          <span>{service.location}</span>
        </div>
        {service.rating && (
          <div className="service-rating">
            <FaStar className="rating-star" />
            <span>{service.rating}</span>
            <span className="rating-count">({service.reviewCount})</span>
          </div>
        )}
        <div className="service-actions">
          <Link to={`/service/${service.id}`} className="view-details-btn">
            {t('common.viewDetails')}
          </Link>
          <Link to={`/service/${service.id}`} className="book-now-btn">
            {t('common.bookNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard