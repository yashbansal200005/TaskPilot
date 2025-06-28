// import { configureStore } from '@reduxjs/toolkit';
// import adminReducer from '../features/adminSlice';
// import agentReducer from '../features/agentSlice';

// export const store = configureStore({
//   reducer: {
//     admin: adminReducer,
//     agent: agentReducer,
//   },
// });


// store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminSlice';
import agentReducer from '../features/agentSlice';

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    agent: agentReducer,
  },
});

// Export the store instance itself
export default store;

// Export all selectors from here for easy access
export * from '../features/adminSlice';
export * from '../features/agentSlice';

// Combined selector to check if any user is authorized
export const selectIsAuthorized = (state) => 
  state.admin.isAuthorized || state.agent.isAuthorized;