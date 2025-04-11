"use client";
import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useCreateVolunteerMutation } from "@/redux/api/volunteerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TVolunteerModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const volunteerValidationSchema = z.object({
  name: z.string().min(1, "Please enter the volunteer's name."),
  email: z.string().email("Please enter a valid email."),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid 11-digit phone number."),
  location: z.string().min(1, "Location is required."),
  photo: z.any().optional(), // File input is handled separately
});

const defaultValues = {
  name: "",
  email: "",
  contactNumber: "",
  location: "",
  photo: null,
};

const CreateVolunteerModal = ({ open, setOpen }: TVolunteerModalProps) => {
    const {data: profile} = useGetSingleUserQuery({})
   
  const [createVolunteer, { isLoading }] = useCreateVolunteerMutation();

  const handleCreateVolunteer: SubmitHandler<FieldValues> = async (values) => {
    try {
      let imageUrl = "";

      if (values.photo?.length) {
        const formData = new FormData();
        formData.append("image", values.photo[0]);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        imageUrl = data?.data?.url;
      }

      const volunteerPayload = {
        volunteer: {
                ...values,
                photo: imageUrl,
                createdById: profile?.id
      }
    }

      const result = await createVolunteer(volunteerPayload).unwrap();
      if (result?.id) {
        toast.success("Volunteer created successfully!");
        setOpen(false);
      } else {
        toast.error("Failed to create volunteer!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <PHModal open={open} setOpen={setOpen} title="Create Volunteer">
      <PHForm
        onSubmit={handleCreateVolunteer}
        defaultValues={defaultValues}
        resolver={zodResolver(volunteerValidationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="name" label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="contactNumber" label="Contact Number" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <PHInput name="location" label="Location" fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <PHInput name="photo"  type="file" fullWidth />
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
            Create Volunteer
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
