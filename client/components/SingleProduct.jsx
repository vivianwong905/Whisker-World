import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetSingleCatProductQuery, useDeleteCatProductMutation } from '../redux/api';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const SingleProduct = () => {
  const { user } = useSelector(state => state.auth)
  const params = useParams();

  const catProductId = params.id;
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetSingleCatProductQuery(catProductId);
  const [deleteCatProduct] = useDeleteCatProductMutation();

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box sx={{ margin: 5 }}>
      {error && !data && (<p>Failed to load cat product.</p>)}
      <Grid container justifyContent="center">
        <Grid item >
          <Card sx={{ minWidth: 500, maxWidth: 500 }}>
            <CardMedia
                        component="img"
                        alt={product.name}
                        height="400"
                        image={product.imageUrl}
                        sx={{ objectFit: "contain"}}
                    />
                    <CardContent>
                        <Typography variant="h5" sx={{textAlign: "center"}}>{product.name}</Typography>
                        <Typography sx={{textAlign: "center"}}><b>Description:</b> {product.detail}</Typography>
                        <Typography sx={{textAlign: "center"}}><b>Price:</b> ${product.price}</Typography>
                    </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button variant="contained" onClick={() => navigate("/")} > Back </Button>
              {user?.admin && <Button variant="contained" onClick={() => deleteCatProduct(product.id)}>Delete Product</Button>}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleProduct;