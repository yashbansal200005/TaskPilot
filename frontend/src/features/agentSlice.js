// import { createSlice } from '@reduxjs/toolkit';

// const agentSlice = createSlice({
//   name: 'agent',
//   initialState: {
//     agentInfo: null,
//   },
//   reducers: {
//     setAgentInfo: (state, action) => {
//       state.agentInfo = action.payload;
//     },
//     clearAgentInfo: (state) => {
//       state.agentInfo = null;
//     },
//   },
// });

// export const { setAgentInfo, clearAgentInfo } = agentSlice.actions;

// export default agentSlice.reducer;



// agentSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Helper function to load agent info from localStorage
const loadAgentFromStorage = () => {
  const storedData = localStorage.getItem('agentInfo');
  return storedData ? JSON.parse(storedData) : null;
};

const agentSlice = createSlice({
  name: 'agent',
  initialState: {
    agentInfo: loadAgentFromStorage(),
    isAuthorized: !!loadAgentFromStorage(),
    loading: true // Add loading state
  },
  reducers: {
    setAgentInfo: (state, action) => {
      state.agentInfo = action.payload;
      state.isAuthorized = true;
      localStorage.setItem('agentInfo', JSON.stringify(action.payload));
    },
    clearAgentInfo: (state) => {
      state.agentInfo = null;
      state.isAuthorized = false;
      localStorage.removeItem('agentInfo');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const { setAgentInfo, clearAgentInfo, setLoading } = agentSlice.actions;
export const selectAgentAuth = (state) => state.agent.isAuthorized;
export const selectAgentLoading = (state) => state.agent.loading;
export default agentSlice.reducer;