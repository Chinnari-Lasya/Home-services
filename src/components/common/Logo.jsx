import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Logo.css'

function Logo() {
  const { t } = useTranslation()

  return (
    <Link to="/" className="logo">
      <div className="logo-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z" fill="#7C3AED" />
          <path d="M22 10H10V16H22V10Z" fill="white" />
          <path d="M22 18H10V24H22V18Z" fill="white" />
        </svg>
      </div>
      <span className="logo-text">{t('common.appName')}</span>
    </Link>
  )
}

export default Logo