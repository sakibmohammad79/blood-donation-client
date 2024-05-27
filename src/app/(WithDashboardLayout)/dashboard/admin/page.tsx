"use client";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import DonorInfo from "./components/DonorInfo";

const AdminProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            sx={{
              height: 350,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
              mt: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              className="rounded-full border-2 border-red-400"
              src="https://i.postimg.cc/zXPkGg76/pexels-olly-3771082.jpg"
              alt="Doctor Image"
              height={300}
              width={400}
            ></Image>
          </Box>

          {/* {isUploading ? (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <AutoFileUploader
                name="file"
                label="choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              ></AutoFileUploader>
              <DoctorProfileUpdateModal
                id={data?.id}
                open={isModalOpen}
                setOpen={SetIsModalOpen}
              ></DoctorProfileUpdateModal>
              <Button
                endIcon={<EditIcon />}
                onClick={() => SetIsModalOpen(true)}
              >
                Update Profile
              </Button>
            </Box>
          )} */}
        </Grid>
        <DonorInfo data={data}></DonorInfo>
      </Grid>
    </Box>
  );
};

export default AdminProfile;
