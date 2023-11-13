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
      {error && !data && (<p>Failed to load Cat Product.</p>)}
      <Grid container justifyContent="center">
        <Grid item >
          <Card sx={{ maxWidth: 370 }}>
            {/* <CardMedia
                        component="img"
                        alt={data.book.title}
                        height="500"
                        image={data.book.coverimage}
                    />

                    <CardContent>
                        <Typography variant="h3">{data.book.title}</Typography>
                        <Typography><b>Author:</b> {data.book.author}</Typography>
                        <Typography><b>Description:</b> {data.book.description}</Typography>
                        <Typography><b>Available:</b>{data.book.available ? "true" : "false"}</Typography>
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