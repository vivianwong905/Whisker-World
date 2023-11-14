import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetSingleCatProductQuery } from '../redux/api';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SingleProduct = () => {

  const params = useParams();

  const catProductId = params.id;
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSingleCatProductQuery(catProductId);
  console.log("cat product", data)
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
console.error(error)
  return (
    <Box sx={{ margin: 5 }}>
      {error && !data && (<p>Failed to load cat product.</p>)}
      <Grid container justifyContent="center">
        <Grid item >
          <Card sx={{ maxWidth: 370 }}>
            {/* <CardMedia
                        component="img"
                        alt={data.product.name}
                        height="500"
                        image={data.product.imageUrl}
                    />

                    <CardContent>
                        <Typography variant="h3">{data.product.name}</Typography>
                        <Typography><b>Description:</b> {data.product.detail}</Typography>
                        <Typography><b>Price:</b>{data.product.price}</Typography>
                    </CardContent> */}
            <CardActions>
              <Button onClick={() => navigate("/")} > Back </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProduct;