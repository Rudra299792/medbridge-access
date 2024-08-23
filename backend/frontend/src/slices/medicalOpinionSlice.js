// medicalOpinionSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const medicalOpinionSlice = createSlice({
  name: 'medicalOpinions',
  initialState: {
    requests: [],
    status: 'idle',
  },
  reducers: {
    setMedicalOpinions: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { setMedicalOpinions } = medicalOpinionSlice.actions;

export const fetchMedicalOpinions = () => async (dispatch) => {
  const response = await axios.get('http://127.0.0.1:8000/api/medical-opinions/');
  dispatch(setMedicalOpinions(response.data));
};

export default medicalOpinionSlice.reducer;
