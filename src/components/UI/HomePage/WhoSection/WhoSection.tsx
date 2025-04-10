"use client";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import aboutImage from "../../../../assets/landing_page/about_image.webp";

const WhoSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg")); // Detect large screens

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 10, sm: 10, md: 10, lg: 16, xl: 16 } }}>
        <Grid container spacing={4} alignItems="stretch">
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#F9FAFB",
                borderRadius: 2,
                boxShadow: 3,
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Vertically center the content
                height: "100%", // Ensure it stretches the full height
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                fontWeight={600}
                gutterBottom
                align={isLargeScreen ? "left" : "center"} // Adjust alignment based on screen size
              >
                Who We Are?
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                paragraph
                align={isLargeScreen ? "left" : "center"}
              >
                Blood Buddies is a public donation center with blood donation
                members in the changing health care system.
              </Typography>
              <Box>
                <Typography component="p" py={1} align={isLargeScreen ? "left" : "center"}>
                  The extra care of a multi-disciplinary team.
                </Typography>
                <Typography component="p" align={isLargeScreen ? "left" : "center"}>
                  Examine critically to ensure alignment.
                </Typography>
                <Typography component="p" py={1} align={isLargeScreen ? "left" : "center"}>
                  High quality assessment, diagnosis, and treatment.
                </Typography>
                <Typography component="p" align={isLargeScreen ? "left" : "center"}>
                  Increasing communication with our members.
                </Typography>
                <Typography component="p" py={1} align={isLargeScreen ? "left" : "center"}>
                  Specialist blood donors and clinical supervision.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Image Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                // boxShadow: 3,
                borderRadius: 2,
                height: "100%", // Match height of the text content
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 600, // Ensure the image doesn't stretch too much
                  height: "auto",
                  borderRadius: 2, // Add rounded corners to the image
                  overflow: "hidden",
                }}
              >
                <Image
                  src={aboutImage}
                  alt="About us"
                  layout="responsive"
                  objectFit="contain"
                  style={{
                    borderRadius: "8px", // Optional for rounded corners
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhoSection;
