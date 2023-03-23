import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Grid,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SxProps, Theme } from '@mui/material';

import TextFieldWrapper from 'components/common/TextFieldWrapper';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
};

interface ViewMembersProps {
  users: UserType[];
}

const ViewMembers: FC<ViewMembersProps> = ({ users }) => {
  const handleRoleChange = () => {};
  return (
    <Stack>
      <TextFieldWrapper label="Members" placeholder="Seach by email id" />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Grid spacing={2} container>
                    <Grid item>
                      <Avatar alt={row.firstName} src={row.imageUrl} />
                    </Grid>
                    <Grid item>
                      <div>{row.firstName}</div>
                      <div>{row.email}</div>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="right">
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={row.role}
                    label="Age"
                    sx={{
                      boxShadow: 'none',
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                        {
                          border: 0,
                        },
                      '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          border: 0,
                        },
                    }}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <IconButton component="label">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ViewMembers;
