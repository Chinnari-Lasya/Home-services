import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { FaUser, FaGlobe, FaBars, FaTimes } from 'react-icons/fa'
import Logo from '../common/Logo'
import './Header.css'

function Header() {
  const { t } = useTranslation()
  const { currentUser, logout, isAuthenticated } = useAuth()
  const { currentLanguage, changeLanguage, languages } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    setLanguageMenuOpen(false)
    setUserMenuOpen(false)
  }

  const toggleLanguageMenu = (e) => {
    e.stopPropagation()
    setLanguageMenuOpen(!languageMenuOpen)
    setUserMenuOpen(false)
  }

  const toggleUserMenu = (e) => {
    e.stopPropagation()
    setUserMenuOpen(!userMenuOpen)
    setLanguageMenuOpen(false)
  }

  const handleLanguageChange = (language) => {
    changeLanguage(language)
    setLanguageMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                {t('common.home')}
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setMenuOpen(false)}>
                {t('common.services')}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                {t('common.about')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="language-selector">
            <button 
              className="language-button" 
              onClick={toggleLanguageMenu}
              aria-expanded={languageMenuOpen}
            >
              <FaGlobe />
              <span>{currentLanguage.toUpperCase()}</span>
            </button>
            {languageMenuOpen && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="user-menu">
              <button 
                className="user-button" 
                onClick={toggleUserMenu}
                aria-expanded={userMenuOpen}
              >
                <FaUser />
                <span>{currentUser?.name?.split(' ')[0]}</span>
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {t('common.profile')}
                  </Link>
                  <Link 
                    to="/bookings" 
                    className="dropdown-item"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    {t('common.myBookings')}
                  </Link>
                  <button 
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    {t('common.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">
                {t('common.login')}
              </Link>
              <Link to="/register" className="register-button">
                {t('common.register')}
              </Link>
            </div>
          )}

          <button className="menu-toggle" onClick={toggleMenu} aria-expanded={menuOpen}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header