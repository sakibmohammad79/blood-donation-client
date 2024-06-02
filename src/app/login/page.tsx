"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginDonor } from "@/services/actions/loginDonor";
import PHForm from "@/Form/PHForm";
import PHInput from "@/Form/PHInput";

import { storeUserInfo } from "@/services/authService";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constant";

const validationSchema = z.object({
  email: z.string().email("Enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters!"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginDonor(data);
      if (res?.data?.accessToken) {
        toast.success(res.message);
        storeUserInfo(res?.data?.accessToken);
        // router.push("/dashboard");
      } else {
        setError(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
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
            padding: 4,
            boxShadow: 1,
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Box my={3}>
            <Typography variant="h5" component="h6" fontWeight={600}>
              LOGIN{" "}
              <Box component="span" color="primary.main">
                BLOOD
              </Box>{" "}
              CARE
            </Typography>
          </Box>

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
              resolver={zodResolver(validationSchema)}
              defaultValues={{ email: "", password: "" }}
            >
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <PHInput
                    fullWidth={true}
                    label="Email"
                    name="email"
                    type="text"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    fullWidth={true}
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Link href="/forgotpassword">
                <Typography
                  textAlign="end"
                  mt={1}
                  component="p"
                  fontWeight={300}
                >
                  Forgot Password?
                </Typography>
              </Link>
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
                  Please login
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
                Don&rsquo;t have an account?{" "}
                <Box color="primary.main" component="span">
                  <Link href="/register">Create account</Link>
                </Box>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
