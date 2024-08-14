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
  return (
    <Container>
      <Box sx={{ py: { xs: 10, sm: 10, md: 10, lg: 16, xl: 16 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#F9FAFB",
                borderRadius: 1,
                boxShadow: 2,
                padding: 4,
              }}
            >
              <Typography
                variant="h4"
                component="h4"
                fontWeight={600}
                gutterBottom
              >
                Who We Are?
              </Typography>
              <Typography variant="h6" component="h6" paragraph>
                Blood Buddies is a public donation center with blood donation
                members in the changing health care system.
              </Typography>
              <Box>
                <Typography component="p" py={1}>
                  The extra care of a multi-disciplinary team.
                </Typography>
                <Typography component="p">
                  Examine critically to ensure alignment.
                </Typography>
                <Typography component="p" py={1}>
                  High quality assessment, diagnosis and treatment.
                </Typography>
                <Typography component="p">
                  Increasing communication with our members.
                </Typography>
                <Typography component="p" py={1}>
                  Specialist blood donors and clinical supervision.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              mb={12}
              boxShadow={2}
              sx={{ width: "100%", height: "100%", maxWidth: 500 }}
            >
              <Image
                src={aboutImage}
                alt="About us"
                layout="responsive"
                objectFit="contain"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhoSection;
