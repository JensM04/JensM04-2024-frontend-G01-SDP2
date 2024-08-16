import Product from "./Product";
import { Grid } from "@mui/material";

export default function ProductenList({
  producten
}) {
  return (
    <>
      <Grid 
        container 
        gap={2} 
        data-cy="producten_list">
      {producten.map((product, i) => (
        <Grid key={i} 
          item>
          <Product key={i} product={product} />
        </Grid>
      ))}
      </Grid>
    </>
  );
}
