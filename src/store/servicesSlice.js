// src/store/servicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialServices = [
  { id: 1, title: 'Citizen Identity & CNIC', category: 'Identity', tag: 'Popular', description: 'Apply for new identity card, updates, family registration, and birth certificates.' },
  { id: 2, title: 'Passport & Immigration', category: 'Travel', tag: 'Essential', description: 'Renew passports, track visa status, and book appointment schedules online.' },
  { id: 3, title: 'Tax & Revenue Portal', category: 'Finance', tag: null, description: 'File income tax returns, verify active taxpayer list (ATL), and make online payments.' },
  { id: 4, title: 'Vehicle & Driving License', category: 'Transport', tag: null, description: 'Verify vehicle registration, apply for driving licenses, and pay traffic fines.' },
  { id: 5, title: 'Business & Trade Registration', category: 'Business', tag: 'Fast Track', description: 'Register new commercial entities, commercial licenses, and export permissions.' },
  { id: 6, title: 'Digital Payments & Fees', category: 'Services', tag: null, description: 'Pay utility bills, government challans, and provincial dues securely online.' },
];

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: initialServices,
    searchQuery: '',
    selectedCategory: 'All',
    aiAnswer: '',
    aiLoading: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAiAnswer: (state, action) => {
      state.aiAnswer = action.payload;
    },
    setAiLoading: (state, action) => {
      state.aiLoading = action.payload;
    },
    clearAiAnswer: (state) => {
      state.aiAnswer = '';
    }
  },
});

export const { setSearchQuery, setSelectedCategory, setAiAnswer, setAiLoading, clearAiAnswer } = servicesSlice.actions;
export default servicesSlice.reducer;