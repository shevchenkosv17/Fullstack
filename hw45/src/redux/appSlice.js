import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: 'light',
    truck: {
      model: 'Iveco eDaily',
      type: 'Легкий комерційний фургон',
      engine: 'Повністю електричний (Electric)',
      purpose: 'Міська логістика та доставка'
    }
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleTheme } = appSlice.actions;
export default appSlice.reducer;
