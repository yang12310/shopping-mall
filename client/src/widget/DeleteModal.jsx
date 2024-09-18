import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function DeleteModal({open, setOpen, title, message, purchaseId, deleteClick}) {
  // const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteClick}>삭제</Button>
          <Button onClick={handleClose} autoFocus>취소</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
