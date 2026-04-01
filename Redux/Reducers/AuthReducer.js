import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

 export const loginUser = createAsyncThunk('auth/loginUser',async (body) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}); 

      




const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
     userLoginResponse: null,
     loading: false,
     error: null,
  },
  reducers: { },
  extraReducers: (builder) => {

    // ************************* User Login *************************
    builder.addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
    });
    // ************************* User Login *************************



  }


})


export default AuthSlice.reducer