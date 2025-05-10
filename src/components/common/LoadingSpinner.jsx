import './LoadingSpinner.css'
import { useTranslation } from 'react-i18next'

function LoadingSpinner({ size = 'medium', fullPage = false }) {
  const { t } = useTranslation()
  const sizeClass = `spinner-${size}`

  if (fullPage) {
    return (
      <div className="spinner-fullpage">
        <div className={`spinner ${sizeClass}`}>
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
        <p className="spinner-text">{t('common.loading')}</p>
      </div>
    )
  }

  return (
    <div className={`spinner ${sizeClass}`}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

export default LoadingSpinner