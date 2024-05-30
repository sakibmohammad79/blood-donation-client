import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import { PHSelect } from "@/Form/PHSelect";

import PHModal from "@/components/Shared/PHModal/PHModal";
import { availabilityItems, bloodTypeItem, genderItem } from "@/constant";
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
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};
const DonorUpdateModal = ({ open, setOpen, id }: TModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const { data } = useGetSingleDonorQuery(id);
  const [updateDonor, { isLoading }] = useDonorUpdateMutation();

  useEffect(() => {
    if (data) {
      setIsChecked(data?.availability || false);
    }
  }, [data]);

  const donorData = {
    name: data?.name || "",
    gender: data?.gender || "",
    contactNumber: data?.contactNumber || "",
    location: data?.location || "",
    bloodType: data?.bloodType || "",
    availability: isChecked,
  };

  const handeDonorUpdate = async (values: FieldValues) => {
    values.availability = isChecked;
    try {
      const res = await updateDonor({ id: id, data: values }).unwrap();
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
        <PHForm onSubmit={handeDonorUpdate} defaultValues={donorData}>
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
            <Grid item xs={12} sm={12} md={6}>
              <FormControlLabel
                control={
                  <Switch checked={isChecked} onChange={handleSwitchChange} />
                }
                label="Available for Donation"
              />
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

export default DonorUpdateModal;
