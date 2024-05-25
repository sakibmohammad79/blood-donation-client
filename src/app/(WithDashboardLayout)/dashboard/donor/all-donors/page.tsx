"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import BloodRequestModal from "./components/BloodRequestModal";

const AllDonorPage = () => {
  const [id, setId] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const { data: donors, isLoading } = useGetAllDonorsQuery({});

  const handleClick = (rowId: string) => {
    setId(rowId); // Set the id state
    setIsModalOpen(true); // Set the isModalOpen state
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "bloodType", headerName: "Blood Type", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "availability", headerName: "Availability", flex: 1 },

    {
      field: "action",
      headerName: "Request",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton>
            <BloodtypeIcon
              style={{ color: "primary.main" }}
              onClick={() => handleClick(row.id)}
            ></BloodtypeIcon>
            <BloodRequestModal
              open={isModalOpen}
              setOpen={setIsModalOpen}
              id={id}
            ></BloodRequestModal>
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField size="small" placeholder="Search Specialist"></TextField>
      </Stack>
      {!isLoading ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={donors?.donor} columns={columns} hideFooter />
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

export default AllDonorPage;
