import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import aboutImage from "../../../../assets/landing_page/about_image.webp";
import { relative } from "path";

const WhoSection = () => {
  return (
    <Container>
      <Box py={20}>
        <Stack direction="row" gap={2}>
          <Box
            sx={{
              background: "#F9FAFB",
            }}
            p={6}
            mt={8}
          >
            <Typography variant="h4" component="h4" fontWeight={600}>
              Who We Are?
            </Typography>
            <Typography variant="h6" component="h6">
              Blood Buddies is for public donation center with blood donation
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

          <Box>
            <Image src={aboutImage} alt="aboutImage" />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default WhoSection;
