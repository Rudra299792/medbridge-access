// quotationSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const quotationSlice = createSlice({
  name: 'quotations',
  initialState: {
    requests: [],
    status: 'idle',
  },
  reducers: {
    setQuotations: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { setQuotations } = quotationSlice.actions;

export const fetchQuotations = () => async (dispatch) => {
  const response = await axios.get('http://127.0.0.1:8000/api/quotations/');
  dispatch(setQuotations(response.data));
};

export default quotationSlice.reducer;
