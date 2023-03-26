import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import * as React from 'react';
import ButtonWrapper from '../ButtonWrapper';
import ModalImage from 'app/assets/undraw_wandering_mind.svg';

interface IGenericErrorModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  margin: {
    sx: '10px',
  },
  '&:focus': {
    border: 'none',
    outline: 'none',
  },
};

const GenericErrorModal: React.FunctionComponent<IGenericErrorModalProps> = (
  props,
) => {
  const {
    open,
    handleClose,
    title = 'Something went wrong!',
    description,
  } = props;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            sx={{
              color: 'error.main',
            }}
            id="transition-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
          <Box
            sx={{
              textAlign: 'center',
              margin: '30px 0px',
            }}
          >
            <img
              height="auto"
              width={'70%'}
              src={ModalImage}
              alt="invalid credential"
            />
          </Box>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <ButtonWrapper
            variant="contained"
            fullWidth
            sx={{
              margin: '20px 0px',
              padding: '10px',
            }}
            onClick={handleClose}
          >
            Close
          </ButtonWrapper>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GenericErrorModal;
