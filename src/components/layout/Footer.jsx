import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import Logo from '../common/Logo'
import './Footer.css'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p className="footer-description">
              Professional home services at your doorstep. Quality guaranteed.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3>{t('common.services')}</h3>
              <ul>
                <li><Link to="/category/cleaning">Cleaning</Link></li>
                <li><Link to="/category/repair">Repair</Link></li>
                <li><Link to="/category/painting">Painting</Link></li>
                <li><Link to="/category/plumbing">Plumbing</Link></li>
                <li><Link to="/category/electrical">Electrical</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>{t('common.about')}</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about/how-it-works">How It Works</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">{t('common.contactUs')}</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/privacy-policy">{t('common.privacyPolicy')}</Link></li>
                <li><Link to="/terms">{t('common.termsOfService')}</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/become-partner">Become a Service Provider</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} HomeServe. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">{t('common.privacyPolicy')}</Link>
            <Link to="/terms">{t('common.termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer