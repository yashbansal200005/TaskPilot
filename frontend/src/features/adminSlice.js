// import { createSlice } from '@reduxjs/toolkit';

// const adminSlice = createSlice({
//   name: 'admin',
//   initialState: {
//     adminInfo: null,
//   },
//   reducers: {
//     setAdminInfo: (state, action) => {
//       state.adminInfo = action.payload;
//     },
//     clearAdminInfo: (state) => {
//       state.adminInfo = null;
//     },
//   },
// });

// export const { setAdminInfo, clearAdminInfo } = adminSlice.actions;

// export default adminSlice.reducer;



// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load admin info from localStorage
const loadAdminFromStorage = () => {
  const storedData = localStorage.getItem('adminInfo');
  return storedData ? JSON.parse(storedData) : null;
};

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminInfo: loadAdminFromStorage(),
    isAuthorized: !!loadAdminFromStorage(),
    loading: true // Add loading state
  },
  reducers: {
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
      state.isAuthorized = true;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    clearAdminInfo: (state) => {
      state.adminInfo = null;
      state.isAuthorized = false;
      localStorage.removeItem('adminInfo');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setAdminInfo, clearAdminInfo, setLoading } = adminSlice.actions;
export const selectAdminAuth = (state) => state.admin.isAuthorized;
export const selectAdminLoading = (state) => state.admin.loading;
export default adminSlice.reducer;