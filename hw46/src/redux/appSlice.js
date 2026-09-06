import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTruckData = createAsyncThunk(
  'app/fetchTruckData',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        model: 'Iveco eDaily',
        type: 'Легкий комерційний фургон',
        engine: 'Повністю електричний (Electric)',
        purpose: 'Міська логістика та доставка'
      };
    } catch (error) {
      return rejectWithValue('Помилка завантаження даних з сервера');
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: 'light',
    truck: null,
    loading: false,
    error: null
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTruckData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTruckData.fulfilled, (state, action) => {
        state.loading = false;
        state.truck = action.payload;
      })
      .addCase(fetchTruckData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
