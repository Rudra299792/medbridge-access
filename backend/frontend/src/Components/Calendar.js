import React, { useState, useEffect, useRef } from 'react';
import Timeline from './Timeline';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const todayRef = useRef(null);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    // Scroll to today's date when the component is first rendered
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date) => {
    setCurrentDate(date);
  };

  const renderDaysAndDates = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const dates = [];
  
    // Calculate previous month days to be shown
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonthDate);
    const startPrevMonthDay = daysInPrevMonth - firstDayOfMonth + 1;
  
    // Add previous month's days with faded color
    for (let i = startPrevMonthDay; i <= daysInPrevMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i);
      dates.push(
        <div
          key={`prev-${i}`}
          className="calendar-date faded"
          onClick={() => handleDateClick(date)}
        >
          <div className="calendar-day">{daysOfWeek[(firstDayOfMonth + i - startPrevMonthDay) % 7]}</div>
          <div className="calendar-number">{i}</div>
        </div>
      );
    }
  
    // Add actual days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dayOfWeek = date.getDay();
  
      const isToday = date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear();
  
      const isSelected = i === currentDate.getDate() &&
                         currentDate.getMonth() === new Date().getMonth() &&
                         currentDate.getFullYear() === new Date().getFullYear();
  
      dates.push(
        <div
          key={i}
          ref={isToday ? todayRef : null} // Assign ref to today's date
          className={`calendar-date ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <div className="calendar-day">{daysOfWeek[dayOfWeek]}</div>
          <div className={`calendar-number ${isSelected ? 'selected' : ''}`}>{i}</div>
        </div>
      );
    }
  
    // Calculate next month days to be shown
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const daysToShowNextMonth = 42 - (daysInMonth + firstDayOfMonth); // Fill up to 6 weeks (42 days)
  
    for (let i = 1; i <= daysToShowNextMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
      const dayOfWeek = date.getDay();
  
      dates.push(
        <div
          key={`next-${i}`}
          className="calendar-date faded"
          onClick={() => handleDateClick(date)}
        >
          <div className="calendar-day">{daysOfWeek[dayOfWeek]}</div>
          <div className="calendar-number">{i}</div>
        </div>
      );
    }
  
    return dates;
  };
  

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="calendar-title">Calendar</span>
        <div className="month-navigation">
          <button onClick={handlePrevMonth}>◀</button>
          <span className="month-name">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <button onClick={handleNextMonth}>▶</button>
        </div>
      </div>
      <div className="calendar-scroll">
        <div className="calendar">{renderDaysAndDates()}</div>
      </div>
      <Timeline selectedDate={currentDate} />
    </div>
  );
};

export default Calendar;
