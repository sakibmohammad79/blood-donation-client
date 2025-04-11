"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { toast } from "sonner";
import { useCreateGalleryMutation } from "@/redux/api/galleryApi";
import { useState } from "react";

const CreateGallery = () => {
  const methods = useForm();
  const [createGallery, { isLoading }] = useCreateGalleryMutation();
  const [imageUploading, setImageUploading] = useState(false);

  const handleGallerySubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setImageUploading(true);
      let imageUrl = "";

      if (values.image?.[0]) {
        const formData = new FormData();
        formData.append("image", values.image[0]);

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

      const galleryPayload = {
        title: values.title,
        imageUrl,
      };

      const result = await createGallery(galleryPayload).unwrap();
      if (result?.id) {
        toast.success("Gallery created successfully!");
        methods.reset(); // reset form
      } else {
        toast.error("Failed to create gallery!");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 3,
            borderRadius: 3,
            p: 4,
            backgroundColor: "#fff",
          }}
        >
          <Box mb={3} textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              <Box component="span" color="primary.main">
                Add
              </Box>{" "}
              New Gallery
            </Typography>
          </Box>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleGallerySubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    {...methods.register("title", { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    {...methods.register("image", { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box position="relative">
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading || imageUploading}
                      sx={{
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: 16,
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      {imageUploading ? "Uploading..." : "Submit"}
                    </Button>
                    {(isLoading || imageUploading) && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: "primary.main",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateGallery;
