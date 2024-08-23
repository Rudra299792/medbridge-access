import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServiceDetails } from '../slices/serviceSlice';
import '../CSS/ServiceDetails.css';

const ServiceDetails = () => {
    const dispatch = useDispatch();
    const service = useSelector((state) => state.service.currentService);
    const serviceDetailsStatus = useSelector((state) => state.service.serviceDetailsStatus);
    const { serviceId } = useParams();
    console.log(serviceId)
    useEffect(() => {
        if (serviceDetailsStatus === 'idle' && serviceId) {
            console.log('Dispatching fetchServiceDetails');
            dispatch(fetchServiceDetails(serviceId));
        }
    }, [serviceDetailsStatus, serviceId, dispatch]);

    return (
        <div className="ServiceDetails">
            {service ? (
                <>
                    <div className="service-header">
                        <h1>{service.heading}</h1>
                        <p>{service.one_line_description}</p>
                    </div>
                    <div className="service-details-grid">
                        {service.details.map((detail, index) => (
                            <div key={index} className="detail-card">
                                <p>{detail.content}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ServiceDetails;
