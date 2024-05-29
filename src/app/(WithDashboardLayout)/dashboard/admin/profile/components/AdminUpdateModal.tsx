import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import { PHSelect } from "@/Form/PHSelect";

import PHModal from "@/components/Shared/PHModal/PHModal";
import { availabilityItems, bloodTypeItem, genderItem } from "@/constant";
import {
  useAdminUpdateMutation,
  useGetSingleAdminQuery,
} from "@/redux/api/adminApi";
import {
  useDonorUpdateMutation,
  useGetSingleDonorQuery,
} from "@/redux/api/donorApi";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Input,
  Switch,
} from "@mui/material";
import { FieldValues } from "react-hook-form";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const AdminUPdateModal = ({ open, setOpen, id }: TModalProps) => {
  const { data } = useGetSingleAdminQuery(id);

  const [updateAdmin, { isLoading }] = useAdminUpdateMutation();

  const donorData = {
    name: data?.name || "",
    email: data?.email || "",
    contactNumber: data?.contactNumber || "",
    location: data?.location || "",
    gender: data?.gender || "",
    bloodType: data?.bloodType || "",
  };

  const handleAdminUpdate = async (values: FieldValues) => {
    try {
      const res = await updateAdmin({ id: id, body: values }).unwrap();
      if (res?.id) {
        setOpen(false);
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <PHModal open={open} setOpen={setOpen} title="Update Profile">
      <Box sx={{ padding: 2 }}>
        <PHForm onSubmit={handleAdminUpdate} defaultValues={donorData}>
          <Grid
            container
            spacing={4}
            justifyContent="start"
            alignItems="center"
            my={5}
          >
            <Grid item xs={12} sm={12} md={6}>
              <PHInput name="name" label="Name" fullWidth={true}></PHInput>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <PHInput
                name="contactNumber"
                label="Contact Number"
                fullWidth={true}
              ></PHInput>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <PHInput
                name="location"
                label="Location"
                fullWidth={true}
              ></PHInput>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <PHSelect
                name="gender"
                label="Gender"
                fullWidth={true}
                item={genderItem}
              ></PHSelect>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <PHSelect
                name="bloodType"
                label="Blood Type"
                fullWidth={true}
                item={bloodTypeItem}
              ></PHSelect>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="end">
            <Button disabled={isLoading} type="submit">
              Update
            </Button>
          </Box>
        </PHForm>
      </Box>
    </PHModal>
  );
};

export default AdminUPdateModal;
