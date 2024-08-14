"use client";
import { useGetAllDonorsWithoutMeQuery } from "@/redux/api/donorApi";
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
  } = useGetAllDonorsWithoutMeQuery({ ...query });

  const handleAvailability = (event: any) => {
    setAvailability(event.target.checked);
  };

  const handleClick = (rowId: string) => {
    setId(rowId);
    setIsModalOpen(true);
  };

  const handleGetIdAndModalOpen = (id: string) => {
    setId(id);
    setUpdateModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "bloodType", headerName: "Blood Type", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "contactNumber", headerName: "Contact Number", width: 150 },
    { field: "availability", headerName: "Availability", width: 150 },

    {
      field: "action",
      headerName: "Request",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton>
            <BloodtypeIcon
              fontSize="medium"
              style={{ color: "red" }}
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
      width: 150,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
            <EditIcon
              fontSize="medium"
              style={{ color: "green" }}
              onClick={() => handleGetIdAndModalOpen(row.id)}
            ></EditIcon>
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
