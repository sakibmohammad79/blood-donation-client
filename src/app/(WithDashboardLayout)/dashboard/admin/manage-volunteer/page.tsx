"use client";

import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useAdminStatusUpdateMutation,
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/api/adminApi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminUPdateModal from "../profile/components/AdminUpdateModal";
import { toast } from "sonner";
import CreateVolunteerModal from "./components/createVolunteerModal";
import { useActiveVolunteerMutation, useDeleteVolunteerMutation, useGetAllVolunteerQuery, useInactiveVolunteerMutation } from "@/redux/api/volunteerApi";


const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageVolunteer = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);
  const { data: volunteers, isLoading, isError } = useGetAllVolunteerQuery({});
  const [activeVolunteer] = useActiveVolunteerMutation();
  const [inactiveVolunteer] = useInactiveVolunteerMutation();

 


  const [deleteVolunteer] = useDeleteVolunteerMutation();

  const handleVolunteerDelete = async (id: string) => {
    const res = await deleteVolunteer(id).unwrap();

    if (res?.id) {
      toast.success("Volunteer deleted successfully!");
    }
  };

  const handleActiveVolunteer = async (id: string) => {
    try {
      const res = await activeVolunteer(id).unwrap();
      if (res?.id) {
        toast.success("Volunteer activated successfully!");
      }
    } catch (err) {
      toast.error("Failed to activate volunteer.");
      console.error(err);
    }
  };
  
  const handleInactiveVolunteer = async (id: string) => {
    try {
      const res = await inactiveVolunteer(id).unwrap();
      if (res?.id) {
        toast.success("Volunteer deactivated successfully!");
      }
    } catch (err) {
      toast.error("Failed to deactivate volunteer.");
      console.error(err);
    }
  };
  

  if (volunteers?.volunteer?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No donors available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading donors. Please try again later.
      </Typography>
    );
  }



  const rows = volunteers?.volunteer || [];

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Tooltip
          title={
            row.isActive
              ? "Click to make volunteer inactive"
              : "Click to make volunteer active"
          }
          arrow
        >
          <Chip
            label={row.isActive ? "Inactive" : "Active"}
            onClick={() =>
              row.isActive
                ? handleInactiveVolunteer(row.id)
                : handleActiveVolunteer(row.id)
            }
            sx={{
              cursor: "pointer",
              backgroundColor: row.isActive ? "#f44336" : "#4caf50", // red/green
              color: "#fff",
              fontWeight: 500,
              fontSize: "0.75rem",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              '&:hover': {
                opacity: 0.9,
              },
            }}
          />
        </Tooltip>
      ),
    },

    { field: "location", headerName: "Location", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
         
          <IconButton onClick={() => handleVolunteerDelete(row.id)}>
            <DeleteIcon fontSize="medium" style={{ color: "red" }} />
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box>
      <Box>
        <Button onClick={() => setIsAdminModalOpen(true)}>Create Admin</Button>
        <CreateVolunteerModal
          open={isAdminModalOpen}
          setOpen={setIsAdminModalOpen}
        ></CreateVolunteerModal>
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
          Error loading volunteer. Please try again later.
        </Typography>
      ) : rows?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No volunteer available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageVolunteer;
