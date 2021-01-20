import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: true,
    messageView: false
  },
  reducers: {
    setLoading: (state, action )=> {
        console.log(action.payload)
        state.loading = action.payload
    },
    setMessageView: (state, action) => {
        state.messageView = action.payload
     }
  },
});


export const { setLoading, setMessageView} = appSlice.actions;
export const selectLoading = state => state.app.loading;
export const selectMessageView = state => state.app.messageView;

export default appSlice.reducer;
