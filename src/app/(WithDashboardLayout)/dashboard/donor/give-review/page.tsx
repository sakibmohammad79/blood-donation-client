"use client";

import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import PHFile from "@/Form/PHFile";
import { useGiveReviewMutation } from "@/redux/api/reviewApi";

import { toast } from "sonner";
import { useGetSingleDonorQuery } from "@/redux/api/donorApi";

const Page = () => {
  const [giveReview, { isLoading }] = useGiveReviewMutation();

  const handleReviewSubmit = async (value: FieldValues) => {
    try {
      value.rating = Number(value.rating);
      const res = await giveReview(value).unwrap();
      if (res?.id) {
        toast.success("Your review send successfully!");
      } else {
        toast.error("Your review do not send!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            padding: 4,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Box my={2}>
            <Typography variant="h5" fontWeight={600}>
              <Box component="span" color="primary.main">
                GIVE
              </Box>{" "}
              YOUR REVIEW
            </Typography>
          </Box>

          <Box>
            <PHForm
              onSubmit={handleReviewSubmit}
              //   defaultValues={defaultValues}
              //   resolver={zodResolver(donorRegisterValidationSchema)}
            >
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <PHInput
                    name="rating"
                    fullWidth={true}
                    label="Rating"
                    type="number"
                    size="medium"
                  />
                </Grid>

                <Grid item md={6}>
                  <PHInput
                    name="details"
                    fullWidth={true}
                    label="Details"
                    type="text"
                    size="medium"
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
                <Button
                  type="submit"
                  fullWidth
                  sx={{ my: 3 }}
                  disabled={isLoading}
                >
                  Please Register
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
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Page;
