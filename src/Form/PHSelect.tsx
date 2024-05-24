import { MenuItem, Select, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TPHSelectProps = {
  name: string;
  label?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  sx?: SxProps;
  item?: string[];
};

export const PHSelect = ({
  name,
  label,
  size = "small",
  fullWidth,
  placeholder,
  required,
  sx,
  item,
}: TPHSelectProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          sx={{ ...sx }}
          {...field}
          label={label}
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          select
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {item?.map((genderItem) => (
            <MenuItem key={genderItem} value={genderItem}>
              {genderItem}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};
