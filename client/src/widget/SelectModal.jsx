import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function SelectModal({open, setOpen, title, message, onGoPage, buttonText}) {
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBtnClick = () => {
    if (onGoPage) {
      onGoPage();  
    }
  };

    const btns = (
      <DialogActions>
        <Button onClick={handleBtnClick}>{buttonText}</Button>
        <Button onClick={handleClose} autoFocus>
          닫기
        </Button>
      </DialogActions>
    )


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {message}
          </DialogContentText>
        </DialogContent>
          {btns}
      </Dialog>
    </React.Fragment>
  );
}
