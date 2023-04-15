import {
  Box,
  Grid,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
  Avatar,
} from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { FC, useEffect, useState } from 'react';
import TextFieldWrapper, {
  TextFieldHeading,
} from 'shared/components/TextFieldWrapper';
import ButtonWrapper from 'shared/components/ButtonWrapper';
import UploadImage from 'shared/components/UploadImage';
import SearchMembers from 'shared/components/SearchMembers/SearchMembers';
import ViewMembersTable from 'shared/components/ViewMembersTable/ViewMembersTable';
import { SelectWrapper } from 'shared/components/SelectWrapper/SelectWrapper';
import DatePickerWrapper from 'shared/components/DatePickerWrapper/DatePickerWrapper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import QueueIcon from '@mui/icons-material/Queue';
import DoneIcon from '@mui/icons-material/Done';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoopIcon from '@mui/icons-material/Loop';
import RichTextEditor from 'shared/components/RichTextEditor/RichTextEditor';
import DeleteWrapper from 'shared/components/DeleteWrapper/DeleteWrapper';

type FormData = {
  title: string;
  description: string;
  status: string;
  priority: string;
  estimatedDate: string;
  reporter: string;
  assignee: string;
};

type ICardForm = {
  initialValues?: FormData;
  onSubmit: (finalData: {}, dirtyFields: string[]) => unknown;
  isCreate?: boolean;
  processing?: boolean;
  loading?: boolean;
  project: any;
  onDelete: any;
};

