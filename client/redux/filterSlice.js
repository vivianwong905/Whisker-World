import { createSlice } from '@reduxjs/toolkit';


const filterSlice = createSlice({
  name: 'filter',
  initialState: {
  price: 0,
  category: []
},
  reducers: {
    setPriceFilter: (state, action) => {
      state.price = Math.max(0, action.payload);
    },
    setCategoryFilter: (state, action) => {
        const category = action.payload.category;// string
        const isChecked = action.payload.isChecked; //boolean
        if (isChecked) {
            state.category.push(category)
        } else {
            // find index of category in the array
            const index = state.category.indexOf(category)
            //check that the index of the array is there
            if (index >= 0) {
                //then delete the value from the array at that index
                state.category.splice(index, 1) //start deleting at this index, 1 item
            }
        }
    },
  },
});

export const filterReducer =  filterSlice.reducer;
export const { setCategoryFilter, setPriceFilter } = filterSlice.actions;


