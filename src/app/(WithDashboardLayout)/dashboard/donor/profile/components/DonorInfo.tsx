import { Box, Grid, Stack, Typography, styled } from "@mui/material";
const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  padding: "8px 16px",
  width: "45%",

  "& p": {
    fontWeight: 600,
  },
}));
const DonorInfo = ({ data }: any) => {
  return (
    <Grid item xs={12} sm={12} md={8}>
      <Typography color="primary" component="h5" variant="h5" mb={1}>
        Personal Information
      </Typography>
      <Stack direction={{ sm: "column", md: "row" }} gap={2} flexWrap="wrap">
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Blood Type
          </Typography>
          <Typography>{data?.bloodType}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyledInformationBox>

        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Gender
          </Typography>
          <Typography>{data?.gender}</Typography>
        </StyledInformationBox>
      </Stack>
      <Typography color="primary" component="h5" variant="h5" mt={4} mb={1}>
        Contact Information
      </Typography>
      <Stack direction={{ sm: "column", md: "row" }} gap={2} flexWrap="wrap">
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Status
          </Typography>
          <Typography>{data?.status}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Availability
          </Typography>
          <Typography>{data?.availability ? "True" : "False"}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Contact Number
          </Typography>
          <Typography>{data?.contactNumber}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography variant="caption" color="secondary">
            Location
          </Typography>
          <Typography>{data?.location}</Typography>
        </StyledInformationBox>
      </Stack>
    </Grid>
  );
};

export default DonorInfo;
