"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ManageDonor = () => {
  const { data: donors, isLoading } = useGetAllDonorsQuery({});

  const rows =
    donors?.donor.map((donor: any) => ({
      ...donor,
      status: donor.user.status,
    })) || [];

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "availability", headerName: "Availability", flex: 1 },
    { field: "status", headerName: "status", flex: 1 },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
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

export default ManageDonor;
