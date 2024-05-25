import PHDatePicker from "@/Form/PHDatePicker";
import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import PHFullScreenModal from "@/components/Shared/PHFullScreenModal/PHFullScreenModal";
import { useCreateBloodRequestMutation } from "@/redux/api/requestApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const BloodRequestModal = ({ open, setOpen, id }: TModalProps) => {
  const { data: userData } = useGetSingleUserQuery({});
  const [createBloodRequest] = useCreateBloodRequestMutation();

  const handleBloodRequest = async (values: FieldValues) => {
    values.requestDate = dateFormatter(values.requestDate);
    values.receiverId = id;

    try {
      const res = await createBloodRequest(values).unwrap();
      console.log(res);
      if (res.id) {
        toast.success("Blood request send successfully!");
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const defaultValues = {
    requesterName: userData?.name || "",
    bloodType: "",
    hospitalName: "",
    //requestDate: "",
    bloodNeedDetails: "",
    location: userData?.location || "",
    contactNumber: userData?.contactNumber || "",
    requesterEmail: userData?.email || "",
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Add Blood Request">
      <Box
        sx={{
          maxWidth: "600px",
          width: "100%",
          boxShadow: 1,
          padding: 4,
          mx: "auto",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Box my={2}>
          <Typography variant="h5" fontWeight={600}>
            ADD{" "}
            <Box component="span" color="primary.main">
              BLOOD
            </Box>{" "}
            REQUEST
          </Typography>
        </Box>
        <PHForm onSubmit={handleBloodRequest} defaultValues={defaultValues}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <PHInput
                name="requesterName"
                fullWidth={true}
                label="Name"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="bloodType"
                fullWidth={true}
                label="Blood Type"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="hospitalName"
                fullWidth={true}
                label="Hospital Name"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHDatePicker name="requestDate" label="Date" />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="requesterEmail"
                fullWidth={true}
                label="Email"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="location"
                fullWidth={true}
                label="location"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="contactNumber"
                fullWidth={true}
                label="Number"
                type="text"
              />
            </Grid>
            <Grid item md={6}>
              <PHInput
                name="bloodNeedDetails"
                fullWidth={true}
                label="Details"
                type="text"
              />
            </Grid>

            <Button type="submit" fullWidth sx={{ my: 3 }}>
              Register
            </Button>
          </Grid>
        </PHForm>
      </Box>
    </PHFullScreenModal>
  );
};

export default BloodRequestModal;
