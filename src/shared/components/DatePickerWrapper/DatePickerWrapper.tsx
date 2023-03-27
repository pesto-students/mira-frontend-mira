import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputLabel } from '@mui/material';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import type { SxProps, Theme } from '@mui/material';
import type { PickerChangeHandler } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue';
import type { DateValidationError } from '@mui/x-date-pickers';

interface IDatePickerWrapperProps extends DatePickerProps<any> {
  label: string;
  onChange: PickerChangeHandler<any, DateValidationError>;
  value: Date | string;
}

const styles: SxProps<Theme> = {
  mt: 0,
  mb: 0,
  backgroundColor: 'secondary.main',
  '&:hover': {
    backgroundColor: 'secondary.light',
  },
  '& input:focus': {
    backgroundColor: '#ffffff',
  },
};

const DatePickerWrapper: React.FunctionComponent<IDatePickerWrapperProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <DatePicker sx={styles} value={value} onChange={onChange} {...props} />
    </>
  );
};

export default DatePickerWrapper;
