import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createDoctor = createAsyncThunk(
  'doctor/createDoctor',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_doctor/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.setItem('doctorData', JSON.stringify(response.data));  // Storing the complete doctor data
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginDoctor = createAsyncThunk(
  'doctor/loginDoctor',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/doctor_login/', credentials);
      localStorage.setItem('doctorData', JSON.stringify(response.data));  // Storing the complete doctor data
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchDoctorAppointmentsByDate = createAsyncThunk(
  'doctor/fetchDoctorAppointmentsByDate',
  async (selectedDate, { getState, rejectWithValue }) => {
    try {
      const { doctor } = getState().doctor;
      const token = doctor?.access_token;
      const date = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      console.log(date)
      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/appointments/?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: {
    doctor: JSON.parse(localStorage.getItem('doctorData')) || null,
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.doctor = null;
      state.appointments = [];
      localStorage.removeItem('doctorData');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctor = action.payload;
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorAppointmentsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointmentsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointmentsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = doctorSlice.actions;
export default doctorSlice.reducer;
