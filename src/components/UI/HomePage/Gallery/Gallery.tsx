"use client";
import { useGetAllGalleryQuery } from "@/redux/api/galleryApi";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const Gallery = () => {
  const { data: galleries } = useGetAllGalleryQuery({});
  const galleryItems = galleries?.gallery || [];

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
        <Typography color="text.secondary">
          Our prestigious voluntary work on campaigns by the team
        </Typography>
      </Box>

      <Box>
        <Grid container spacing={3}>
          {galleryItems.map((item: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  position: "relative",
                  height: 300,
                  overflow: "hidden",
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover .overlay": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    py: 1,
                    px: 2,
                    opacity: 0,
                    transform: "translateY(100%)",
                    transition: "all 0.4s ease",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Gallery;
