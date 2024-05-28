"use client";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Image from "next/image";
import DonorInfo from "./components/DonorInfo";
import { useDonorUpdateMutation } from "@/redux/api/donorApi";
import AutoFileUploader from "@/Form/AutoFileUploader";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import DonorUpdateModal from "./components/DonorUpdateModal";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const DonorProfile = () => {
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const { data, isFetching } = useGetSingleUserQuery({});
  const [donorUpdate, { isLoading: isUploading }] = useDonorUpdateMutation();

  const fileUploadHandler = async (file: File) => {
    console.log(file);
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
          body: { photo: imageUrl },
        });
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw new Error("Could not upload image");
    }
  };

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
              src={data?.photo ?? data?.name}
              alt="Doctor Image"
              height={300}
              width={400}
            ></Image>
          </Box>

          {isUploading ? (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <AutoFileUploader
                name="file"
                label="choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              ></AutoFileUploader>
              <DonorUpdateModal
                id={data?.id}
                open={isModalOpen}
                setOpen={SetIsModalOpen}
              ></DonorUpdateModal>
            </Box>
          )}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              disabled={isFetching}
              endIcon={<EditIcon />}
              onClick={() => SetIsModalOpen(true)}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <DonorInfo data={data}></DonorInfo>
      </Grid>
    </Box>
  );
};

export default DonorProfile;
