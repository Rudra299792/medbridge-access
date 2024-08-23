import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './slices/serviceSlice';
import appointmentReducer from './slices/userSlice';
import doctorReducer from './slices/doctorSlice';
import userReducer from './slices/userSlice';
import patientReducer from './slices/patientSlice';


const store = configureStore({
    reducer: {
        service: serviceReducer,
        appointment: appointmentReducer,
        doctor: doctorReducer,
        user: userReducer,
        patient: patientReducer,



    },
});

export default store;
