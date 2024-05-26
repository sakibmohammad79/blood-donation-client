"use client";
import { useGetAllMyBloodRequestQuery } from "@/redux/api/requestApi";
import { Box, CircularProgress, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const MyBloodRequest = () => {
  const { data, isLoading } = useGetAllMyBloodRequestQuery({});
  const columns: GridColDef[] = [
    { field: "requesterName", headerName: "My Name", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "requestDate", headerName: "Request Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={data?.myRequest} columns={columns} hideFooter />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default MyBloodRequest;
