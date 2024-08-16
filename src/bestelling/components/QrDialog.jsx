import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import propTypes from 'prop-types'
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '@emotion/react';
import { DialogContent, IconButton, useMediaQuery } from '@mui/material';
import { Container } from '@mui/system';
import Bedrag from '../../helpers/components/Bedrag';
import CloseIcon from '@mui/icons-material/Close';


export default function QrDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const {open, onClose, bedrag} = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog  onClose={handleClose} open={open} fullScreen={fullScreen}>
      <DialogTitle sx={{ m: 0, p: 2 }} >Te betalen: {Bedrag({bedrag})}</DialogTitle>
      <IconButton aria-label='close' onClick={handleClose}  sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }} >
        <CloseIcon/>
      </IconButton>
      <Container> 
        <DialogContent dividers>
          <QRCodeSVG value="Link naar een betalingssysteem" size={300}/>
        </DialogContent>
      </Container>
    </Dialog>
  );
}

QrDialog.propTypes = {
  onClose: propTypes.func.isRequired,
  open: propTypes.bool.isRequired,
  bedrag: propTypes.any
}
