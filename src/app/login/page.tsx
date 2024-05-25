"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
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
import { authKey } from "@/constant";

const validationSchema = z.object({
  email: z.string().email("Enter a valid email address!"),
  password: z.string().min(6, "Password must be at least 6 characters!"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginDonor(data);
      if (res?.data?.accessToken) {
        const token = res?.data?.accessToken;

        localStorage.setItem(authKey, token);
        toast.success("User loggedIn success!");
        router.push("/");
      } else {
        setError(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
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
            <>
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
            </>
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
                    type="text"
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
              <Button type="submit" fullWidth sx={{ my: 3 }}>
                Please login
              </Button>
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
