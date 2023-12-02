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
        console.log(action, "ACTION")
        const category = action.payload.category;// string
        const isChecked = action.payload.isChecked; //boolean
        console.log(isChecked, "CHECKED")
        if (isChecked) {

            state.category.push(category)
        } else {
            // find index of category in the array
            const index = state.category.indexOf(category)
            console.log(index, "INDEX");
            //check that the index of the array is there
            if (index >= 0) {
                //then delete the value from the array at that index
                state.category.splice(index, 1) //start deleting at this index, 1 item

            }
    
            
        }
        console.log(state.category, "RESULTS");
    },
  },
});

export const filterReducer =  filterSlice.reducer;
export const { setCategoryFilter, setPriceFilter } = filterSlice.actions;


