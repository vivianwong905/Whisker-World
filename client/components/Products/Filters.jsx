
import React, { useState } from "react";
import { Box, Checkbox, Slider, Typography, FormGroup, FormControlLabel, SwipeableDrawer, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setPriceFilter, setCategoryFilter } from "../../redux/filterSlice";


const Filters = () => {
  const dispatch = useDispatch();
  const { price, category } = useSelector(state => state.filter);

  const handlePriceChange = (event, price) => {
    dispatch(setPriceFilter(price));
  };

  const handleCategoryChange = (event, category) => {
    // console.log(event.target.checked, "event");//this will give you a true or false
    // console.log(category, "category"); //string
    dispatch(setCategoryFilter({ category, isChecked: event.target.checked }));
  };

  const marks = [
    {
      value: 0,
      label: '$0',
    },
    {
      value: 50,
      label: '$50',
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <Button variant="contained" sx={{ padding: 2,marginTop: 0, "&:hover": { bgcolor: "magenta", color: "black" }, fontWeight: "bold" }} onClick={() => setIsDrawerOpen(true)}>Filter Products</Button>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      >
        <Box sx={{ width: 250, padding: 2 }} role="presentation">
          <Typography variant="h6" sx={{ paddingBottom: 4, fontSize: 35 }}>Price Filter</Typography>
          <Slider
            getAriaLabel={() => 'Price Range'}
            value={Number(price)}
            onChange={handlePriceChange}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `$${value}`}
            min={0}
            step={5}
            max={50}
            marks={marks}
            sx={{ paddingTop: 4 }}
          />
          <Typography variant="h6" sx={{ paddingTop: 2, fontSize: 35 }}>Category Filter</Typography>
          <FormGroup >
            <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Food')} value="Food" />} label={<Typography variant="h5">Food</Typography>} />
            <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Treat')} value="Treat" />} label={<Typography variant="h5">Treat</Typography>} />
            <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Toys')} value="Toys" />} label={<Typography variant="h5">Toys</Typography>} />
            <FormControlLabel control={<Checkbox onChange={(event) => handleCategoryChange(event, 'Accessories')} value="Accessories" />} label={<Typography variant="h5">Accessories</Typography>} />
          </FormGroup>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}


export default Filters;



