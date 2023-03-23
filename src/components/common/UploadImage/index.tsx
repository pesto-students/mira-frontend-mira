import { Box, Card, Avatar, IconButton } from '@mui/material';
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

const UploadImage = ({ imageSrc }) => {
  return (
    <AvatarWrapper>
      <Avatar
        variant="rounded"
        alt={'upload-image'}
        src={imageSrc || 'https://source.unsplash.com/random'}
      />
      <ButtonUploadWrapper>
        <Input
          accept="image/*"
          id="icon-button-file"
          name="icon-button-file"
          type="file"
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
