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
import CreateAdminModal from "./components/CreateAdminModal";

const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageAdmin = () => {
  const [isAdminModalOpen, setIsAdminModalOpen] = React.useState(false);

  //update admin
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAdminUpdateId, setAdminUpdateId] = React.useState("");

  const { data: admins, isLoading, isError } = useGetAllAdminQuery({});
  const [adminStatusUpdate] = useAdminStatusUpdateMutation();

  const handleStatusChange = async (id: string, value: string) => {
    await adminStatusUpdate({ id, value });
  };

  const [deleteAdmin] = useDeleteAdminMutation();

  const handleAdminDelete = async (id: string) => {
    const res = await deleteAdmin(id).unwrap();

    if (res?.id) {
      toast.success("Admin deleted successfully!");
    }
  };

  if (admins?.admin?.length < 0) {
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

  const handleGetIdAndOpenUpdateModal = (id: string) => {
    setAdminUpdateId(id);
    setIsModalOpen(true);
  };

  const rows =
    admins?.admin.map((admin: any) => {
      const status = allowedStatuses.includes(admin.user.status)
        ? admin.user.status
        : "ACTIVE";
      return {
        ...admin,
        status,
      };
    }) || [];

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "bloodType", headerName: "Blood Type", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "contactNumber", headerName: "Contact Number", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Select
          sx={{ width: "150px" }}
          value={params.row.status}
          onChange={(event) =>
            handleStatusChange(params.row.id, event.target.value)
          }
        >
          {allowedStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
            <EditIcon
              onClick={() => handleGetIdAndOpenUpdateModal(row?.id)}
              fontSize="medium"
              style={{ color: "green" }}
            ></EditIcon>
            <AdminUPdateModal
              id={isAdminUpdateId}
              open={isModalOpen}
              setOpen={setIsModalOpen}
            ></AdminUPdateModal>
          </IconButton>
          <IconButton>
            <DeleteIcon
              onClick={() => handleAdminDelete(row.id)}
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
        <CreateAdminModal
          open={isAdminModalOpen}
          setOpen={setIsAdminModalOpen}
        ></CreateAdminModal>
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
          Error loading admins. Please try again later.
        </Typography>
      ) : rows?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No admins available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageAdmin;
