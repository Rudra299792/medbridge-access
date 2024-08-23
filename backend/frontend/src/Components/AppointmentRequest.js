import React from 'react'

function AppointmentRequest() {
    
        const requests = [
          { name: 'Michael Howard', type: 'Regular Checkup', time: '10:00am', status: 'Pending' },
          { name: 'Sebastian Lee', type: 'Root Cleaning', time: '11:00am', status: 'Pending' },
          { name: 'Nezra Khan', type: 'Scaling', time: '02:00pm', status: 'Pending' },
          { name: 'Mr. Kennedy', type: 'Root Cleaning', time: '03:00pm', status: 'Pending' },
        ];
      
        return (
          <div className="appointment-requests">
            <div className="appointment-requests-header">
            <h3>Appointment Requests</h3>
            <button>View All</button>
            
            </div>
            
            {requests.map((request, index) => (
              <div key={index} className="request">
                <span className="request-name">{request.name}</span>
                <span className="request-type">{request.type}</span>
                <span className="request-time">{request.time}</span>
                <span className="request-status">{request.status}</span>
                <button className="accept-btn">Accept</button>
              </div>
            ))}
          </div>
        );
      };


export default AppointmentRequest