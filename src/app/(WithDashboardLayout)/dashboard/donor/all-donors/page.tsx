"use client";
import { useGetAllDonorsQuery } from "@/redux/api/donorApi";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import BloodRequestModal from "./components/BloodRequestModal";
import EditIcon from "@mui/icons-material/Edit";

import DonorUpdateModal from "../profile/components/DonorUpdateModal";

const AllDonorPage = () => {
  const [id, setId] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [bloodType, setBloodType] = React.useState<string>("");
  const [availability, setAvailability] = React.useState<boolean>(false);

  const [query, setQuery] = React.useState<Record<string, any>>({});

  const handleSearch = () => {
    const newQuery: Record<string, any> = {};
    if (location) newQuery.location = location;
    if (bloodType) newQuery.bloodType = bloodType;
    if (availability) newQuery.availability = availability;
    if (name) newQuery.name = name;
    if (email) newQuery.email = email;

    setQuery(newQuery);
  };

  const {
    data: donors,
    isLoading,
    isError,
  } = useGetAllDonorsQuery({ ...query });

  const handleAvailability = (event: any) => {
    setAvailability(event.target.checked);
  };

  const handleClick = (rowId: string) => {
    setId(rowId);
    setIsModalOpen(true);
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
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => setUpdateModalOpen(true)}>
            <EditIcon></EditIcon>
            <DonorUpdateModal
              id={row.id}
              open={updateModalOpen}
              setOpen={setUpdateModalOpen}
            ></DonorUpdateModal>
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Box>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          spacing={2}
          my={3}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="medium"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="medium"
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            size="medium"
          />
          <TextField
            label="Blood Type"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            size="medium"
          />

          <FormControlLabel
            control={
              <Switch checked={availability} onChange={handleAvailability} />
            }
            label="Available for Donation"
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </Box>
      {isLoading ? (
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
      ) : isError ? (
        <Typography variant="h6" color="error" textAlign="center" mt={2}>
          Error loading donors. Please try again later.
        </Typography>
      ) : donors?.donor?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={donors?.donor || []} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No donors available.
        </Typography>
      )}
    </Box>
  );
};

export default AllDonorPage;
