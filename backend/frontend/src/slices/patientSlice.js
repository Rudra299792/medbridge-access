import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPatientDetails = createAsyncThunk(
  'patient/fetchPatientDetails',
  async (patientId, { getState, rejectWithValue }) => {
    try {
      const { doctor } = getState().doctor;
      const token = doctor?.access_token;

      const response = await axios.get(`http://127.0.0.1:8000/api/doctor/patient/${patientId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    details: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPatientDetails: (state) => {
      state.details = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPatientDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPatientDetails } = patientSlice.actions;
export default patientSlice.reducer;
