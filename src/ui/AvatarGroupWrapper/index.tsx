import AvatarGroup from '@atlaskit/avatar-group';
import { Checkbox, Box } from '@mui/material';
import type { AvatarProps } from '@atlaskit/avatar-group';

export interface AvatarPropsExtended extends AvatarProps {
  selected?: boolean;
}

type Props = {
  data: Array<AvatarPropsExtended>;
  onAvatarClick: (avatar: AvatarPropsExtended) => void;
  maxCount?: number;
};

const AvatarGroupWrapper = (props: Props) => {
  const { data = [], maxCount = 3, onAvatarClick } = props;

  return (
    <AvatarGroup
      maxCount={maxCount}
      appearance="stack"
      data={data}
      onAvatarClick={(_, __, index) => {
        onAvatarClick(data[index]);
      }}
      size="large"
      overrides={{
        AvatarGroupItem: {
          render: (Component, props: any, index) => {
            const avatarItem = <Component {...props} key={index} />;
            return (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>{avatarItem}</div>
                <div>
                  <Checkbox
                    name="rememberMe"
                    onChange={() => onAvatarClick(data[index])}
                    color="primary"
                    checked={props.avatar.selected}
                    required
                  />
                </div>
              </Box>
            );
          },
        },
        Avatar: {
          render: (Component, props: AvatarPropsExtended, index) => {
            const avatarItem = <Component {...props} key={index} />;
            return (
              <Box
                sx={
                  props.selected
                    ? {
                        boxShadow: '0 0 0 2px #2151c5',
                        borderRadius: '50%',
                      }
                    : {}
                }
              >
                {avatarItem}
              </Box>
            );
          },
        },
      }}
    />
  );
};

export default AvatarGroupWrapper;
