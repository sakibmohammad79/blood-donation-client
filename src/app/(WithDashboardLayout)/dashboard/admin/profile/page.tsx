"use client";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AdminInfo from "./components/AdminInfo";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { FieldValues } from "react-hook-form";
import AutoFileUploader from "@/Form/AutoFileUploader";
import axios from "axios";
import { useAdminUpdateMutation } from "@/redux/api/adminApi";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import AdminUPdateModal from "./components/AdminUpdateModal";

const AdminProfile = () => {
  const { data, isFetching, isError } = useGetSingleUserQuery({});
  const [adminUpdate, { isLoading: isUploading }] = useAdminUpdateMutation();
  const [isModalOpen, SetIsModalOpen] = useState(false);

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
        const res = adminUpdate({ id: data?.id, body: { photo: imageUrl } });
        console.log(res);
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw new Error("Could not upload image");
    }
  };

  if (data?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No admin available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading admin. Please try again later.
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <AutoFileUploader
                name="file"
                label="choose your profile photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
              ></AutoFileUploader>
              <AdminUPdateModal
                id={data?.id}
                open={isModalOpen}
                setOpen={SetIsModalOpen}
              ></AdminUPdateModal>
            </Box>
          )}
          <Box sx={{ textAlign: "center", pt: 2 }}>
            <Button
              disabled={isFetching}
              endIcon={<EditIcon />}
              onClick={() => SetIsModalOpen(true)}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <AdminInfo data={data}></AdminInfo>
      </Grid>
    </Box>
  );
};

export default AdminProfile;
