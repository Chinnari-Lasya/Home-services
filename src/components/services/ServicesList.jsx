import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ServiceCard from './ServiceCard'
import LoadingSpinner from '../common/LoadingSpinner'
import './ServicesList.css'

function ServicesList({ 
  services, 
  title, 
  loading = false, 
  error = null,
  emptyMessage = 'No services found' 
}) {
  const { t } = useTranslation()
  const [displayedServices, setDisplayedServices] = useState([])

  useEffect(() => {
    if (services) {
      setDisplayedServices(services)
    }
  }, [services])

  if (loading) {
    return (
      <div className="services-loading">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="services-error">
        <p>{error}</p>
      </div>
    )
  }

  if (!displayedServices || displayedServices.length === 0) {
    return (
      <div className="services-empty">
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="services-list">
      {title && <h2 className="services-title">{title}</h2>}
      <div className="services-grid">
        {displayedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}

export default ServicesList