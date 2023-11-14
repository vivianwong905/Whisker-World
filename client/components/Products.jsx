import { useNavigate } from "react-router-dom";
import { useGetCatProductsQuery } from "../redux/api";

import { Button,Box,Card,CardActions,CardContent,CardMedia,Typography,Grid } from "@mui/material";


const Products = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetCatProductsQuery();
  console.log("all the product", products)
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
    }
     
  
  return (
    <Box>
      <Typography variant="h3">Cat Products</Typography>
      {error && !products && (<p> Failed to load products from api</p>)}
      <Grid container spacing={2}>
        {products  ?(
          products.map((product) => {
            return (
              <Grid item key={product.name}>
                <Card sx={{ maxWidth: 400, margin: 2 }} >
                  <CardMedia
                    component="img"
                    alt={product.nam}
                    height="500"
                    image={product.imageUrl}
                  />
                  <CardContent>
                    <Typography variant="h3">{product.name}</Typography>
                    <Typography><b>Price: </b>{product.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => navigate("/" + product.id)} >Cat Product Info</Button>
                  </CardActions>
                </Card>
               </Grid>
            )
          })): !error && <p>Loading...</p>}
        
      </Grid>
    </Box>
  )
}
export default Products;
