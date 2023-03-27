import React, { useEffect } from 'react';
import { Box, Card, Avatar, IconButton, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

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

const defaultPic =
  'https://firebasestorage.googleapis.com/v0/b/mira-v1-2b0a0.appspot.com/o/assets%2FdefaultPic.svg?alt=media&token=75d1e193-6661-4199-b46d-71036cb44cae';

const UploadImage = (props) => {
  const { label, helperText, imageUrl, onChange } = props;
  useEffect(() => {
    if (!imageUrl) {
      onChange(defaultPic);
    }
  }, []);
  const tempUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png';
  return (
    <Grid container item xs={12}>
      {label && (
        <Grid item xs={6} alignItems="center" container>
          {label}
          {helperText && (
            <Typography
              variant="caption"
              sx={{ color: '#777', marginLeft: '4px' }}
            >
              ({helperText})
            </Typography>
          )}
        </Grid>
      )}
      <Grid item xs={6}>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={'upload-image'} src={imageUrl} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={() => onChange(tempUrl)}
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
      </Grid>
    </Grid>
  );
};

export default UploadImage;
