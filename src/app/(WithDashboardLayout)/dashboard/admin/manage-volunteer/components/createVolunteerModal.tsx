"use client";
import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import { PHSelect } from "@/Form/PHSelect";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { bloodTypeItem, genderItem } from "@/constant";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TAdminModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const adminRegisterValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters!"),
  userName: z.string().min(1, "User name required!"),
  admin: z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),

    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please enter a valid phone number!"),
    location: z.string().min(1, "Please enter your location!"),
    bloodType: z.string().min(1, "Please select your blood type!"),
    gender: z.string().min(1, "Please select your gender!"),
  }),
});

const defaultValues = {
  password: "",
  userName: "",
  admin: {
    name: "",
    email: "",
    contactNumber: "",
    location: "",
    gender: "",
    bloodType: "",
  },
};

const CreateVolunteerModal = ({ open, setOpen }: TAdminModalProps) => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const handleCreateAdmin: SubmitHandler<FieldValues> = async (values) => {
    try {
      const res = await createAdmin(values).unwrap();
      if (res?.id) {
        toast.success("Admin created successfully!");
      } else {
        toast.error("Something went wrong!");
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Create New Admin">
      <PHForm
        onSubmit={handleCreateAdmin}
        defaultValues={defaultValues}
        resolver={zodResolver(adminRegisterValidationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="admin.name"
              fullWidth={true}
              label="Name"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="admin.email"
              fullWidth={true}
              label="Email"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="password"
              fullWidth={true}
              label="Password"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="userName"
              fullWidth={true}
              label="User Name"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelect
              name="admin.bloodType"
              fullWidth={true}
              label="Blood Type"
              item={bloodTypeItem}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="admin.contactNumber"
              fullWidth={true}
              label="Contact Number"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput
              name="admin.location"
              fullWidth={true}
              label="Address"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHSelect
              name="admin.gender"
              fullWidth={true}
              label="Gender"
              item={genderItem}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          <Button type="submit" fullWidth sx={{ my: 3 }} disabled={isLoading}>
            Create Admin
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </PHForm>
    </PHModal>
  );
};

export default CreateVolunteerModal;
