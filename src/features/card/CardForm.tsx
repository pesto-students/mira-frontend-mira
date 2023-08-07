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
import TextFieldWrapper from 'ui/TextFieldWrapper';
import ButtonWrapper from 'ui/ButtonWrapper';
import UploadImage from 'ui/UploadImage';
import SearchMembers from 'ui/SearchMembers/SearchMembers';
import ViewMembersTable from 'ui/ViewMembersTable/ViewMembersTable';
import { SelectWrapper } from 'ui/SelectWrapper/SelectWrapper';
import DatePickerWrapper from 'ui/DatePickerWrapper/DatePickerWrapper';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import QueueIcon from '@mui/icons-material/Queue';
import DoneIcon from '@mui/icons-material/Done';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LoopIcon from '@mui/icons-material/Loop';
import RichTextEditor from 'ui/RichTextEditor/RichTextEditor';

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
  project: {};
};

const CardForm: FC<ICardForm> = ({
  initialValues = {},
  onSubmit,
  isCreate = true,
  processing = false,
  project,
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
        <Grid container spacing={2} sx={{ marginTop: '24px' }}>
          <Grid item xs={12}>
            <TextFieldWrapper
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
              label={'Title'}
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
                required: true,
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
          <Grid item xs={12} sm={12}>
            <SelectWrapper
              label="Status"
              {...register('status', {
                required: 'Please select a project status',
              })}
              fullWidth
              value={status}
              error={errors.status ? true : false}
              helperText={errors.status?.message?.toString()}
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
                  <BookmarksIcon fontSize="small" sx={{ color: 'orange' }} />
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
              {...register('priority', { required: 'Priority is required' })}
              fullWidth
              value={priority}
              error={errors.priority ? true : false}
              helperText={errors.priority?.message?.toString()}
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
                  <ArrowUpwardIcon fontSize="small" sx={{ color: 'orange' }} />
                </ListItemIcon>
                <ListItemText>Medium</ListItemText>
              </MenuItem>
              <MenuItem value={'low'}>
                <ListItemIcon>
                  <ArrowDownwardIcon fontSize="small" sx={{ color: 'green' }} />
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
              {...register(
                'reporter',
                // { required: 'Reporter is required' }
              )}
              value={reporter}
              sx={{
                width: '235px',
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
              {...register('assignee')}
              value={assignee}
              sx={{
                width: '235px',
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
          <Grid item xs={12}>
            <ButtonWrapper
              type="submit"
              variant="contained"
              disableElevation
              loading={processing}
              size="large"
              fullWidth
              sx={{
                margin: '10px 0px',
                padding: '10px',
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
