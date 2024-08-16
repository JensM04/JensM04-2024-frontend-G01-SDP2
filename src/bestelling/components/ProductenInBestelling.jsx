import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { memo } from "react";
import Bedrag from "../../helpers/components/Bedrag";

const BoldLeftTableCell = memo(function BoldLeftTableCell(props) {
  return (
    <TableCell
      {...props}
      sx={{
        fontWeight: "bold",
        textAlign: "left",
      }}
    />
  );
});

export default memo(function ProductenInBestellingTabel({ producten }) {
  const userRole = localStorage.getItem("role");

  const showVoorradigEnAantalInStock = userRole !== "Klant";

  const verzendkosten = producten.length * 12.5;
  const totaalEXCLBTW = producten.reduce(
    (acc, curr) => acc + curr.AANTAL * curr.EENHEIDSPRIJS,
    0
  );

  const btwBedrag = (totaalEXCLBTW / 100) * 21;
  const totaalINCLBTW = totaalEXCLBTW + btwBedrag + verzendkosten;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Producten in bestelling">
        <TableHead>
          <TableRow>
            <TableCell align="center">Product Naam</TableCell>
            {showVoorradigEnAantalInStock && (
              <>
                <TableCell align="center">Voorradig</TableCell>
                <TableCell align="center">Aantal in stock</TableCell>
              </>
            )}
            <TableCell align="center">Eenheidsprijs</TableCell>
            <TableCell align="center">Aantal</TableCell>
            <TableCell align="center">Totaal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {producten.map((product, index) => (
            <TableRow key={index}>
              <TableCell align="left">{product.NAAM}</TableCell>
              {showVoorradigEnAantalInStock && (
                <>
                  <TableCell align="center">
                    {product.AANTALINSTOCK > 0 ? (
                      <Checkbox checked={true} disabled />
                    ) : (
                      <Checkbox checked={false} disabled />
                    )}
                  </TableCell>
                  <TableCell align="center">{product.AANTALINSTOCK}</TableCell>
                </>
              )}
              <TableCell align="right">
                {<Bedrag bedrag={product.EENHEIDSPRIJS} />}
              </TableCell>
              <TableCell align="center">{product.AANTAL}</TableCell>
              <TableCell align="right">
                {<Bedrag bedrag={product.AANTAL * product.EENHEIDSPRIJS} />}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <BoldLeftTableCell colSpan={showVoorradigEnAantalInStock ? 5 : 4}>
              Totaal excl. BTW
            </BoldLeftTableCell>
            <TableCell align="right">
              {<Bedrag bedrag={totaalEXCLBTW} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <BoldLeftTableCell colSpan={showVoorradigEnAantalInStock ? 5 : 4}>
              Verzendkosten
            </BoldLeftTableCell>
            <TableCell align="right">
              {<Bedrag bedrag={verzendkosten} />}
            </TableCell>
          </TableRow>
          <TableRow>
            <BoldLeftTableCell colSpan={showVoorradigEnAantalInStock ? 5 : 4}>
              BTW (21%)
            </BoldLeftTableCell>
            <TableCell align="right">{<Bedrag bedrag={btwBedrag} />}</TableCell>
          </TableRow>
          <TableRow>
            <BoldLeftTableCell colSpan={showVoorradigEnAantalInStock ? 5 : 4}>
              Totaal incl. BTW
            </BoldLeftTableCell>
            <TableCell align="right">
              {<Bedrag bedrag={totaalINCLBTW} />}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
