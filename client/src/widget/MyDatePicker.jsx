import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MyDatePicker({date, setDate, today}) {
  // const today = new Date()
  // console.log(today.toISOString().substring(0,10))
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker format="YYYY-MM-DD" 
        value={date}
        onChange={(newValue)=>setDate(newValue)}
        defaultValue={dayjs(today)}
        sx={{
          width:"100%",
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid #CCC',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid #CCC',
            },
            '&:hover fieldset': {
              border: '1px solid #CCC',
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}