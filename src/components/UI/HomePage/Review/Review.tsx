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
      <Box pb={10} textAlign="center">
        <Typography variant="h4" component="h4" fontWeight={600}>
          Our Donors and Recipients Say
        </Typography>
        <Typography color="white">
          We deeply value the experiences and feedback of our donors and
          recipients.
        </Typography>
      </Box>
      <Swiper spaceBetween={30} pagination={{ clickable: true }}>
        {Array.from(
          { length: Math.ceil(reviewData.length / 2) },
          (_, index) => {
            const firstReview = reviewData[index * 2];
            const secondReview = reviewData[index * 2 + 1];
            return (
              <SwiperSlide key={index}>
                <Container>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      {firstReview && (
                        <Box
                          sx={{
                            padding: 6,
                            background: "white",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={4}>
                            <Image
                              src={
                                firstReview?.photo ||
                                "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                              }
                              alt="Review Image"
                              height={150}
                              width={150}
                              style={{ borderRadius: "50%" }}
                            />
                            <Box>
                              <Typography variant="h5" color="black">
                                {firstReview?.name}
                              </Typography>
                              <Typography
                                sx={{ py: 1 }}
                                variant="h6"
                                color="GrayText"
                              >
                                {firstReview?.address}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={firstReview?.rating}
                                readOnly
                              />
                            </Box>
                          </Box>
                          <Box mt={3}>
                            <Typography variant="h6" color="GrayText">
                              {firstReview?.details}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      {secondReview && (
                        <Box
                          sx={{
                            padding: 6,
                            background: "white",
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={4}>
                            <Image
                              src={
                                secondReview?.photo ||
                                "https://i.postimg.cc/43gT3HP6/pngtree-user-icon-isolated-on-abstract-background-png-image-5192004.jpg"
                              }
                              alt="Review Image"
                              height={150}
                              width={150}
                              style={{ borderRadius: "50%" }}
                            />
                            <Box>
                              <Typography variant="h5" color="black">
                                {secondReview?.name}
                              </Typography>
                              <Typography
                                sx={{ py: 1 }}
                                variant="h6"
                                color="GrayText"
                              >
                                {secondReview?.address}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={secondReview?.rating}
                                readOnly
                              />
                            </Box>
                          </Box>
                          <Box mt={3}>
                            <Typography variant="h6" color="GrayText">
                              {secondReview?.details}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </Box>
  );
};

export default Review;
