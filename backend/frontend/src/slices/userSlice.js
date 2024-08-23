import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAppointment = createAsyncThunk(
  'user/createAppointment',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create_patient/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Store the complete user data
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/patient_login/', credentials);
      // Store the complete user data
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchAppointments = createAsyncThunk(
  'user/fetchAppointments',
  async (_, { getState, rejectWithValue }) => {
    let userData = getState().user.userData;
    
    // If userData is not in state, try to get it from localStorage
    if (!userData) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        userData = JSON.parse(storedUserData);
      }
    }

    if (!userData || !userData.access_token) {
      return rejectWithValue('User is not authenticated');
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get_patient_appointments/', {
        headers: {
          Authorization: `Bearer ${userData.access_token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: JSON.parse(localStorage.getItem('userData')) || null,
    status: 'idle',
    error: null,
    appointments: [],  // Add this line to hold appointments data
  },
  reducers: {
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem('userData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
