"use client";
import { Box, Container, Grid, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";


// Static service data
const services = [
  {
    title: "Blood Donation",
    description:
      "Become a part of our blood donation program to save lives. Blood donations are always needed to help those in critical conditions.",
    imageUrl:
      "https://i.ibb.co.com/k2vLfdXD/pexels-puwadon-sang-ngern-2168173-5340267.jpg", // Replace with your own image URL
  },
  {
    title: "Emergency Assistance",
    description:
      "We offer emergency assistance to individuals in need of blood, ensuring quick responses to save lives in critical situations.",
    imageUrl:
      "https://i.ibb.co.com/0yzMpCpd/pexels-kirill-dratsevich-237907001-12227661.jpg", // Replace with your own image URL
  },
  {
    title: "Donor Registration",
    description:
      "Join our donor list and become a hero. Easily sign up and be available to donate blood whenever needed.",
    imageUrl:
      "https://i.ibb.co.com/HDML1fF2/pexels-artempodrez-6823411.jpg", // Replace with your own image URL
  },
  {
    title: "Health Checkups",
    description:
      "We provide free health checkups for potential donors to ensure they are fit and ready for blood donation.",
    imageUrl:
      "https://i.ibb.co.com/99rZBP3B/pexels-karolina-grabowska-6627280.jpg", // Replace with your own image URL
  },
];

const ServiceProvided = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // Detect large screens

  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box pb={6} textAlign="center">
        <Typography variant="h3" fontWeight={600} sx={{ fontSize: { xs: 25, sm: 30, md: 40, lg: 45 } }}>
          Our Services
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here’s what we offer to make a positive impact in the community.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F9FAFB",
                boxShadow: 3,
                borderRadius: 2,
                padding: 3,
                height: "100%",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Box sx={{ width: "100%", height: 200, position: "relative" }}>
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  style={{
                    borderRadius: "10px",
                  }}
                />
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {service.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Back Button */}
      <Box textAlign="center" mt={6}>
        <Button
          variant="outlined"
          sx={{
            fontSize: 16,
            padding: "8px 20px",
            textTransform: "none",
            borderRadius: 2,
            boxShadow: 2,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
            },
          }}
          onClick={() => router.push("/")} // Navigate back to the homepage
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ServiceProvided;
