import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../slices/serviceSlice';

import '../CSS/OurService.css'; 

const Services = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.service.services);
    const servicesStatus = useSelector((state) => state.service.servicesStatus);

    useEffect(() => {
        if (servicesStatus === 'idle') {
            dispatch(fetchServices());
        }
    }, [servicesStatus, dispatch]);

    return (
        <div className="services-container">
            <div className="services-header">
                <h3>Our Services List</h3>
                <h1>Types Of Care</h1>
                <p>Discover a comprehensive range of medical services tailored to your needs. Our expert team provides top-notch healthcare solutions, from diagnostics to treatment, ensuring compassionate care and state-of-the-art facilities for your optimal health and well-being.</p>
            </div>
            <div className="services-cards">
                {services.slice(0, 3).map((service, index) => ( // Limit to 3 services
                     <div key={index} className="service-card">
                     <img src={service.front_image} alt={service.heading} className="service-image" />
                     <h3>{service.heading}</h3>
                     <p>{service.one_line_description}</p>
                     <Link to={`/services/${service.id}`} className="read-more">Read More <i className="fa-solid fa-arrow-right"></i></Link>
                 </div>
                ))}
            </div>
            <Link to="/services">
                <button className="all-services-button">All Services</button>
            </Link>
        </div>
    );
};

export default Services;
