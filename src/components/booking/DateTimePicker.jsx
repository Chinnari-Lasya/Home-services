import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './DateTimePicker.css'

function DateTimePicker({ onSelectDateTime, initialDate, initialTime, availableTimes = [] }) {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(initialDate || null)
  const [selectedTime, setSelectedTime] = useState(initialTime || null)
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    
    // First day of the month
    const firstDay = new Date(currentYear, currentMonth, 1)
    const startingDay = firstDay.getDay() // 0 = Sunday, 1 = Monday, ...
    
    // Last day of the month
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const totalDays = lastDay.getDate()
    
    // Days from previous month to show
    const previousMonthDays = []
    for (let i = 0; i < startingDay; i++) {
      const day = new Date(currentYear, currentMonth, -i)
      previousMonthDays.unshift(day)
    }
    
    // Days in current month
    const currentMonthDays = []
    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(currentYear, currentMonth, i)
      currentMonthDays.push(day)
    }
    
    // Days from next month to complete the calendar grid
    const nextMonthDays = []
    const remainingDays = (6 - lastDay.getDay())
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(currentYear, currentMonth + 1, i)
      nextMonthDays.push(day)
    }
    
    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const calendarDays = generateCalendarDays()
  
  // Time slots for the selected date
  const timeSlots = [
    '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
  ]
  
  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    
    if (selectedDate && time) {
      const [hourMinute, period] = time.split(' ')
      let [hours, minutes] = hourMinute.split(':').map(Number)
      
      if (period === 'PM' && hours !== 12) {
        hours += 12
      } else if (period === 'AM' && hours === 12) {
        hours = 0
      }
      
      const dateTime = new Date(selectedDate)
      dateTime.setHours(hours, minutes, 0, 0)
      
      onSelectDateTime(dateTime)
    }
  }

  const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isPastDate = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit' })
  }

  const isCurrentMonth = (date) => {
    const today = new Date()
    return date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  return (
    <div className="date-time-picker">
      <div className="date-picker">
        <h3>{t('booking.selectDate')}</h3>
        <div className="calendar">
          <div className="calendar-header">
            <span className="month-year">{formatMonthYear(new Date())}</span>
          </div>
          <div className="weekdays">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>
          <div className="days-grid">
            {calendarDays.map((day, index) => (
              <button
                key={index}
                className={`day ${isToday(day) ? 'today' : ''} 
                             ${selectedDate && day.getDate() === selectedDate.getDate() && 
                               day.getMonth() === selectedDate.getMonth() ? 'selected' : ''}
                             ${!isCurrentMonth(day) ? 'other-month' : ''}
                             ${isPastDate(day) ? 'past-date' : ''}`}
                onClick={() => !isPastDate(day) && handleDateSelect(day)}
                disabled={isPastDate(day)}
              >
                {formatDate(day)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedDate && (
        <div className="time-picker">
          <h3>{t('booking.selectTime')}</h3>
          <div className="time-slots">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DateTimePicker