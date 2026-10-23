import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { USERS_URL } from '../api';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get(USERS_URL);

    return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (userData = {}) => {
    const response = await axios.post(USERS_URL, userData);

    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersData: [],
        loading: false,
        error: null,
        user: null,
    },
    reducers: {
        addCurrentUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersData = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { addCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
