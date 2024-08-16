import { Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Bedrag from "../../helpers/components/Bedrag";

export default function Product ({ product }) {
  const {naam, eenheidsprijs, aantalInStock} = product
  return (
    <Card data-cy='product'>
      <CardContent>
        <Typography variant="h5" component="h2">
          {naam}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          <Bedrag bedrag={eenheidsprijs}/>
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          In Stock: {aantalInStock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={true}>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
