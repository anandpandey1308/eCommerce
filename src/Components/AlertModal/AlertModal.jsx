import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #999',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: 'pointer',
  },
}));

function AlertModal({ message, isOpen, onClose, onButtonClick }) {
  const classes = useStyles();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <Modal className={classes.modal} open={isOpen} onClose={onClose}>
      <div className={classes.modalContent}>
        <Typography variant="h6" gutterBottom>{message}</Typography>
        <span className={classes.close} onClick={onClose}>&times;</span>
        <Button onClick={handleButtonClick} variant="contained" color="primary">
          OK
        </Button>
      </div>
    </Modal>
  );
}

export default AlertModal;
