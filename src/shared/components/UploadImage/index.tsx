import { Box, Card, Avatar, IconButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import React, { useState, useEffect } from 'react';
import { storage } from '@/firebase/firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AvatarWrapper = styled(Card)(
  ({ theme }) => ` 
    position: relative;
    overflow: visible;
    display: grid;  
    border-radius: 50%;
    width: ${theme.spacing(16)};
    height: ${theme.spacing(16)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }

    & .MuiCircularProgress-root{
      align-self: center;
      justify-self: center;
    }
`,
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)}; 

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.palette.primary.dark};
      }
    }
`,
);

const Input = styled('input')({
  display: 'none',
});

interface IProps {
  onImageChange: (image: string) => void;
  currentImage?: string;
  path: string;
  loading?: boolean;
  disabled?: boolean;
}

const UploadImage: React.FC<IProps> = ({
  onImageChange,
  currentImage,
  path,
  loading = false,
  disabled = false,
}) => {
  const defaultImage = '';
  const [image, setImage] = useState(defaultImage);
  const [imageFile, setImageFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(loading);

  useEffect(() => {
    setIsProcessing(loading);
  }, [loading]);

  const uploadImage = () => {
    if (!imageFile) return;
    const random = Math.floor(Math.random() * 100000000 + 1);
    const imageRef = ref(storage, `${path}${imageFile.name}${random}`);
    setIsProcessing(true);
    uploadBytes(imageRef, imageFile)
      .then((snapshot) => {
        console.log('Success: Image upload');
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        // setImage(downloadURL);
        onImageChange(downloadURL);
      })
      .catch((err) => {
        console.error('Failed: image upload', err);
      })
      .finally(() => {
        setImageFile(null);
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    uploadImage();
  }, [imageFile]);

  useEffect(() => {
    if (currentImage) {
      setImage(currentImage);
    }
  }, [currentImage]);

  const handleImageChange = (e: React.BaseSyntheticEvent) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size < 500000) {
      console.log(file.size);
      setImageFile(e.target.files[0]);
    } else {
      alert('Please upload file size < 0.5 MB');
    }
  };

  return (
    <AvatarWrapper>
      {isProcessing ? (
        <CircularProgress />
      ) : (
        <Avatar alt={'upload-image'} src={image} />
      )}
      {!disabled ? (
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      ) : (
        ''
      )}
    </AvatarWrapper>
  );
};

export default UploadImage;
