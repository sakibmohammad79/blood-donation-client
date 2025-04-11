"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import Image from "next/image";
import aboutImage from "../../../../assets/landing_page/about_image.webp";

const WhoSection = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: { xs: 10, sm: 12, md: 14 } }}>
        <Grid container spacing={8} alignItems="center">
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "16px",
                boxShadow: "0px 8px 24px rgba(0,0,0,0.05)",
                p: { xs: 3, sm: 4 },
              }}
            >
               <Typography
            sx={{
              fontSize: { xs: 25, sm: 30, md: 35, lg: 40 },
            }}
            fontWeight={600}
          >
           WHO WE ARE..?
          </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                align={isLargeScreen ? "left" : "center"}
              >
                Blood Buddies is a public donation center with members committed
                to transforming healthcare through life-saving blood donations.
              </Typography>

              <Divider sx={{ my: 2, maxWidth: 100, mx: isLargeScreen ? 0 : "auto" }} />

              <Box component="ul" sx={{ pl: 2, color: "#555", lineHeight: 1.8 }}>
                {[
                  "Multi-disciplinary team with extra care",
                  "Critical examination for better alignment",
                  "Top-quality assessment & treatment",
                  "Improved communication with our members",
                  "Supervised by clinical experts & specialist donors",
                ].map((point, index) => (
                  <li key={index}>
                    <Typography
                      variant="body1"
                      component="span"
                      color="text.primary"
                      align={isLargeScreen ? "left" : "center"}
                    >
                      {point}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Image Content */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
                overflow: "hidden",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              <Image
                src={aboutImage}
                alt="About us"
                layout="responsive"
                objectFit="cover"
                style={{
                  borderRadius: "16px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhoSection;
