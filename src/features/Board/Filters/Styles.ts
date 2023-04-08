import { styled } from '@mui/material/styles';

import { color, font, mixin } from 'shared/utils/styles';
import { InputDebounced, Button } from 'shared/components';
import { Avatar } from '@mui/material';

export const Filters = styled('div')(
  () =>
    `
  display: flex;
  align-items: center;
  margin-top: 24px;  
`,
);

// export const SearchInput = styled(InputDebounced)(`
//   margin-right: 18px;
//   width: 160px;
// `);

export const Avatars = styled('div')(
  () => `
  display: flex;
  flex-direction: row-reverse;
  margin: 0 12px 0 2px;
`,
);

export const AvatarIsActiveBorder = styled('div')(
  ({ theme, props }) => `
  display: inline-flex;
  margin-left: -2px;
  border-radius: 50%;
  transition: transform 0.1s;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 0 4px ${theme.colors.primary}
  ${(props) =>
    props.isActive && `box-shadow: 0 0 0 4px ${theme.colors.primary}`}
  &:hover {
    transform: translateY(-5px);
  }
`,
);

export const StyledAvatar = styled(Avatar)(
  () => `
  box-shadow: 0 0 0 2px #fff;
`,
);

// export const StyledButton = styled(Button)(
//   () => `
//   margin-left: 6px;
// `,
// );

export const ClearAll = styled('div')(
  () => `
  height: 32px;
  line-height: 32px;
  margin-left: 15px;
  padding-left: 12px;
  border-left: 1px solid #dfe1e6;
  color: #42526E;
  font-size: 14.5px;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #5E6C84;
  }
`,
);
