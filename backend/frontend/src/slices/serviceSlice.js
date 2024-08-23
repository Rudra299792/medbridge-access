import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addService = createAsyncThunk(
    'service/addService',
    async (serviceData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/services/', serviceData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchServices = createAsyncThunk(
    'service/fetchServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/services/');
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define fetchServiceDetails to fetch a single service's details by ID
export const fetchServiceDetails = createAsyncThunk(
    'service/fetchServiceDetails',
    async (serviceId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/services/${serviceId}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        currentService: null,
        servicesStatus: 'idle',
        serviceDetailsStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addService.pending, (state) => {
                state.servicesStatus = 'loading';
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.servicesStatus = 'succeeded';
                state.services.push(action.payload);
            })
            .addCase(addService.rejected, (state, action) => {
                state.servicesStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchServices.pending, (state) => {
                state.servicesStatus = 'loading';
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.servicesStatus = 'succeeded';
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.servicesStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchServiceDetails.pending, (state) => {
                state.serviceDetailsStatus = 'loading';
            })
            .addCase(fetchServiceDetails.fulfilled, (state, action) => {
                state.serviceDetailsStatus = 'succeeded';
                state.currentService = action.payload;
            })
            .addCase(fetchServiceDetails.rejected, (state, action) => {
                state.serviceDetailsStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export default serviceSlice.reducer;
