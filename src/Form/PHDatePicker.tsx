import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import { SxProps } from "@mui/material";

interface IDatePicker {
  name: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
  label?: string;
  sx?: SxProps;
}
const PHDatePicker = ({
  name,
  type,
  label,
  size = "small",
  sx,
  fullWidth = true,
  required,
}: IDatePicker) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            timezone="system"
            disablePast
            {...field}
            onChange={(date) => onChange(date)}
            value={value || Date.now()}
            slotProps={{
              textField: {
                required: required,
                fullWidth: fullWidth,
                size: size,
                sx: { ...sx },
                variant: "outlined",
                label: label,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default PHDatePicker;