const CardForm: FC<ICardForm> = ({
  initialValues = {},
  onSubmit,
  isCreate = true,
  processing = false,
  loading = false,
  project,
  onDelete = null,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<FormData>({ mode: 'onChange', defaultValues: initialValues });

  const title = watch('title');
  const description = watch('description');
  const status = watch('status');
  const priority = watch('priority');
  const reporter = watch('reporter');
  const assignee = watch('assignee');
  const allUsers = (project?.admins || []).concat(project?.users || []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((finalData) => {
          onSubmit(finalData, Object.keys(dirtyFields));
        })}
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldHeading
                  multiline
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 3,
                      message: 'Title must be atleast 3 characters long',
                    },
                    maxLength: {
                      value: 150,
                      message: 'Title can be max 150 characters long',
                    },
                    validate: (value) =>
                      value?.trim() === value || 'No trailing spaces',
                  })}
                  error={errors.title ? true : false}
                  helperText={errors.title?.message?.toString()}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    maxLength: {
                      value: 50000,
                      message: 'Description size exceeded',
                    },
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <RichTextEditor
                      ref={ref}
                      label="Description"
                      value={value}
                      onChange={onChange}
                      error={errors.description ? true : false}
                      helperText={
                        errors.description?.message?.toString() ||
                        "Describe the issue in as much detail as you'd like"
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={2}>
            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
              <Grid item xs={12}>
                {onDelete ? (
                  <DeleteWrapper
                    text="Delete Card"
                    confirmationText="Do you really want to delete the card? This process cannot be undone."
                    onConfirm={onDelete}
                  />
                ) : (
                  ''
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectWrapper
                  label="Status"
                  {...register('status', { required: 'Status is required' })}
                  fullWidth
                  value={status}
                  error={errors.status ? true : false}
                >
                  <MenuItem value={''}>
                    <ListItemText></ListItemText>
                  </MenuItem>
                  <MenuItem value={'backlog'}>
                    <ListItemIcon>
                      <QueueIcon fontSize="small" sx={{ color: 'navy' }} />
                    </ListItemIcon>
                    <ListItemText>Backlog</ListItemText>
                  </MenuItem>
                  <MenuItem value={'ready2deploy'}>
                    <ListItemIcon>
                      <BookmarksIcon
                        fontSize="small"
                        sx={{ color: 'orange' }}
                      />
                    </ListItemIcon>
                    <ListItemText>Selected for development</ListItemText>
                  </MenuItem>
                  <MenuItem value={'in progress'}>
                    <ListItemIcon>
                      <LoopIcon fontSize="small" sx={{ color: 'violet' }} />
                    </ListItemIcon>
                    <ListItemText>In progress</ListItemText>
                  </MenuItem>
                  <MenuItem value={'done'}>
                    <ListItemIcon>
                      <DoneIcon fontSize="small" sx={{ color: 'green' }} />
                    </ListItemIcon>
                    <ListItemText>Done</ListItemText>
                  </MenuItem>
                </SelectWrapper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectWrapper
                  label="Priority"
                  {...register('priority', {
                    required: 'Priority is required',
                  })}
                  fullWidth
                  value={priority}
                  error={errors.priority ? true : false}
                >
                  <MenuItem value={''}>
                    <ListItemText></ListItemText>
                  </MenuItem>
                  <MenuItem value={'high'}>
                    <ListItemIcon>
                      <ArrowUpwardIcon fontSize="small" sx={{ color: 'red' }} />
                    </ListItemIcon>
                    <ListItemText>High</ListItemText>
                  </MenuItem>
                  <MenuItem value={'medium'}>
                    <ListItemIcon>
                      <ArrowUpwardIcon
                        fontSize="small"
                        sx={{ color: 'orange' }}
                      />
                    </ListItemIcon>
                    <ListItemText>Medium</ListItemText>
                  </MenuItem>
                  <MenuItem value={'low'}>
                    <ListItemIcon>
                      <ArrowDownwardIcon
                        fontSize="small"
                        sx={{ color: 'green' }}
                      />
                    </ListItemIcon>
                    <ListItemText>Low</ListItemText>
                  </MenuItem>
                </SelectWrapper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controller
                  control={control}
                  name="estimatedDate"
                  render={({ field: { onChange, value, ref } }) => (
                    <DatePickerWrapper
                      label="Estimated Date"
                      ref={ref}
                      value={value}
                      onChange={(val) => {
                        onChange({
                          target: {
                            name: 'estimatedDate',
                            value: val,
                          },
                        });
                      }}
                      format="dd/MM/yyyy"
                      sx={{ '& .MuiInputBase-root': { height: '33px' } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectWrapper
                  label="Reporter"
                  {...register('reporter')}
                  value={reporter}
                  sx={{
                    width: '100%',
                    '& .MuiTypography-root': {
                      overflow: 'hidden',
                    },
                  }}
                  error={errors.reporter ? true : false}
                >
                  {allUsers.map((user) => (
                    <MenuItem value={user._id} key={user._id}>
                      <ListItemIcon>
                        <Avatar
                          alt={'upload-image'}
                          src={user.imageUrl}
                          sx={{ width: 24, height: 24 }}
                        />
                      </ListItemIcon>
                      <ListItemText>{user.firstName}</ListItemText>
                    </MenuItem>
                  ))}
                </SelectWrapper>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SelectWrapper
                  label="Assignee"
                  {...register(
                    'assignee',
                    // { required: 'Assignee is required' }
                  )}
                  value={assignee}
                  sx={{
                    width: '100%',
                    '& .MuiTypography-root': {
                      overflow: 'hidden',
                    },
                  }}
                  error={errors.assignee ? true : false}
                >
                  {allUsers.map((user) => (
                    <MenuItem value={user._id} key={user._id}>
                      <ListItemIcon>
                        <Avatar
                          alt={user.firstName}
                          src={user.imageUrl}
                          sx={{ width: 24, height: 24 }}
                        />
                      </ListItemIcon>
                      <ListItemText>{user.firstName}</ListItemText>
                    </MenuItem>
                  ))}
                </SelectWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <ButtonWrapper
              type="submit"
              variant="contained"
              disableElevation
              loading={processing}
              sx={{
                margin: '10px 0px',
                padding: '5px',
                width: '100px',
              }}
              disabled={!isDirty}
            >
              {isCreate ? 'Create' : 'Save'}
            </ButtonWrapper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CardForm;
