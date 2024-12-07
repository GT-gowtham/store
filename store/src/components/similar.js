import { Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Similar = ({ currentProductId, currentProductCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/products/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Filter out the current product
        const filteredProducts = response.data.filter(
          (product) =>
            product.product_category === currentProductCategory &&
            product.id !== currentProductId
        );
        console.log(filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [currentProductId, currentProductCategory]); // Re-run effect when currentProductId changes

  if (!products.length) return null; // Don't render if no products available

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        mt={7}
        spacing={8}
      >
        {products.slice(0, 4).map((product) => (
          <Grid item key={product.id}>
            <Card
              style={{
                padding: "20px",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Grid>
                <Typography variant="body2" color="textSecondary">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    width={150}
                  />
                </Typography>
                <Grid container>
                  <Grid item m={"2px"}>
                    {/* <CurrencyRupeeIcon fontSize="small" /> */}
                  </Grid>
                  <Grid>
                    <Typography>{product.product_price}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="h6">{product.product_name}</Typography>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Similar;