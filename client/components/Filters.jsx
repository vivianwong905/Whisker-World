
import React from "react";
import { useState } from "react";
import { Button, Box, Card, Checkbox, Slider, Typography, FormGroup, FormControlLabel} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPriceFilter, setCategoryFilter } from "../redux/filterSlice";


// const categories = [
//   "food",
//   "toys",
//   "treats"
// ];

  // const resetFilters = () => {
  //   setCategoryFilter('');
  //   setPriceFilter('');
  // };


const Filters = () => {
  const dispatch = useDispatch();
  const { price, category} =useSelector(state => state.filter);
  

  const handlePriceChange = (event, price) => {
    dispatch(setPriceFilter(price));
  };
 
  const handleCategoryChange = (event, category) => {
    dispatch(setCategoryFilter(category));
  };


  return (
    <div> 
      <Card sx={{ maxWidth: 500, minWidth: 350, maxHeight: 250, minHeight: 250 }}> 
      <Typography variant="h6">Price Filter</Typography>
      <Slider
        getAriaLabel={() => 'Price Range'}
        value={Number(price)}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        step={5}
        max={40} 
      />

<FormGroup>
  <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Food')} value="Food" />} label="Food" />
  <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Treat')} value="Treat" />} label="Treat" />
  <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Toys')} value="Toys" />} label="Toys" />
  <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Accessories')} value="Accessories" />} label="Accessories" />
</FormGroup>

      </Card>
    </div>
  );
}


export default Filters;



