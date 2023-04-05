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
} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import type { SxProps, Theme } from '@mui/material';

import TextFieldWrapper from 'shared/components/TextFieldWrapper';
import { SelectWrapperTable } from 'shared/components/SelectWrapper/SelectWrapper';

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
};

const ViewMembersTable: FC = ({ register, fields, remove, watch }) => {
  const data = watch('usersWithRole');

  const [query, setQuery] = useState('');

  return (
    <Stack>
      <TextFieldWrapper
        label="Members"
        placeholder="Seach by email id"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(event.target.value);
        }}
      />
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
                <TableCell align="right">
                  <SelectWrapperTable
                    defaultValue={data[index].role}
                    {...register(`usersWithRole.${index}.role`)}
                  >
                    <MenuItem value={'admin'}>Admin</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                  </SelectWrapperTable>
                </TableCell>
                <TableCell align="right">
                  <IconButton component="label" onClick={() => remove(index)}>
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

export default ViewMembersTable;
