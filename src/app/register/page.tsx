"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerDonor } from "@/services/actions/registerDonor";
import { loginDonor } from "@/services/actions/loginDonor";
import { setToLocalStorage } from "@/utils/localStorage";
import { authKey, bloodTypeItem, genderItem } from "@/constant";
import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";
import { PHSelect } from "@/Form/PHSelect";
import { storeUserInfo } from "@/services/authService";
import PHFile from "@/Form/PHFile";

const donorRegisterValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters!"),
  userName: z.string().min(1, "User name required!"),
  donor: z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),

    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please enter a valid phone number!"),
    location: z.string().min(1, "Please enter your location!"),
    bloodType: z.string().min(1, "Please select your blood type!"),
    gender: z.string().min(1, "Please select your gender!"),
  }),
});

const defaultValues = {
  password: "",
  userName: "",
  donor: {
    name: "",
    email: "",
    contactNumber: "",
    location: "",
    gender: "",
    bloodType: "",
  },
};

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    //console.log(values);
    setIsLoading(true);
    try {
      const res = await registerDonor(values);
      // console.log("register", res);
      if (res?.data?.id) {
        toast.success("Donor register successfully!");
        const result = await loginDonor({
          password: values?.password,
          email: values?.donor?.email,
        });
        // console.log("login", result);
        if (result?.data?.accessToken) {
          const token = result?.data?.accessToken;
          storeUserInfo(token);
          router.push("/dashboard");
        }
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
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
                BLOOD
              </Box>{" "}
              DONOR REGISTER
            </Typography>
          </Box>

          {/* showing error */}
          {error && (
            <Box>
              <Typography
                sx={{
                  mb: 2,
                  padding: "1px",
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: "red",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <PHForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              resolver={zodResolver(donorRegisterValidationSchema)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="donor.name"
                    fullWidth={true}
                    label="Name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="donor.email"
                    fullWidth={true}
                    label="Email"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="password"
                    fullWidth={true}
                    label="Password"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="userName"
                    fullWidth={true}
                    label="Username"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHSelect
                    name="donor.bloodType"
                    fullWidth={true}
                    label="Blood Type"
                    item={bloodTypeItem}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="donor.contactNumber"
                    fullWidth={true}
                    label="Contact Number"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHInput
                    name="donor.location"
                    fullWidth={true}
                    label="Address"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PHSelect
                    name="donor.gender"
                    fullWidth={true}
                    label="Gender"
                    item={genderItem}
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
              <Typography component="p" fontWeight={300}>
                Do you have already an account?{" "}
                <Box component="span" color="primary.main">
                  <Link href="/login">Please Login</Link>
                </Box>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
