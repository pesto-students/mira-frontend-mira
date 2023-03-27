import { Box, Card, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import React, { useState } from 'react';

const AvatarWrapper = styled(Card)(
  ({ theme }) => ` 
    position: relative;
    overflow: visible;
    display: inline-block;   

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
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
  onImageChange: (file: File) => void;
}

const UploadImage: React.FC<IProps> = (props) => {
  const [image, setImage] = useState(
    'https://i2.wp.com/thehealthyexec.com/wp-content/uploads/2015/11/reddit-logo.png',
  );

  const handleImageChange = (e: React.BaseSyntheticEvent) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
    props.onImageChange(e.target.files[0]);
  };

  return (
    <AvatarWrapper>
      <Avatar variant="rounded" alt={'upload-image'} src={image} />
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
    </AvatarWrapper>
  );
};

export default UploadImage;
