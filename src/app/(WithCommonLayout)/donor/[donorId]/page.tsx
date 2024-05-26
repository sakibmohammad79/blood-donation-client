"use client";
import { useGetSingleDonorQuery } from "@/redux/api/donorApi";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const Page = ({ params }: any) => {
  const { donorId } = params;
  const { data } = useGetSingleDonorQuery(donorId);
  console.log(data);
  return (
    <Container>
      <Box py={16}>
        <Card sx={{ maxWidth: 600, mx: "auto" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://i.postimg.cc/BnmsxfQ5/pexels-designecologist-1779487.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Grid spacing={2} mt={1} container>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">name: {data?.name}</Typography>
                </Grid>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">
                    Blood Type: {data?.bloodType}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">
                    Contact: {data?.contactNumber}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">Email: {data?.email}</Typography>
                </Grid>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">
                    Availabillity: {data?.availabillity ? "True" : "False"}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  {" "}
                  <Typography variant="h5">
                    Location: {data?.location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
          <Box my={2} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary">
              DONOR
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Page;
