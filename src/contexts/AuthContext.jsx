import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // This would typically be an API call to your backend
  const checkAuth = useCallback(() => {
    setIsLoading(true)
    try {
      // Check if user is logged in from localStorage
      const user = localStorage.getItem('user')
      if (user) {
        setCurrentUser(JSON.parse(user))
      }
    } catch (error) {
      console.error('Error checking authentication', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      // Mock login - would be replaced with actual API call
      if (email && password) {
        const user = {
          id: 'user123',
          name: 'John Doe',
          email: email,
          phone: '+1234567890',
          address: '123 Main St, New York, NY'
        }
        
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
        return { success: true }
      }
      return { success: false, error: 'Invalid email or password' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name, email, phone, password) => {
    setIsLoading(true)
    try {
      // Mock registration - would be replaced with actual API call
      if (name && email && phone && password) {
        const user = {
          id: 'user123',
          name: name,
          email: email,
          phone: phone,
          address: ''
        }
        
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
        return { success: true }
      }
      return { success: false, error: 'Please fill all required fields' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
    navigate('/')
  }

  const updateProfile = async (profileData) => {
    try {
      // Mock profile update - would be replaced with actual API call
      const updatedUser = { ...currentUser, ...profileData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    currentUser,
    isLoading,
    checkAuth,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}