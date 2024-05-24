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
};
const PHInput = ({
  name,
  label,
  size = "small",
  type = "text",
  fullWidth,
  sx,
  required,
}: TPhInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
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
        >
          {" "}
        </TextField>
      )}
    />
  );
};

export default PHInput;
