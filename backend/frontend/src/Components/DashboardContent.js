import React from 'react'
import '../CSS/DashboardContent.css'
import Calendar from './Calendar'
import DoctorStats from './DoctorStats';
import AppointmentRequest from './AppointmentRequest';
function DashboardContent() {
    return (
        <div className="dashboard-doctor">
          
    
          <div className="dashboard-body">
            <div className="calendar-section">
            <div className="dashboard-banner">
            <img src="/banner/dashboard.png" alt="" className="dashboard-image" />

          </div>
              <Calendar />
            </div>
    
            <div className="details-section">
              <DoctorStats />
              {/* <AppointmentRequest /> */}
            </div>
          </div>
        </div>
      );
}

export default DashboardContent