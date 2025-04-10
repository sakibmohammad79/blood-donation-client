"use client";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";
import { Box, Typography, Grid, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Rating from "@mui/material/Rating";

const Review = () => {
  const { data } = useGetAllReviewQuery({});
  const reviewData = data?.review || [];

  return (
    <Box sx={{ background: "#1B373B", color: "white", py: 18 }}>
      <Container>
        {/* Section Title */}
        <Box pb={10} textAlign="center">
          <Typography
            sx={{
              fontSize: { xs: 30, sm: 30, md: 40, lg: 45, xl: 45 },
              color: "white",
            }}
            fontWeight={600}
          >
            Our Donors and Recipients Say
          </Typography>
          <Typography color="white">
            We deeply value the experiences and feedback of our donors and recipients.
          </Typography>
        </Box>

        {/* Swiper Section */}
        <Swiper spaceBetween={30} pagination={{ clickable: true }}>
          {Array.from(
            { length: Math.ceil(reviewData.length / 2) },
            (_, index) => {
              const firstReview = reviewData[index * 2];
              const secondReview = reviewData[index * 2 + 1];
              return (
                <SwiperSlide key={index}>
                  <Grid container spacing={4}>
                    {[firstReview, secondReview].map((review, i) =>
                      review ? (
                        <Grid item xs={12} md={6} key={i}>
                          <Box
                            sx={{
                              padding: 4,
                              background: "white",
                              borderRadius: 3,
                              height: "100%",
                              boxShadow: 3,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box display="flex" alignItems="center" gap={3}>
                              <Image
                                src={
                                  review?.photo ||
                                  "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                                }
                                alt="Review Image"
                                height={80}
                                width={80}
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                              />
                              <Box>
                                <Typography variant="h6" color="black" fontWeight={600}>
                                  {review?.name}
                                </Typography>
                                <Typography variant="body2" color="GrayText">
                                  {review?.address}
                                </Typography>
                                <Rating
                                  name="read-only"
                                  value={review?.rating}
                                  readOnly
                                  size="small"
                                />
                              </Box>
                            </Box>
                            <Box mt={2}>
                              <Typography variant="body1" color="GrayText">
                                {review?.details}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ) : null
                    )}
                  </Grid>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Review;
