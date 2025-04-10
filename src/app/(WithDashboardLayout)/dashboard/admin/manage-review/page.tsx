"use client";
import {
  useDeleteDonorMutation,
  useDonorStatusUpdateMutation,
  useGetAllDonorsQuery,
} from "@/redux/api/donorApi";
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DonorUpdateModal from "../../donor/profile/components/DonorUpdateModal";
import { toast } from "sonner";
import { useGetAllReviewQuery } from "@/redux/api/reviewApi";

const allowedStatuses = ["ACTIVE", "BLOCKED", "DELETED"];

const ManageReview = () => {
  const [isModalOpen, SetIsModalOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const { data: reviews, isLoading, isError } = useGetAllReviewQuery({});
  // const [donorStatusUpdate] = useDonorStatusUpdateMutation();

  // const handleStatusChange = async (id: string, value: string) => {
  //   await donorStatusUpdate({ id, value });
  // };

  // const [deleteDonor] = useDeleteDonorMutation();

  // const handleDonorDelete = async (id: string) => {
  //   try {
  //     const res = await deleteDonor(id).unwrap();
  //     if (res?.id) {
  //       toast.success("Donor deleted successfully!");
  //     }
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
  // };

  if (reviews?.review?.length < 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={2}>
        No review available.
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={2}>
        Error loading reviews. Please try again later.
      </Typography>
    );
  }

  const rows =
    reviews?.review || [];

  // const handleGetIdAndModalOpen = (id: string) => {
  //   setId(id);
  //   SetIsModalOpen(true);
  // };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "details", headerName: "Feedback", flex: 3 },
    { field: "status", headerName: "status", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 150,
    //   renderCell: (params) => (
    //     <Select
    //       sx={{ width: "150px" }}
    //       value={params.row.status}
    //       // onChange={(event) =>
    //       //   handleStatusChange(params.row.id, event.target.value)
    //       // }
    //     >
    //       {allowedStatuses.map((status) => (
    //         <MenuItem key={status} value={status}>
    //           {status}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   ),
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton>
            <EditIcon
              fontSize="medium"
              style={{ color: "green" }}
              // onClick={() => handleGetIdAndModalOpen(row?.id)}
            ></EditIcon>
            <DonorUpdateModal
              id={id}
              open={isModalOpen}
              setOpen={SetIsModalOpen}
            ></DonorUpdateModal>
          </IconButton>
          <IconButton>
            <DeleteIcon
              // onClick={() => handleDonorDelete(row.id)}
              style={{ color: "red" }}
              fontSize="medium"
            ></DeleteIcon>
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box>
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
      ) : rows?.length > 0 ? (
        <Box my={2} justifyContent="center" alignItems="center">
          <DataGrid rows={rows} columns={columns} hideFooter />
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center" mt={2}>
          No donors available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageReview;
