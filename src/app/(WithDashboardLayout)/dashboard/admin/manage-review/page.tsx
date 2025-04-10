"use client";
import { Chip } from "@mui/material";
import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { useApprovedReviewMutation, useDeleteReviewMutation, useGetAllReviewQuery } from "@/redux/api/reviewApi";



const ManageReview = () => {
  const [isModalOpen, SetIsModalOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const { data: reviews, isLoading, isError } = useGetAllReviewQuery({});
   const [approvedReview] = useApprovedReviewMutation();

  const handleStatusChange = async (id: string) => {
    await approvedReview(id);
  };

  const [deleteReview] = useDeleteReviewMutation();

  const handleReviewDelete = async (id: string) => {
    console.log(id, "id");
    try {
      const res = await deleteReview(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Review deleted successfully!");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

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

  

    const columns: GridColDef[] = [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "rating", headerName: "Rating", flex: 1 },
      { field: "details", headerName: "Feedback", flex: 3 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: ({ row }) => {
          if (row.status === "APPROVED") {
            return <Chip label="Approved" color="success" />;
          }
          if (row.status === "PENDING") {
            return (
              <Chip
                label="Approve"
                clickable
                color="warning"
                onClick={() => handleStatusChange(row?.id,)}
              />
            );
          }
          return <Chip label={row.status} />;
        },
      },
      { field: "createdAt", headerName: "Date", flex: 1 },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: ({ row }) => (
          <Box>
            <IconButton>
              <DeleteIcon
                onClick={() => handleReviewDelete(row.id)}
                style={{ color: "red" }}
                fontSize="medium"
              />
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
