"use client";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import DonorInfo from "./components/DonorInfo";
import { useDonorUpdateMutation } from "@/redux/api/donorApi";
import AutoFileUploader from "@/Form/AutoFileUploader";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import DonorUpdateModal from "./components/DonorUpdateModal";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const DonorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isFetching, isError } = useGetSingleUserQuery({});
  const [donorUpdate, { isLoading: isUploading }] = useDonorUpdateMutation();

  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      const imageUrl = result?.data?.url;
      if (imageUrl) {
        const res = await donorUpdate({
          id: data?.id,
          data: { photo: imageUrl },
        });
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw new Error("Could not upload image");
    }
  };

  if (isFetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading profile. Please try again later.
      </Typography>
    );
  }

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
              src={
                data?.photo ||
                "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
              }
              alt="Donor Image"
              height={300}
              width={400}
            />
          </Box>

          {isUploading ? (
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <AutoFileUploader
                name="file"
                label="Choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              />
              <DonorUpdateModal
                id={data?.id}
                open={isModalOpen}
                setOpen={setIsModalOpen}
              />
            </Box>
          )}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              disabled={isFetching}
              endIcon={<EditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <DonorInfo data={data} />
      </Grid>
    </Box>
  );
};

export default DonorProfile;
