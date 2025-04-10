import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type TPhInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  sx?: SxProps;
  multiline?: boolean;
  rules?: any;
  rows?: number;
};
const PHInput = ({
  name,
  label,
  size = "small",
  type = "text",
  fullWidth,
  sx,
  required,
  multiline,
  rules,
  rows
}: TPhInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ ...sx }}
          {...field}
          label={label}
          variant="outlined"
          size={size}
          type={type}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          multiline={multiline}
          rows={rows}
        >
          {" "}
        </TextField>
      )}
    />
  );
};

export default PHInput;
