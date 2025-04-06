import galleryImage1 from "@/assets/landing_page/gallery/gallery_1.jpg";
import galleryImage2 from "@/assets/landing_page/gallery/gallery_2.jpg";
import galleryImage3 from "@/assets/landing_page/gallery/gallery_3.jpg";
import galleryImage4 from "@/assets/landing_page/gallery/gallery_4.jpg";
import galleryImage5 from "@/assets/landing_page/gallery/gallery_5.jpg";
import galleryImage6 from "@/assets/landing_page/gallery/gallery_6.jpg";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Gallery = () => {
  const images = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
    galleryImage5,
    galleryImage6,
  ];

  return (
    <Container>
      <Box pb={6} textAlign="center">
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 30, md: 40, lg: 45, xl: 45 },
          }}
          fontWeight={600}
        >
          CAMPAIGN GALLERY
        </Typography>
        <Typography>
          Our prestigious voluntary work on campaigns by the team
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2} px={2}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 300,
                  overflow: "hidden",
                  borderRadius: 2,
                }}
              >
                <Image
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Gallery;
