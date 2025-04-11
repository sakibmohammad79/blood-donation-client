"use client";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
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
import { useDeleteVolunteerMutation, useGetAllVolunteerQuery } from "@/redux/api/volunteerApi";


const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageVolunteer = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);

//   //update admin
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [isAdminUpdateId, setAdminUpdateId] = React.useState("");

  const { data: volunteers, isLoading, isError } = useGetAllVolunteerQuery({});
//   const [adminStatusUpdate] = useAdminStatusUpdateMutation();

//   const handleStatusChange = async (id: string, value: string) => {
//     await adminStatusUpdate({ id, value });
//   };

  const [deleteVolunteer] = useDeleteVolunteerMutation();

  const handleVolunteerDelete = async (id: string) => {
    const res = await deleteVolunteer(id).unwrap();

    if (res?.id) {
      toast.success("Volunteer deleted successfully!");
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
    { field: "isActive", headerName: "Active Status",flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
          </IconButton>
          <IconButton>
            <DeleteIcon
              onClick={() => handleVolunteerDelete(row.id)}
              fontSize="medium"
              style={{ color: "red" }}
            ></DeleteIcon>
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
