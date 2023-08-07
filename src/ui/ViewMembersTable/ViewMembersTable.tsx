import { FC, useEffect, useState } from 'react';
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
  Typography,
  InputLabel,
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SxProps, Theme } from '@mui/material';

import TextFieldWrapper from 'ui/TextFieldWrapper';
import { SelectWrapperTable } from 'ui/SelectWrapper/SelectWrapper';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
  disabled: boolean;
};

const ViewMembersTable: FC = ({
  register,
  fields,
  remove,
  watch,
  disabled = false,
}) => {
  const data = watch('usersWithRole');

  const [disabledDelete, setDisabledDelete] = useState([]);

  useEffect(() => {
    console.log(data);
    const admins = (data || []).filter((item) => item.role == 'admin');
    const isDisabledAdmin = admins.length < 2;
    const isDisabledList = (data || []).map(
      (user) => user.role == 'admin' && isDisabledAdmin,
    );
    setDisabledDelete(isDisabledList);
  }, [data]);

  return (
    <Stack>
      <InputLabel>Members</InputLabel>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {fields.map((field, index) => (
              <TableRow
                key={field.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Stack spacing={2} direction="row">
                    <Avatar
                      alt={data[index].firstName}
                      src={data[index].imageUrl}
                    />
                    <Stack sx={{ width: '200px' }}>
                      <Typography variant="p" noWrap>
                        {data[index].firstName}
                      </Typography>
                      <Typography variant="p" noWrap>
                        {data[index].email}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                {!disabled ? (
                  <TableCell align="right">
                    <SelectWrapperTable
                      defaultValue={data[index].role}
                      {...register(`usersWithRole.${index}.role`)}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </SelectWrapperTable>
                  </TableCell>
                ) : (
                  ''
                )}
                {!disabled ? (
                  <TableCell align="right">
                    <IconButton
                      component="label"
                      onClick={() => remove(index)}
                      disabled={disabledDelete[index]}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                ) : (
                  ''
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ViewMembersTable;
