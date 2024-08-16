import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import UUID from "../../uuid/components/UUID";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Bedrag from "../../helpers/components/Bedrag";
import ListItem from "@mui/material/ListItem";
import { formatUUID } from "../../uuid/components/uuidHelpers.js";
import { Link } from "react-router-dom";
import Datum from "../../helpers/components/Datum";
import List from "@mui/material/List";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function BestellingListItem({ bestelling }) {
    const toUrl = `/bestellingen/${formatUUID(bestelling.id)}`;
    return (
        <Card sx={{ minWidth: 275, width: "100%" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <Datum datum={bestelling.datum} />
                </Typography>
                <Typography variant="h5" component="div">
                    <UUID uuid={bestelling.id}></UUID>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <Bedrag bedrag={bestelling.bedrag} />
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemIcon>
                            <AutorenewIcon />
                        </ListItemIcon>
                        <ListItemText primary={bestelling.bestellingstatus} />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={bestelling.betaalstatus} />
                    </ListItem>
                </List>
            </CardContent>
            <CardActions>
                <Button to={toUrl} component={Link}>
                    Bekijk details
                </Button>
            </CardActions>
        </Card>
    );
}